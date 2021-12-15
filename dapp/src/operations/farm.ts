import { WalletParamsWithKind, OpKind, WalletOperationBatch } from "@taquito/taquito";
import BigNumber from "bignumber.js";

// Utils
import { boxFarmAddress, seedAddress, seedsPerBox } from "../utils/global";
import { multiply } from "../utils/math";

// API
import { getFA12Approval } from "../api";

// Redux store
import { store } from "..";

export const plantSeeds = async (boxes: number): Promise<WalletOperationBatch | undefined> => {
  const { accountPkh } = store.getState().wallet;
  const { boxFarmContract, seedContract, tezos } = store.getState().contract;

  if (!boxFarmContract || !seedContract || !tezos) return;

  const opList: WalletParamsWithKind[] = [];

  const seedRequired = multiply(boxes * seedsPerBox, 10 ** 18);

  let hasApproved = false;

  try {
    // Check for approval value
    const approvalAmount = await getFA12Approval(seedAddress, accountPkh, boxFarmAddress);
    if (new BigNumber(approvalAmount).isLessThan(seedRequired)) {
      opList.push({
        kind: OpKind.TRANSACTION,
        ...seedContract.methods.approve(boxFarmAddress, seedRequired.toString()).toTransferParams(),
      });
      hasApproved = true;
    }

    // Main operation
    opList.push({
      kind: OpKind.TRANSACTION,
      ...boxFarmContract.methods.plant_seeds(boxes).toTransferParams(),
    });

    // Revoke approval
    if (hasApproved) {
      opList.push({
        kind: OpKind.TRANSACTION,
        ...seedContract.methods.approve(boxFarmAddress, 0).toTransferParams(),
      });
    }

    // Return operation instance
    const batch = await tezos.wallet.batch(opList);
    return batch;
  } catch (err) {
    throw err;
  }
};
