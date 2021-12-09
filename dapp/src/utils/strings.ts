export const formatAddress = (address: string): string => {
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

export const formatTokenBalance = (balance: string, decimals: number): string => {
  return (parseFloat(balance) / 10 ** decimals).toFixed(2).replace(/[.,]00$/, "");
};
