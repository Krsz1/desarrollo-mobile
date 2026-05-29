export const formatAddress = (address: string, maxLength = 50): string => {
  if (!address) return "Sin dirección";
  if (address.length <= maxLength) return address;
  return `${address.slice(0, maxLength)}…`;
};
