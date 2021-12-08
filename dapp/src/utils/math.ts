import BigNumber from "bignumber.js";

export const divide = (val1: string | number, val2: string | number): string => {
  return new BigNumber(val1).dividedBy(val2).toString();
};

export const multiply = (val1: string | number, val2: string | number): string => {
  return new BigNumber(val1).multipliedBy(val2).toString();
};
