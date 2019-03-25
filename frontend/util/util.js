export const formatMoney = (number) => {
  // credits: https://stackoverflow.com/questions/40426965/javascript-function-to-format-as-money
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}