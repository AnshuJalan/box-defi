import { WalletParamsWithKind, OpKind, WalletOperationBatch, ContractMethod, Wallet } from "@taquito/taquito";
import BigNumber from "bignumber.js";

// Utils
import { kUSDAddress, boxPoolAddress } from "../utils/global";
import { multiply } from "../utils/math";

// API
import { getFA12Approval } from "../api";

// Redux store
import { store } from "..";

export const lockTokens = async (value: string): Promise<WalletOperationBatch | undefined> => {
  const { accountPkh } = store.getState().wallet;
  const { kUSDContract, boxPoolContract, tezos } = store.getState().contract;

  if (!kUSDContract || !boxPoolContract || !tezos) return;

  const opList: WalletParamsWithKind[] = [];

  const valueBN = multiply(value, 10 ** 18);

  let hasApproved = false;

  try {
    // Check for approval value
    const approvalAmount = await getFA12Approval(kUSDAddress, accountPkh, boxPoolAddress);
    if (new BigNumber(approvalAmount).isLessThan(valueBN)) {
      opList.push({
        kind: OpKind.TRANSACTION,
        ...kUSDContract.methods.approve(boxPoolAddress, valueBN.toString()).toTransferParams(),
      });
      hasApproved = true;
    }

    // Main operation
    opList.push({
      kind: OpKind.TRANSACTION,
      ...boxPoolContract.methods.lock_tokens(valueBN.toString()).toTransferParams(),
    });

    // Revoke approval
    if (hasApproved) {
      opList.push({
        kind: OpKind.TRANSACTION,
        ...kUSDContract.methods.approve(boxPoolAddress, 0).toTransferParams(),
      });
    }

    // Return operation instance
    const batch = await tezos.wallet.batch(opList);
    return batch;
  } catch (err) {
    throw err;
  }
};

export const unlockTokens = async (value: string): Promise<ContractMethod<Wallet> | undefined> => {
  const { boxPoolContract } = store.getState().contract;

  if (!boxPoolContract) return;

  try {
    const op = await boxPoolContract.methods.unlock_tokens(multiply(value, 10 ** 18));
    return op;
  } catch (err) {
    throw err;
  }
};
