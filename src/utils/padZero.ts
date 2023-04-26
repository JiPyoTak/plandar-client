const padZero = (number: number | string, amount = 2) => {
  return number.toString().padStart(amount, '0');
};

export { padZero };
