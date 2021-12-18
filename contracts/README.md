# Contracts

All contracts are written in [SmartPy](https://smartpy.io). Refer to there elaborate [documentation](https://smartpy.io/docs) for further understanding.

## Folder Structure

- `helpers` : Consists of test helpers like an FA1.2 contract, a dummy contract to handle tez transfers and dummy addresses.
- `michelson` : Compiled michelson code.
- `types` : Types and error statements used across the contract.
- `utils` : Utilities for errors

## Compilation

A shell script has been provided to assist compilation and testing of the contracts. The script can be run using-

```shell
$ bash compile.sh
```

## Flash Loan System

The flash loan system can be accessed by deploying a proxy contract of the format:

```python
import smartpy as sp

class FlashProxy(sp.Contract):
    def __init__(self, **args):
        self.init(**args)

    @sp.entry_point
    def default(self):
        pass

    @sp.entry_point
    def execute_operation(self):
        # Code that uses the retrieved loan in kUSD
```

Once this contract is deployed, the entrypoint `flash_loan` of Box Pool contract can be called with the `value` parameter as the amount of kUSD to be loaned and `receiver_contract` as the address of the deployed proxy contract.
