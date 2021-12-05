import smartpy as sp

Addresses = sp.io.import_script_from_url("file:helpers/addresses.py")
Errors = sp.io.import_script_from_url("file:utils/errors.py")
BoxFruitFA2 = sp.io.import_script_from_url("file:box_fruit_fa2.py")
FA12 = sp.io.import_script_from_url("file:helpers/fa12.py")

########
# Types
########


class Types:
    DESEED_PARAMS = sp.TList(sp.TRecord(token_id=sp.TNat, amount=sp.TNat))

    ADD_MERGE_PATTERNS_PARAMS = sp.TList(
        sp.TRecord(
            token_id=sp.TNat,
            tokens=sp.TList(
                sp.TRecord(token_id=sp.TNat, amount=sp.TNat),
            ),
        )
    )

    ADD_FRUITS_PARAMS = sp.TRecord(
        rarity_list=sp.TList(sp.TRecord(token_id=sp.TNat, index=sp.TNat)),
        tokens=sp.TList(sp.TRecord(token_id=sp.TNat, metadata=sp.TBytes)),
    ).layout(("rarity_list", "tokens"))


###########
# Contract
###########


class BoxFarm(sp.Contract):
    def __init__(
        self,
        admin=Addresses.ADMIN,
        seed_token_address=Addresses.SEED_TOKEN,
        box_fruit_fa2_address=Addresses.BOX_FRUIT_FA2,
        boxes=sp.big_map(
            l={},
            tkey=sp.TNat,
            tvalue=sp.TRecord(
                creator=sp.TAddress,
                last_watered=sp.TTimestamp,
                times_watered=sp.TNat,
            ).layout(("creator", ("last_watered", "times_watered"))),
        ),
        rarity_pairs=sp.map(
            l={},
            tkey=sp.TPair(sp.TNat, sp.TNat),
            tvalue=sp.TNat,
        ),
        merge_patterns=sp.big_map(
            l={},
            tkey=sp.TNat,
            tvalue=sp.TList(sp.TRecord(token_id=sp.TNat, amount=sp.TNat)),
        ),
        randomization_boundary=sp.nat(100),
        seeds_per_box=sp.nat(10),
        water_period=sp.nat(10),
        water_to_harvest=sp.nat(5),
    ):
        self.init(
            admin=admin,
            seed_token_address=seed_token_address,
            box_fruit_fa2_address=box_fruit_fa2_address,
            uid=sp.nat(0),
            boxes=boxes,
            rarity_pairs=rarity_pairs,
            merge_patterns=merge_patterns,
            randomization_boundary=randomization_boundary,
            seeds_per_box=seeds_per_box,
            water_period=water_period,
            water_to_harvest=water_to_harvest,
        )

        self.bytes_to_nat = sp.map(
            l={
                sp.bytes("0x00"): 0,
                sp.bytes("0x01"): 1,
                sp.bytes("0x02"): 2,
                sp.bytes("0x03"): 3,
                sp.bytes("0x04"): 4,
                sp.bytes("0x05"): 5,
                sp.bytes("0x06"): 6,
                sp.bytes("0x07"): 7,
                sp.bytes("0x08"): 8,
                sp.bytes("0x09"): 9,
                sp.bytes("0x0a"): 10,
                sp.bytes("0x0b"): 11,
                sp.bytes("0x0c"): 12,
                sp.bytes("0x0d"): 13,
                sp.bytes("0x0e"): 14,
                sp.bytes("0x0f"): 15,
                sp.bytes("0x10"): 16,
                sp.bytes("0x11"): 17,
                sp.bytes("0x12"): 18,
                sp.bytes("0x13"): 19,
                sp.bytes("0x14"): 20,
                sp.bytes("0x15"): 21,
                sp.bytes("0x16"): 22,
                sp.bytes("0x17"): 23,
                sp.bytes("0x18"): 24,
                sp.bytes("0x19"): 25,
                sp.bytes("0x1a"): 26,
                sp.bytes("0x1b"): 27,
                sp.bytes("0x1c"): 28,
                sp.bytes("0x1d"): 29,
                sp.bytes("0x1e"): 30,
                sp.bytes("0x1f"): 31,
                sp.bytes("0x20"): 32,
                sp.bytes("0x21"): 33,
                sp.bytes("0x22"): 34,
                sp.bytes("0x23"): 35,
                sp.bytes("0x24"): 36,
                sp.bytes("0x25"): 37,
                sp.bytes("0x26"): 38,
                sp.bytes("0x27"): 39,
                sp.bytes("0x28"): 40,
                sp.bytes("0x29"): 41,
                sp.bytes("0x2a"): 42,
                sp.bytes("0x2b"): 43,
                sp.bytes("0x2c"): 44,
                sp.bytes("0x2d"): 45,
                sp.bytes("0x2e"): 46,
                sp.bytes("0x2f"): 47,
                sp.bytes("0x30"): 48,
                sp.bytes("0x31"): 49,
                sp.bytes("0x32"): 50,
                sp.bytes("0x33"): 51,
                sp.bytes("0x34"): 52,
                sp.bytes("0x35"): 53,
                sp.bytes("0x36"): 54,
                sp.bytes("0x37"): 55,
                sp.bytes("0x38"): 56,
                sp.bytes("0x39"): 57,
                sp.bytes("0x3a"): 58,
                sp.bytes("0x3b"): 59,
                sp.bytes("0x3c"): 60,
                sp.bytes("0x3d"): 61,
                sp.bytes("0x3e"): 62,
                sp.bytes("0x3f"): 63,
                sp.bytes("0x40"): 64,
                sp.bytes("0x41"): 65,
                sp.bytes("0x42"): 66,
                sp.bytes("0x43"): 67,
                sp.bytes("0x44"): 68,
                sp.bytes("0x45"): 69,
                sp.bytes("0x46"): 70,
                sp.bytes("0x47"): 71,
                sp.bytes("0x48"): 72,
                sp.bytes("0x49"): 73,
                sp.bytes("0x4a"): 74,
                sp.bytes("0x4b"): 75,
                sp.bytes("0x4c"): 76,
                sp.bytes("0x4d"): 77,
                sp.bytes("0x4e"): 78,
                sp.bytes("0x4f"): 79,
                sp.bytes("0x50"): 80,
                sp.bytes("0x51"): 81,
                sp.bytes("0x52"): 82,
                sp.bytes("0x53"): 83,
                sp.bytes("0x54"): 84,
                sp.bytes("0x55"): 85,
                sp.bytes("0x56"): 86,
                sp.bytes("0x57"): 87,
                sp.bytes("0x58"): 88,
                sp.bytes("0x59"): 89,
                sp.bytes("0x5a"): 90,
                sp.bytes("0x5b"): 91,
                sp.bytes("0x5c"): 92,
                sp.bytes("0x5d"): 93,
                sp.bytes("0x5e"): 94,
                sp.bytes("0x5f"): 95,
                sp.bytes("0x60"): 96,
                sp.bytes("0x61"): 97,
                sp.bytes("0x62"): 98,
                sp.bytes("0x63"): 99,
                sp.bytes("0x64"): 100,
                sp.bytes("0x65"): 101,
                sp.bytes("0x66"): 102,
                sp.bytes("0x67"): 103,
                sp.bytes("0x68"): 104,
                sp.bytes("0x69"): 105,
                sp.bytes("0x6a"): 106,
                sp.bytes("0x6b"): 107,
                sp.bytes("0x6c"): 108,
                sp.bytes("0x6d"): 109,
                sp.bytes("0x6e"): 110,
                sp.bytes("0x6f"): 111,
                sp.bytes("0x70"): 112,
                sp.bytes("0x71"): 113,
                sp.bytes("0x72"): 114,
                sp.bytes("0x73"): 115,
                sp.bytes("0x74"): 116,
                sp.bytes("0x75"): 117,
                sp.bytes("0x76"): 118,
                sp.bytes("0x77"): 119,
                sp.bytes("0x78"): 120,
                sp.bytes("0x79"): 121,
                sp.bytes("0x7a"): 122,
                sp.bytes("0x7b"): 123,
                sp.bytes("0x7c"): 124,
                sp.bytes("0x7d"): 125,
                sp.bytes("0x7e"): 126,
                sp.bytes("0x7f"): 127,
                sp.bytes("0x80"): 128,
                sp.bytes("0x81"): 129,
                sp.bytes("0x82"): 130,
                sp.bytes("0x83"): 131,
                sp.bytes("0x84"): 132,
                sp.bytes("0x85"): 133,
                sp.bytes("0x86"): 134,
                sp.bytes("0x87"): 135,
                sp.bytes("0x88"): 136,
                sp.bytes("0x89"): 137,
                sp.bytes("0x8a"): 138,
                sp.bytes("0x8b"): 139,
                sp.bytes("0x8c"): 140,
                sp.bytes("0x8d"): 141,
                sp.bytes("0x8e"): 142,
                sp.bytes("0x8f"): 143,
                sp.bytes("0x90"): 144,
                sp.bytes("0x91"): 145,
                sp.bytes("0x92"): 146,
                sp.bytes("0x93"): 147,
                sp.bytes("0x94"): 148,
                sp.bytes("0x95"): 149,
                sp.bytes("0x96"): 150,
                sp.bytes("0x97"): 151,
                sp.bytes("0x98"): 152,
                sp.bytes("0x99"): 153,
                sp.bytes("0x9a"): 154,
                sp.bytes("0x9b"): 155,
                sp.bytes("0x9c"): 156,
                sp.bytes("0x9d"): 157,
                sp.bytes("0x9e"): 158,
                sp.bytes("0x9f"): 159,
                sp.bytes("0xa0"): 160,
                sp.bytes("0xa1"): 161,
                sp.bytes("0xa2"): 162,
                sp.bytes("0xa3"): 163,
                sp.bytes("0xa4"): 164,
                sp.bytes("0xa5"): 165,
                sp.bytes("0xa6"): 166,
                sp.bytes("0xa7"): 167,
                sp.bytes("0xa8"): 168,
                sp.bytes("0xa9"): 169,
                sp.bytes("0xaa"): 170,
                sp.bytes("0xab"): 171,
                sp.bytes("0xac"): 172,
                sp.bytes("0xad"): 173,
                sp.bytes("0xae"): 174,
                sp.bytes("0xaf"): 175,
                sp.bytes("0xb0"): 176,
                sp.bytes("0xb1"): 177,
                sp.bytes("0xb2"): 178,
                sp.bytes("0xb3"): 179,
                sp.bytes("0xb4"): 180,
                sp.bytes("0xb5"): 181,
                sp.bytes("0xb6"): 182,
                sp.bytes("0xb7"): 183,
                sp.bytes("0xb8"): 184,
                sp.bytes("0xb9"): 185,
                sp.bytes("0xba"): 186,
                sp.bytes("0xbb"): 187,
                sp.bytes("0xbc"): 188,
                sp.bytes("0xbd"): 189,
                sp.bytes("0xbe"): 190,
                sp.bytes("0xbf"): 191,
                sp.bytes("0xc0"): 192,
                sp.bytes("0xc1"): 193,
                sp.bytes("0xc2"): 194,
                sp.bytes("0xc3"): 195,
                sp.bytes("0xc4"): 196,
                sp.bytes("0xc5"): 197,
                sp.bytes("0xc6"): 198,
                sp.bytes("0xc7"): 199,
                sp.bytes("0xc8"): 200,
                sp.bytes("0xc9"): 201,
                sp.bytes("0xca"): 202,
                sp.bytes("0xcb"): 203,
                sp.bytes("0xcc"): 204,
                sp.bytes("0xcd"): 205,
                sp.bytes("0xce"): 206,
                sp.bytes("0xcf"): 207,
                sp.bytes("0xd0"): 208,
                sp.bytes("0xd1"): 209,
                sp.bytes("0xd2"): 210,
                sp.bytes("0xd3"): 211,
                sp.bytes("0xd4"): 212,
                sp.bytes("0xd5"): 213,
                sp.bytes("0xd6"): 214,
                sp.bytes("0xd7"): 215,
                sp.bytes("0xd8"): 216,
                sp.bytes("0xd9"): 217,
                sp.bytes("0xda"): 218,
                sp.bytes("0xdb"): 219,
                sp.bytes("0xdc"): 220,
                sp.bytes("0xdd"): 221,
                sp.bytes("0xde"): 222,
                sp.bytes("0xdf"): 223,
                sp.bytes("0xe0"): 224,
                sp.bytes("0xe1"): 225,
                sp.bytes("0xe2"): 226,
                sp.bytes("0xe3"): 227,
                sp.bytes("0xe4"): 228,
                sp.bytes("0xe5"): 229,
                sp.bytes("0xe6"): 230,
                sp.bytes("0xe7"): 231,
                sp.bytes("0xe8"): 232,
                sp.bytes("0xe9"): 233,
                sp.bytes("0xea"): 234,
                sp.bytes("0xeb"): 235,
                sp.bytes("0xec"): 236,
                sp.bytes("0xed"): 237,
                sp.bytes("0xee"): 238,
                sp.bytes("0xef"): 239,
                sp.bytes("0xf0"): 240,
                sp.bytes("0xf1"): 241,
                sp.bytes("0xf2"): 242,
                sp.bytes("0xf3"): 243,
                sp.bytes("0xf4"): 244,
                sp.bytes("0xf5"): 245,
                sp.bytes("0xf6"): 246,
                sp.bytes("0xf7"): 247,
                sp.bytes("0xf8"): 248,
                sp.bytes("0xf9"): 249,
                sp.bytes("0xfa"): 250,
                sp.bytes("0xfb"): 251,
                sp.bytes("0xfc"): 252,
                sp.bytes("0xfd"): 253,
                sp.bytes("0xfe"): 254,
                sp.bytes("0xff"): 255,
            }
        )

    @sp.entry_point
    def plant_seeds(self, num_plants):
        sp.set_type(num_plants, sp.TNat)

        # Take seed tokens from sender to self
        c_seed = sp.contract(
            sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat).layout(
                (
                    "from_ as from",
                    ("to_ as to", "value"),
                )
            ),
            self.data.seed_token_address,
            "transfer",
        ).open_some()
        sp.transfer(
            sp.record(from_=sp.sender, to_=sp.self_address, value=self.data.seeds_per_box * num_plants),
            sp.tez(0),
            c_seed,
        )

        # Initialize boxes
        with sp.for_("_", sp.range(1, num_plants + 1)) as _:
            self.data.uid += 1
            self.data.boxes[self.data.uid] = sp.record(
                creator=sp.sender,
                last_watered=sp.now,
                times_watered=sp.nat(1),
            )

    @sp.entry_point
    def water_plants(self, params):
        sp.set_type(params, sp.TList(sp.TNat))

        with sp.for_("box_id", params) as box_id:
            # Sanity checks
            sp.verify(self.data.boxes.contains(box_id), Errors.INVALID_BOX_ID)
            sp.verify(self.data.boxes[box_id].creator == sp.sender, Errors.NOT_BOX_OWNER)

            box = self.data.boxes[box_id]

            # Check if plant can be watered, else pass
            with sp.if_(self.can_water(box)):
                box.last_watered = sp.now
                box.times_watered += 1
            with sp.else_():
                pass

    @sp.private_lambda(with_storage="read-only")
    def can_water(self, box):
        dry_period = sp.as_nat(sp.now - box.last_watered)

        # If the plant is not dead AND is yet to reach harvest point
        # AND has not been watered for a certain period
        with sp.if_(
            (dry_period > self.data.water_period)
            & (dry_period <= (2 * self.data.water_period))
            & (box.times_watered < self.data.water_to_harvest)
        ):
            sp.result(sp.bool(True))
        with sp.else_():
            sp.result(sp.bool(False))

    @sp.entry_point
    def harvest(self, box_id):
        sp.set_type(box_id, sp.TNat)

        # Sanity checks
        sp.verify(self.data.boxes.contains(box_id), Errors.INVALID_BOX_ID)
        sp.verify(self.data.boxes[box_id].creator == sp.sender, Errors.NOT_BOX_OWNER)

        # Check if harvesting is possible
        dry_period = sp.as_nat(sp.now - self.data.boxes[box_id].last_watered)
        sp.verify(
            (self.data.boxes[box_id].times_watered == self.data.water_to_harvest)
            & (dry_period > self.data.water_period),
            Errors.CANNOT_HARVEST_YET,
        )

        # Generate a random number
        c = sp.create_contract_operation(sp.Contract(), sp.unit, sp.tez(0), None)
        _hash = sp.sha256(sp.pack(c.address))
        p_byte = sp.slice(_hash, 30, 1).open_some()
        l_byte = sp.slice(_hash, 31, 1).open_some()
        val = (self.bytes_to_nat[p_byte] * 256) + (self.bytes_to_nat[l_byte] * 256)
        random = val % self.data.randomization_boundary

        token_id = sp.local("token_id", sp.nat(0))

        # Find the associated token id
        # TODO: optimize this
        with sp.for_("fruit_key", self.data.rarity_pairs.keys()) as fruit_key:
            with sp.if_((random >= sp.fst(fruit_key)) & (random < sp.snd(fruit_key))):
                token_id.value = self.data.rarity_pairs[fruit_key]

        # Mint the token for the sender
        c_fruit = sp.contract(
            sp.TRecord(address=sp.TAddress, token_id=sp.TNat),
            self.data.box_fruit_fa2_address,
            "mint",
        ).open_some()
        sp.transfer(sp.record(address=sp.sender, token_id=token_id.value), sp.tez(0), c_fruit)

        # remove the box
        del self.data.boxes[box_id]

    @sp.entry_point
    def deseed(self, params):
        sp.set_type(params, Types.DESEED_PARAMS)

        # Loop to calculate total amount
        total_amount = sp.local("total_amount", sp.nat(0))
        with sp.for_("token", params) as token:
            total_amount.value += token.amount

        # Burn NFTs
        c_fruit = sp.contract(
            sp.TRecord(
                address=sp.TAddress,
                tokens=sp.TList(
                    sp.TRecord(token_id=sp.TNat, amount=sp.TNat),
                ),
            ),
            self.data.box_fruit_fa2_address,
            "burn",
        ).open_some()
        sp.transfer(sp.record(address=sp.sender, tokens=params), sp.tez(0), c_fruit)

        # Send seed tokens to the sender
        c_seed = sp.contract(
            sp.TRecord(from_=sp.TAddress, to_=sp.TAddress, value=sp.TNat).layout(
                (
                    "from_ as from",
                    ("to_ as to", "value"),
                )
            ),
            self.data.seed_token_address,
            "transfer",
        ).open_some()
        sp.transfer(
            sp.record(
                from_=sp.self_address,
                to_=sp.sender,
                value=total_amount.value * self.data.seeds_per_box,
            ),
            sp.tez(0),
            c_seed,
        )

    @sp.entry_point
    def merge(self, token_id):
        sp.set_type(token_id, sp.TNat)

        # Burn required NFTs
        c_fruit_burn = sp.contract(
            sp.TRecord(
                address=sp.TAddress,
                tokens=sp.TList(
                    sp.TRecord(token_id=sp.TNat, amount=sp.TNat),
                ),
            ),
            self.data.box_fruit_fa2_address,
            "burn",
        ).open_some()
        sp.transfer(
            sp.record(
                address=sp.sender,
                tokens=self.data.merge_patterns[token_id],
            ),
            sp.tez(0),
            c_fruit_burn,
        )

        # Mint the new NFT
        c_fruit_mint = sp.contract(
            sp.TRecord(address=sp.TAddress, token_id=sp.TNat),
            self.data.box_fruit_fa2_address,
            "mint",
        ).open_some()
        sp.transfer(
            sp.record(address=sp.sender, token_id=token_id),
            sp.tez(0),
            c_fruit_mint,
        )

    @sp.entry_point
    def add_merge_patterns(self, params):
        sp.set_type(params, Types.ADD_MERGE_PATTERNS_PARAMS)

        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        with sp.for_("pattern", params) as pattern:
            sp.verify(
                ~self.data.merge_patterns.contains(pattern.token_id),
                Errors.MERGE_PATTERN_ALREADY_PRESENT,
            )
            self.data.merge_patterns[pattern.token_id] = pattern.tokens

    @sp.entry_point
    def add_fruits(self, params):
        sp.set_type(params, Types.ADD_FRUITS_PARAMS)

        sp.verify(sp.sender == self.data.admin, Errors.NOT_AUTHORISED)

        # Insert rarity pairs in storage
        prev_index = sp.local("prev_index", sp.nat(0))
        with sp.for_("token", params.rarity_list) as token:
            self.data.rarity_pairs[(prev_index.value, token.index)] = token.token_id
            prev_index.value = token.index

        # Set randomization boundary
        self.data.randomization_boundary = prev_index.value

        # Add the fruits as tokens in the FA2 contract
        c_fruit = sp.contract(
            sp.TList(sp.TRecord(token_id=sp.TNat, metadata=sp.TBytes)),
            self.data.box_fruit_fa2_address,
            "add_token",
        ).open_some()
        sp.transfer(params.tokens, sp.tez(0), c_fruit)


