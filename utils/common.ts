export const getTotalArrayValue = (array: number[]): number => {
  if (!Array.isArray(array) || array.length === 0) return 0;
  return array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};
