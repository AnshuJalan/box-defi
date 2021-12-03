# Customised implementation of TZIP12 - FA2 standard

import smartpy as sp

Addresses = sp.io.import_script_from_url("file:helpers/addresses.py")
Errors = sp.io.import_script_from_url("file:utils/errors.py")  # Used for not standard errors

# Required in Smartpy to generate metadata object with views
# CONTRACT_METADATA = {
#     "name": "Box Fruit NFT",
#     "description": "The NFTs farmed using bSEED tokens in Box DeFi",
#     "version": 1.0,
#     "views": [],
# }


class Types:
    TRANSFER = sp.TList(
        sp.TRecord(
            from_=sp.TAddress,
            txs=sp.TList(
                sp.TRecord(to_=sp.TAddress, token_id=sp.TNat, amount=sp.TNat,).layout(
                    ("to_", ("token_id", "amount")),
                ),
            ),
        ).layout(("from_", "txs"))
    )

    OPERATOR_PARAMS = sp.TRecord(
        owner=sp.TAddress,
        operator=sp.TAddress,
        token_id=sp.TNat,
    ).layout(("owner", ("operator", "token_id")))

    BURN_PARAMS = sp.TRecord(
        address=sp.TAddress,
        tokens=sp.TList(
            sp.TRecord(token_id=sp.TNat, amount=sp.TNat),
        ),
    )

    BALANCE_OF_PARAMS = sp.TRecord(
        requests=sp.TList(sp.TRecord(owner=sp.TAddress, token_id=sp.TNat).layout(("owner", "token_id"))),
        callback=sp.TContract(
            sp.TList(
                sp.TRecord(
                    request=sp.TRecord(owner=sp.TAddress, token_id=sp.TNat).layout(("owner", "token_id")),
                    balance=sp.TNat,
                ).layout(("request", "balance"))
            )
        ),
    ).layout(("requests", "callback"))

    ADD_TOKEN_PARAMS = sp.TList(sp.TRecord(token_id=sp.TNat, metadata=sp.TBytes))


# TZIP-12 specified errors for FA2 standard
class FA2_Errors:
    FA2_TOKEN_UNDEFINED = "FA2_TOKEN_UNDEFINED"
    FA2_NOT_OPERATOR = "FA2_NOT_OPERATOR"
    FA2_INSUFFICIENT_BALANCE = "FA2_INSUFFICIENT_BALANCE"
    FA2_NOT_OWNER = "FA2_NOT_OWNER"


