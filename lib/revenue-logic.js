export const calculateFee = (amount) => {
  const FEE_PERCENTAGE = 0.10; // 10%
  const fee = amount * FEE_PERCENTAGE;
  return {
    netAmount: amount - fee,
    feeAmount: fee
  };
};
