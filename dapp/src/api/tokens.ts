import axios from "axios";

// Utils
import { apiURL } from "../utils/global";

export const getFA12Balance = async (tokenAddress: string, accountPkh: string): Promise<string> => {
  try {
    const _res = await axios.get(`${apiURL}/contracts/${tokenAddress}/storage`);
    const bigMap = _res.data.balances || _res.data.ledger;
    const __res = await axios.get(`${apiURL}/bigmaps/${bigMap}/keys/${accountPkh}`);
    if (__res.data) {
      return __res.data.value.balance;
    } else {
      return "0";
    }
  } catch (err) {
    throw err;
  }
};

export const getFA2Balance = async (tokenAddress: string, accountPkh: string, tokenId: string): Promise<string> => {
  try {
    const _res = await axios.get(`${apiURL}/contracts/${tokenAddress}/storage`);
    const bigMap = _res.data.ledger;
    const key = { nat: tokenId, address: accountPkh };
    const __res = await axios.get(`${apiURL}/bigmaps/${bigMap}/keys/${JSON.stringify(key)}`);
    if (__res.data) {
      return __res.data.value;
    } else {
      return "0";
    }
  } catch (err) {
    throw err;
  }
};

export const getFA12TotalSupply = async (tokenAddress: string): Promise<string> => {
  try {
    const _res = await axios.get(`${apiURL}/contracts/${tokenAddress}/storage`);
    return _res.data.totalSupply;
  } catch (err) {
    throw err;
  }
};

export const getFA12Approval = async (tokenAddress: string, accountPkh: string, spender: string): Promise<string> => {
  try {
    const _res = await axios.get(`${apiURL}/contracts/${tokenAddress}/storage`);
    const bigMap = _res.data.balances || _res.data.ledger;
    const __res = await axios.get(`${apiURL}/bigmaps/${bigMap}/keys/${accountPkh}`);
    if (__res.data && __res.data.value.approvals[spender]) {
      return __res.data.value.approvals[spender];
    } else {
      return "0";
    }
  } catch (err) {
    throw err;
  }
};

export const getFA2TotalSupply = async (tokenAddress: string, tokenId: string): Promise<string> => {
  try {
    const _res = await axios.get(`${apiURL}/contracts/${tokenAddress}/storage`);
    const bigMap = _res.data.total_supply;
    const __res = await axios.get(`${apiURL}/bigmaps/${bigMap}/keys/${tokenId}`);
    if (__res.data) {
      return __res.data.value;
    } else {
      return "0";
    }
  } catch (err) {
    throw err;
  }
};
