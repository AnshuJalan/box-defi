import smartpy as sp

Addresses = sp.io.import_script_from_url("file:helpers/addresses.py")
Errors = sp.io.import_script_from_url("file:utils/errors.py")
FA12 = sp.io.import_script_from_url("file:helpers/fa12.py")
FlashDummy = sp.io.import_script_from_url("file:helpers/flash_dummy.py")

########
# Types
########

POOL_STORAGE_TYPE = sp.TRecord(
    seed_token_address=sp.TAddress,
    seed_token_supply=sp.TNat,
    pool_token_address=sp.TAddress,
    state_buffer=sp.TOption(
        sp.TRecord(value=sp.TNat, sender=sp.TAddress).layout(
            ("value", "sender"),
        ),
    ),
).layout(
    (
        "seed_token_address",
        (
            "seed_token_supply",
            (
                "pool_token_address",
                "state_buffer",
            ),
        ),
    )
)

###########
# contract
###########


class BoxPool(sp.Contract):
    def __init__(
        self,
        admin=Addresses.ADMIN,
        pool_storage=sp.record(
            seed_token_address=Addresses.SEED_TOKEN,
            seed_token_supply=sp.nat(0),
            pool_token_address=Addresses.POOL_TOKEN,
            state_buffer=sp.none,
        ),
        flash_loan_fee=sp.nat(100),
    ):

        self.init(
            admin=admin,
            pool_storage=pool_storage,
            flash_loan_fee=flash_loan_fee,
        )

        self.init_type(
            sp.TRecord(
                admin=sp.TAddress,
                pool_storage=POOL_STORAGE_TYPE,
                flash_loan_fee=sp.TNat,
            )
        )

    @sp.entry_point
    def lock_tokens(self, value):
        sp.set_type(value, sp.TNat)

        sp.verify(value != 0, Errors.INSUFFICIENT_TOKENS_PROVIDED)

        # Set the pool state buffer
        self.data.pool_storage.state_buffer = sp.some(
            sp.record(value=value, sender=sp.sender),
        )

        # Send a call to pool token contract to fetch the balance of self
        c = sp.contract(
            sp.TPair(sp.TAddress, sp.TContract(sp.TNat)),
            self.data.pool_storage.pool_token_address,
            "getBalance",
        ).open_some()
        sp.transfer(
            (sp.self_address, sp.self_entry_point("lock_tokens_callback")),
            sp.tez(0),
            c,
        )

    @sp.entry_point
    def lock_tokens_callback(self, balance):
        sp.set_type(balance, sp.TNat)

        # Sanity checks
        sp.verify(sp.sender == self.data.pool_storage.pool_token_address, Errors.NOT_AUTHORISED)
        sp.verify(self.data.pool_storage.state_buffer.is_some(), Errors.INVALID_STATE)

        pool_storage = self.data.pool_storage
        state_buffer = pool_storage.state_buffer.open_some()

        # Calculate pool share i.e # of seed tokens to mint
        num_seed_tokens = sp.local("num_seed_tokens", sp.nat(0))
        with sp.if_(pool_storage.seed_token_supply == 0):
            num_seed_tokens.value = state_buffer.value
        with sp.else_():
            num_seed_tokens.value = (state_buffer.value * pool_storage.seed_token_supply) // balance

        # Retrieve pool tokens
        c_pool = sp.contract(
            sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat).layout(
                (
                    "from_ as from",
                    ("to_ as to", "value"),
                )
            ),
            pool_storage.pool_token_address,
            "transfer",
        ).open_some()
        sp.transfer(
            sp.record(from_=state_buffer.sender, to_=sp.self_address, value=state_buffer.value),
            sp.tez(0),
            c_pool,
        )

        # Mint seed tokens
        c_seed = sp.contract(
            sp.TRecord(address=sp.TAddress, value=sp.TNat),
            pool_storage.seed_token_address,
            "mint",
        ).open_some()
        sp.transfer(
            sp.record(address=state_buffer.sender, value=num_seed_tokens.value),
            sp.tez(0),
            c_seed,
        )

        # Update storage and clear state buffer
        pool_storage.seed_token_supply += num_seed_tokens.value
        pool_storage.state_buffer = sp.none

    # Unlocks Pool tokens by burning off the share seed tokens
    @sp.entry_point
    def unlock_tokens(self, value):
        sp.set_type(value, sp.TNat)

        sp.verify(value != 0, Errors.INSUFFICIENT_TOKENS_PROVIDED)

        # Set the pool state buffer
        self.data.pool_storage.state_buffer = sp.some(
            sp.record(value=value, sender=sp.sender),
        )

        # Send a call to pool token contract to fetch the balance of self
        c = sp.contract(
            sp.TPair(sp.TAddress, sp.TContract(sp.TNat)),
            self.data.pool_storage.pool_token_address,
            "getBalance",
        ).open_some()
        sp.transfer(
            (sp.self_address, sp.self_entry_point("unlock_tokens_callback")),
            sp.tez(0),
            c,
        )

    @sp.entry_point
    def unlock_tokens_callback(self, balance):
        sp.set_type(balance, sp.TNat)

        # Sanity checks
        sp.verify(sp.sender == self.data.pool_storage.pool_token_address, Errors.NOT_AUTHORISED)
        sp.verify(self.data.pool_storage.state_buffer.is_some(), Errors.INVALID_STATE)

        pool_storage = self.data.pool_storage
        state_buffer = pool_storage.state_buffer.open_some()

        # Calculate # of pool tokens that can be unlocked with given value of seed tokens
        unlocked_pool_tokens = (state_buffer.value * balance) // pool_storage.seed_token_supply

        # Burn the given value of seed tokens at the original sender's address
        c_seed = sp.contract(
            sp.TRecord(address=sp.TAddress, value=sp.TNat),
            pool_storage.seed_token_address,
            "burn",
        ).open_some()
        sp.transfer(
            sp.record(address=state_buffer.sender, value=state_buffer.value),
            sp.tez(0),
            c_seed,
        )

        # Unlock calculated # of pool tokens for the same sender
        c_pool = sp.contract(
            sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat).layout(
                (
                    "from_ as from",
                    ("to_ as to", "value"),
                )
            ),
            pool_storage.pool_token_address,
            "transfer",
        ).open_some()
        sp.transfer(
            sp.record(from_=sp.self_address, to_=state_buffer.sender, value=unlocked_pool_tokens),
            sp.tez(0),
            c_pool,
        )

        # Update the storage and clear the buffer
        pool_storage.seed_token_supply = sp.as_nat(pool_storage.seed_token_supply - state_buffer.value)
        pool_storage.state_buffer = sp.none

    @sp.entry_point
    def flash_loan(self, params):
        sp.set_type(params, sp.TRecord(value=sp.TNat, receiver_contract=sp.TAddress))

        # Sanity checks
        sp.verify(params.value != sp.nat(0), Errors.INSUFFICIENT_LOAN_AMOUNT)

        # Pool token instance
        c_pool = sp.contract(
            sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat).layout(
                (
                    "from_ as from",
                    ("to_ as to", "value"),
                )
            ),
            self.data.pool_storage.pool_token_address,
            "transfer",
        ).open_some()

        # Transfer tokens to the receiver
        sp.transfer(
            sp.record(
                from_=sp.self_address,
                to_=params.receiver_contract,
                value=params.value,
            ),
            sp.tez(0),
            c_pool,
        )

        # Call the execute_operation entrypoint on the receiver contract
        c_receiver = sp.contract(
            sp.TUnit,
            params.receiver_contract,
            "execute_operation",
        ).open_some(Errors.INVALID_RECEIVER_CONTRACT)
        sp.transfer(sp.unit, sp.tez(0), c_receiver)

        # Pull back the loaned amount with fees from the receiver contract
        final_amount = params.value + (params.value // self.data.flash_loan_fee)
        sp.transfer(
            sp.record(
                from_=params.receiver_contract,
                to_=sp.self_address,
                value=final_amount,
            ),
            sp.tez(0),
            c_pool,
        )

    @sp.entry_point
    def modify_flash_loan_fee(self, value):
        sp.set_type(value, sp.TNat)

        # Verify that the sender is the admin
        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        self.data.flash_loan_fee = value

    @sp.entry_point
    def change_admin(self, new_admin):
        sp.set_type(new_admin, sp.TAddress)

        # Verify that the sender is the admin
        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        self.data.admin = new_admin


if __name__ == "__main__":

    ##############
    # lock_tokens
    ##############
    @sp.add_test(name="lock_tokens works correctly for multiple lock ups and no fee in the pool")
    def test():
        scenario = sp.test_scenario()

        pool_token = FA12.FA12(Addresses.ADMIN)
        seed_token = FA12.FA12(Addresses.ADMIN)
        box_pool = BoxPool(
            pool_storage=sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(0),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )

        scenario += pool_token
        scenario += seed_token
        scenario += box_pool

        # Mint pool tokens for Alice and Bob
        scenario += pool_token.mint(address=Addresses.ALICE, value=sp.nat(1200)).run(sender=Addresses.ADMIN)
        scenario += pool_token.mint(address=Addresses.BOB, value=sp.nat(1500)).run(sender=Addresses.ADMIN)

        # Approve box pool contract to retrieve pool tokens
        scenario += pool_token.approve(spender=box_pool.address, value=sp.nat(1200)).run(sender=Addresses.ALICE)
        scenario += pool_token.approve(spender=box_pool.address, value=sp.nat(1500)).run(sender=Addresses.BOB)

        # Change administrator for seed token
        scenario += seed_token.setAdministrator(box_pool.address).run(sender=Addresses.ADMIN)

        # When Alice locks up first of the tokens in the pool
        scenario += box_pool.lock_tokens(sp.nat(1200)).run(sender=Addresses.ALICE)

        # Storage is updated correctly & correct number of share seed tokens are minted
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(1200),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(seed_token.data.balances[Addresses.ALICE].balance == 1200)

        # When Bob locks up after Alice
        scenario += box_pool.lock_tokens(sp.nat(1500)).run(sender=Addresses.BOB)

        # Storage is updated correctly & correct number of share seed tokens are minted
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(2700),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(seed_token.data.balances[Addresses.BOB].balance == 1500)

    @sp.add_test(name="lock_tokens works correctly for multiple lock ups with fee in the pool")
    def test():
        scenario = sp.test_scenario()

        pool_token = FA12.FA12(Addresses.ADMIN)
        seed_token = FA12.FA12(Addresses.ADMIN)
        box_pool = BoxPool(
            pool_storage=sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(0),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )

        scenario += pool_token
        scenario += seed_token
        scenario += box_pool

        # Mint pool tokens for Alice and Bob
        scenario += pool_token.mint(address=Addresses.ALICE, value=sp.nat(1200)).run(sender=Addresses.ADMIN)
        scenario += pool_token.mint(address=Addresses.BOB, value=sp.nat(1500)).run(sender=Addresses.ADMIN)

        # Approve box pool contract to retrieve pool tokens
        scenario += pool_token.approve(spender=box_pool.address, value=sp.nat(1200)).run(sender=Addresses.ALICE)
        scenario += pool_token.approve(spender=box_pool.address, value=sp.nat(1500)).run(sender=Addresses.BOB)

        # Change administrator for seed token
        scenario += seed_token.setAdministrator(box_pool.address).run(sender=Addresses.ADMIN)

        # When Alice locks up first of the tokens in the pool
        scenario += box_pool.lock_tokens(sp.nat(1200)).run(sender=Addresses.ALICE)

        # Storage is updated correctly & correct number of share seed tokens are minted
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(1200),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(seed_token.data.balances[Addresses.ALICE].balance == 1200)

        # Mint pool tokens for box pool to mimic flash loan fee
        scenario += pool_token.mint(address=box_pool.address, value=sp.nat(300)).run(sender=Addresses.ADMIN)

        # When Bob locks up after Alice
        scenario += box_pool.lock_tokens(sp.nat(1500)).run(sender=Addresses.BOB)

        # Storage is updated correctly & correct number of share seed tokens are minted
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(2400),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(seed_token.data.balances[Addresses.BOB].balance == 1200)

    ################
    # unlock_tokens
    ################
    @sp.add_test(name="unlock_tokens works correctly for multiple full unlocks")
    def test():
        scenario = sp.test_scenario()

        pool_token = FA12.FA12(Addresses.ADMIN)
        seed_token = FA12.FA12(Addresses.ADMIN)
        box_pool = BoxPool(
            pool_storage=sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(2500),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )

        scenario += pool_token
        scenario += seed_token
        scenario += box_pool

        # Mint pool tokens for the box pool contract
        scenario += pool_token.mint(address=box_pool.address, value=sp.nat(2500)).run(sender=Addresses.ADMIN)

        # Mint seed tokens for Alice and Bob
        scenario += seed_token.mint(address=Addresses.ALICE, value=sp.nat(1200)).run(sender=Addresses.ADMIN)
        scenario += seed_token.mint(address=Addresses.BOB, value=sp.nat(1300)).run(sender=Addresses.ADMIN)

        # Change administrator for seed token
        scenario += seed_token.setAdministrator(box_pool.address).run(sender=Addresses.ADMIN)

        # When Alice unlocks her tokens
        scenario += box_pool.unlock_tokens(sp.nat(1200)).run(sender=Addresses.ALICE)

        # Storage is updated correctly and Alice receives correct # of pool tokens back
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(1300),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(pool_token.data.balances[Addresses.ALICE].balance == sp.nat(1200))

        # When Bob unlocks her tokens
        scenario += box_pool.unlock_tokens(sp.nat(1300)).run(sender=Addresses.BOB)

        # Storage is updated correctly and Alice receives correct # of pool tokens back
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(0),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(pool_token.data.balances[Addresses.BOB].balance == sp.nat(1300))

    @sp.add_test(name="unlock_token works correctly for partial unlock")
    def test():
        scenario = sp.test_scenario()

        pool_token = FA12.FA12(Addresses.ADMIN)
        seed_token = FA12.FA12(Addresses.ADMIN)
        box_pool = BoxPool(
            pool_storage=sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(2500),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )

        scenario += pool_token
        scenario += seed_token
        scenario += box_pool

        # Mint pool tokens for the box pool contract
        scenario += pool_token.mint(address=box_pool.address, value=sp.nat(2500)).run(sender=Addresses.ADMIN)

        # Mint seed tokens for Alice
        scenario += seed_token.mint(address=Addresses.ALICE, value=sp.nat(1200)).run(sender=Addresses.ADMIN)
        scenario += seed_token.mint(address=Addresses.BOB, value=sp.nat(1300)).run(sender=Addresses.ADMIN)

        # Change administrator for seed token
        scenario += seed_token.setAdministrator(box_pool.address).run(sender=Addresses.ADMIN)

        # When Alice unlocks her tokens partially
        scenario += box_pool.unlock_tokens(sp.nat(800)).run(sender=Addresses.ALICE)

        # Storage is updated correctly and Alice receives correct # of pool tokens back
        scenario.verify(
            box_pool.data.pool_storage
            == sp.record(
                seed_token_address=seed_token.address,
                seed_token_supply=sp.nat(1700),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )
        scenario.verify(pool_token.data.balances[Addresses.ALICE].balance == sp.nat(800))

    #############
    # flash_loan
    #############
    @sp.add_test(name="flash_loan works correctly")
    def test():
        scenario = sp.test_scenario()

        flash_dummy = FlashDummy.FlashDummy()
        pool_token = FA12.FA12(Addresses.ADMIN)
        box_pool = BoxPool(
            pool_storage=sp.record(
                seed_token_address=Addresses.SEED_TOKEN,
                seed_token_supply=sp.nat(2500),
                pool_token_address=pool_token.address,
                state_buffer=sp.none,
            )
        )

        scenario += pool_token
        scenario += box_pool
        scenario += flash_dummy

        # Mint pool tokens for the box pool contract & flash dummy
        scenario += pool_token.mint(address=box_pool.address, value=sp.nat(2500)).run(sender=Addresses.ADMIN)
        scenario += pool_token.mint(address=flash_dummy.address, value=sp.nat(2700)).run(sender=Addresses.ADMIN)

        # Approve tokens for box_pool for flash_dummy
        scenario += pool_token.approve(spender=box_pool.address, value=sp.nat(2700)).run(sender=flash_dummy.address)

        # When Alice calls flash_loan with flash dummy as receiver
        scenario += box_pool.flash_loan(value=2500, receiver_contract=flash_dummy.address).run(sender=Addresses.ALICE)

        # Correct amount of tokens (original + fee) is then returned over to the pool
        scenario.verify(pool_token.data.balances[box_pool.address].balance == sp.nat(2525))
        scenario.verify(pool_token.data.balances[flash_dummy.address].balance == sp.nat(2675))


sp.add_compilation_target("box_pool", BoxPool())
