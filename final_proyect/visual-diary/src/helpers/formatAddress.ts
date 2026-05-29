export const formatAddress = (address: string, maxLength = 50): string => {
  if (!address) return "No address";
  if (address.length <= maxLength) return address;
  return `${address.slice(0, maxLength)}…`;
};