class BoxFruitFA2(sp.Contract):
    def __init__(
        self,
        admin=Addresses.ADMIN,
        ledger=sp.big_map(
            l={},
            tkey=sp.TPair(sp.TAddress, sp.TNat),
            tvalue=sp.TNat,
        ),
        total_supply=sp.big_map(l={}, tkey=sp.TNat, tvalue=sp.TNat),
        token_metadata=sp.big_map(
            l={},
            tkey=sp.TNat,
            tvalue=sp.TRecord(
                token_id=sp.TNat,
                token_info=sp.TMap(sp.TString, sp.TBytes),
            ),
        ),
        operators=sp.big_map(
            l={},
            tkey=sp.TRecord(
                owner=sp.TAddress,
                operator=sp.TAddress,
                token_id=sp.TNat,
            ).layout(("owner", ("operator", "token_id"))),
            tvalue=sp.TUnit,
        ),
    ):
        self.init(
            admin=admin,
            ledger=ledger,
            total_supply=total_supply,
            token_metadata=token_metadata,
            operators=operators,
            metadata=sp.utils.metadata_of_url("ipfs://"),
        )

        # Required in smartpy
        # self.init_metadata("metadata_0", CONTRACT_METADATA)

    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TRecord(address=sp.TAddress, token_id=sp.TNat))

        # Verify that the token metadata has been set for the specified token_id
        sp.verify(self.data.token_metadata.contains(params.token_id), FA2_Errors.FA2_TOKEN_UNDEFINED)

        # Only admin can mint
        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        with sp.if_(~self.data.ledger.contains((params.address, params.token_id))):
            self.data.ledger[(params.address, params.token_id)] = 0

        # Mint the token for the address
        self.data.ledger[(params.address, params.token_id)] += 1

        # Update the token's total supply
        self.data.total_supply[params.token_id] += 1

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, Types.BURN_PARAMS)

        # Only admin can burn the tokens
        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        with sp.for_("token", params.tokens) as token:
            # Sanity checks
            sp.verify(self.data.token_metadata.contains(token.token_id), FA2_Errors.FA2_TOKEN_UNDEFINED)
            sp.verify(
                self.data.ledger[(params.address, token.token_id)] >= token.amount, FA2_Errors.FA2_INSUFFICIENT_BALANCE
            )

            # Burn the tokens
            self.data.ledger[(params.address, token.token_id)] = sp.as_nat(
                self.data.ledger[(params.address, token.token_id)] - token.amount
            )

            # Decrease total supply
            self.data.total_supply[token.token_id] = sp.as_nat(self.data.total_supply[token.token_id] - token.amount)

    @sp.entry_point
    def balance_of(self, params):
        sp.set_type(params, Types.BALANCE_OF_PARAMS)

        # Response object
        response = sp.local("response", [])

        with sp.for_("request", params.requests) as request:
            sp.verify(self.data.token_metadata.contains(request.token_id), FA2_Errors.FA2_TOKEN_UNDEFINED)

            with sp.if_(self.data.ledger.contains((request.owner, request.token_id))):
                response.value.push(
                    sp.record(request=request, balance=self.data.ledger[(request.owner, request.token_id)])
                )
            with sp.else_():
                response.value.push(sp.record(request=request, balance=sp.nat(0)))

        sp.transfer(response.value, sp.tez(0), params.callback)

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, Types.TRANSFER)

        with sp.for_("transfer", params) as transfer:
            current_from = transfer.from_
            with sp.for_("tx", transfer.txs) as tx:

                # Verify sender
                sp.verify(
                    (sp.sender == current_from)
                    | self.data.operators.contains(
                        sp.record(owner=current_from, operator=sp.sender, token_id=tx.token_id)
                    ),
                    FA2_Errors.FA2_NOT_OPERATOR,
                )

                # Verify that token id exists
                sp.verify(self.data.token_metadata.contains(tx.token_id), FA2_Errors.FA2_TOKEN_UNDEFINED)

                with sp.if_(tx.amount > 0):
                    # Verify that the address has sufficient balance for transfer
                    sp.verify(
                        self.data.ledger[(current_from, tx.token_id)] >= tx.amount, FA2_Errors.FA2_INSUFFICIENT_BALANCE
                    )

                    # Make transfer
                    self.data.ledger[(current_from, tx.token_id)] = sp.as_nat(
                        self.data.ledger[(current_from, tx.token_id)] - tx.amount
                    )
                    with sp.if_(~self.data.ledger.contains((tx.to_, tx.token_id))):
                        self.data.ledger[(tx.to_, tx.token_id)] = 0
                    self.data.ledger[(tx.to_, tx.token_id)] += tx.amount

                with sp.else_():
                    pass

    @sp.entry_point
    def update_operators(self, params):
        sp.set_type(
            params,
            sp.TList(
                sp.TVariant(
                    add_operator=Types.OPERATOR_PARAMS,
                    remove_operator=Types.OPERATOR_PARAMS,
                )
            ),
        )

        with sp.for_("update", params) as update:
            with update.match_cases() as arg:
                with arg.match("add_operator") as upd:
                    sp.verify(
                        upd.owner == sp.sender,
                        FA2_Errors.FA2_NOT_OWNER,
                    )
                    self.data.operators[upd] = sp.unit
                with arg.match("remove_operator") as upd:
                    sp.verify(
                        upd.owner == sp.sender,
                        FA2_Errors.FA2_NOT_OWNER,
                    )
                    del self.data.operators[upd]

    @sp.entry_point
    def add_token(self, params):
        sp.set_type(params, Types.ADD_TOKEN_PARAMS)

        # Only admin can add new tokens
        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        with sp.for_("token", params) as token:

            # Verify that the token is not already present
            sp.verify(~self.data.token_metadata.contains(token.token_id), Errors.TOKEN_ALREADY_PRESENT)

            # Add the token
            self.data.token_metadata[token.token_id] = sp.record(
                token_id=token.token_id,
                token_info={"": token.metadata},
            )

            # Set total supply to zero
            self.data.total_supply[token.token_id] = 0

    @sp.entry_point
    def set_admin(self, new_admin):
        sp.set_type(new_admin, sp.TAddress)

        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        self.data.admin = new_admin


if __name__ == "__main__":
    sp.add_compilation_target("box_fruit_fa2", BoxFruitFA2())
