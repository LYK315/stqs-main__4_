// Add comma to thousands
function formatThousands(value: number) {
  const number = new Intl.NumberFormat('en-US').format(Number(value))
  return number.toString();
};

export default formatThousands;