########
# Tests
########

if __name__ == "__main__":
    ###############
    # water_plants
    ###############
    @sp.add_test(name="water_plants works correctly")
    def test():
        scenario = sp.test_scenario()

        box_farm = BoxFarm(
            boxes=sp.big_map(
                l={
                    1: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(5),
                        times_watered=sp.nat(1),
                    ),
                    2: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(4),
                        times_watered=sp.nat(2),
                    ),
                    3: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(3),
                        times_watered=sp.nat(3),
                    ),
                    4: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(0),
                        times_watered=sp.nat(4),
                    ),
                    5: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(1),
                        times_watered=sp.nat(5),
                    ),
                    6: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(12),
                        times_watered=sp.nat(1),
                    ),
                }
            )
        )

        scenario += box_farm

        # When ALICE waters all her plants
        scenario += box_farm.water_plants([1, 2, 3, 4, 5, 6]).run(
            sender=Addresses.ALICE,
            now=sp.timestamp(21),
        )

        # Storage gets updated correctly - only first 3 are watered
        boxes = box_farm.data.boxes
        scenario.verify(boxes[1].last_watered == sp.timestamp(21))
        scenario.verify(boxes[2].last_watered == sp.timestamp(21))
        scenario.verify(boxes[3].last_watered == sp.timestamp(21))
        scenario.verify(boxes[1].times_watered == sp.nat(2))
        scenario.verify(boxes[2].times_watered == sp.nat(3))
        scenario.verify(boxes[3].times_watered == sp.nat(4))
        scenario.verify(boxes[4].times_watered == sp.nat(4))
        scenario.verify(boxes[5].times_watered == sp.nat(5))
        scenario.verify(boxes[6].times_watered == sp.nat(1))

    ##########
    # harvest
    ##########
    @sp.add_test(name="harvest works correctly")
    def test():
        scenario = sp.test_scenario()

        box_fruit_fa2 = BoxFruitFA2.BoxFruitFA2(
            admin=Addresses.ADMIN,
            token_metadata=sp.big_map(
                l={
                    1: sp.record(token_id=sp.nat(1), token_info={"": sp.bytes("0x55")}),
                    2: sp.record(token_id=sp.nat(2), token_info={"": sp.bytes("0x55")}),
                    3: sp.record(token_id=sp.nat(3), token_info={"": sp.bytes("0x55")}),
                    4: sp.record(token_id=sp.nat(4), token_info={"": sp.bytes("0x55")}),
                    5: sp.record(token_id=sp.nat(5), token_info={"": sp.bytes("0x55")}),
                }
            ),
            total_supply=sp.big_map(l={1: 0, 2: 0, 3: 0, 4: 0, 5: 0}),
        )
        box_farm = BoxFarm(
            box_fruit_fa2_address=box_fruit_fa2.address,
            boxes=sp.big_map(
                l={
                    1: sp.record(
                        creator=Addresses.ALICE,
                        last_watered=sp.timestamp(5),
                        times_watered=sp.nat(5),
                    ),
                }
            ),
            rarity_pairs=sp.map(
                l={
                    (0, 30): 1,
                    (30, 60): 2,
                    (60, 70): 3,
                    (70, 80): 4,
                    (80, 100): 5,
                }
            ),
        )

        scenario += box_fruit_fa2
        scenario += box_farm

        # Change the admin of fa2 to the farm contract
        scenario += box_fruit_fa2.set_admin(box_farm.address).run(sender=Addresses.ADMIN)

        # When Alice harvests box 1
        scenario += box_farm.harvest(sp.nat(1)).run(
            sender=Addresses.ALICE,
            now=sp.timestamp(16),
        )

        # Correct token is minted
        # (random number generated is 40 - default in smartpy test scenario for this mechanism)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 2)] == 1)

        # Box is deleted
        scenario.verify(~box_farm.data.boxes.contains(1))

    #########
    # deseed
    #########
    @sp.add_test(name="deseed works correctly")
    def test():
        scenario = sp.test_scenario()

        seed_token = FA12.FA12(Addresses.ADMIN)
        box_fruit_fa2 = BoxFruitFA2.BoxFruitFA2(
            admin=Addresses.ADMIN,
            ledger=sp.big_map(
                l={
                    (Addresses.ALICE, 1): 5,
                    (Addresses.ALICE, 2): 5,
                    (Addresses.ALICE, 3): 5,
                    (Addresses.ALICE, 4): 5,
                    (Addresses.ALICE, 5): 5,
                }
            ),
            token_metadata=sp.big_map(
                l={
                    1: sp.record(token_id=sp.nat(1), token_info={"": sp.bytes("0x55")}),
                    2: sp.record(token_id=sp.nat(2), token_info={"": sp.bytes("0x55")}),
                    3: sp.record(token_id=sp.nat(3), token_info={"": sp.bytes("0x55")}),
                    4: sp.record(token_id=sp.nat(4), token_info={"": sp.bytes("0x55")}),
                    5: sp.record(token_id=sp.nat(5), token_info={"": sp.bytes("0x55")}),
                }
            ),
            total_supply=sp.big_map(l={1: 5, 2: 5, 3: 5, 4: 5, 5: 5}),
        )
        box_farm = BoxFarm(
            box_fruit_fa2_address=box_fruit_fa2.address,
            seed_token_address=seed_token.address,
        )

        scenario += seed_token
        scenario += box_farm
        scenario += box_fruit_fa2

        # Mint seed tokens for box farm
        scenario += seed_token.mint(
            address=box_farm.address,
            value=sp.nat(150),
        ).run(sender=Addresses.ADMIN)

        # Change admin for the Box FA2
        scenario += box_fruit_fa2.set_admin(box_farm.address).run(sender=Addresses.ADMIN)

        # When Alice deseeds the FA2 tokens to get back seed
        scenario += box_farm.deseed(
            [
                sp.record(token_id=sp.nat(1), amount=sp.nat(1)),
                sp.record(token_id=sp.nat(2), amount=sp.nat(2)),
                sp.record(token_id=sp.nat(3), amount=sp.nat(3)),
                sp.record(token_id=sp.nat(4), amount=sp.nat(4)),
                sp.record(token_id=sp.nat(5), amount=sp.nat(5)),
            ]
        ).run(sender=Addresses.ALICE)

        # The tokens are burnt correctly
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 1)] == 4)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 2)] == 3)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 3)] == 2)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 4)] == 1)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 5)] == 0)

        # Correct # of seed tokens are transferred to Alice
        scenario.verify(seed_token.data.balances[Addresses.ALICE].balance == sp.nat(150))

    ########
    # merge
    ########
    @sp.add_test(name="merge works correctly")
    def test():
        scenario = sp.test_scenario()

        box_fruit_fa2 = BoxFruitFA2.BoxFruitFA2(
            admin=Addresses.ADMIN,
            ledger=sp.big_map(
                l={
                    (Addresses.ALICE, 1): 5,
                    (Addresses.ALICE, 2): 5,
                    (Addresses.ALICE, 3): 5,
                    (Addresses.ALICE, 4): 5,
                    (Addresses.ALICE, 5): 0,
                }
            ),
            token_metadata=sp.big_map(
                l={
                    1: sp.record(token_id=sp.nat(1), token_info={"": sp.bytes("0x55")}),
                    2: sp.record(token_id=sp.nat(2), token_info={"": sp.bytes("0x55")}),
                    3: sp.record(token_id=sp.nat(3), token_info={"": sp.bytes("0x55")}),
                    4: sp.record(token_id=sp.nat(4), token_info={"": sp.bytes("0x55")}),
                    5: sp.record(token_id=sp.nat(5), token_info={"": sp.bytes("0x55")}),
                }
            ),
            total_supply=sp.big_map(l={1: 5, 2: 5, 3: 5, 4: 5, 5: 5}),
        )
        box_farm = BoxFarm(
            box_fruit_fa2_address=box_fruit_fa2.address,
            merge_patterns=sp.big_map(
                l={
                    5: [
                        sp.record(token_id=1, amount=2),
                        sp.record(token_id=2, amount=2),
                        sp.record(token_id=3, amount=2),
                        sp.record(token_id=4, amount=2),
                    ]
                }
            ),
        )

        scenario += box_fruit_fa2
        scenario += box_farm

        # Change admin for the Box FA2
        scenario += box_fruit_fa2.set_admin(box_farm.address).run(sender=Addresses.ADMIN)

        # When Alice merges 8 tokens (2 each of first 4)
        scenario += box_farm.merge(5).run(sender=Addresses.ALICE)

        # Then correct NFTs are burnt and correct one is minted
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 1)] == 3)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 2)] == 3)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 3)] == 3)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 4)] == 3)
        scenario.verify(box_fruit_fa2.data.ledger[(Addresses.ALICE, 5)] == 1)

    sp.add_compilation_target("box_farm", BoxFarm())
