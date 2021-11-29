import smartpy as sp


class FlashDummy(sp.Contract):
    def __init__(self):
        self.init()

    @sp.entry_point
    def default(self):
        pass

    @sp.entry_point
    def execute_operation(self):
        pass
