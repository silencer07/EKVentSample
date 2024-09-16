export const formatNumber = (num: number) => {
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(1) + 'B'; // Billions
  }
  if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(1) + 'M'; // Millions
  }
  if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(1) + 'K'; // Thousands
  }
  return num.toString(); // Less than thousands
};
