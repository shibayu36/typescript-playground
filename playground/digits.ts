function digits(val: number, min: number, precision: number): number {
  return val === 0 ? 0 : Math.ceil(Math.max(-Math.log10(Math.abs(val)) + precision - 1, min));
}

function unitValue(val: number): string {
  return val.toFixed(digits(val, 1, 2));
}

console.log(unitValue(204));
console.log(unitValue(0.12));
console.log(unitValue(0.5));
console.log(unitValue(0.567));
console.log(unitValue(0.067));

console.log(Math.log10(0.0041));
console.log(Math.ceil(-Math.log10(0.0041)));
console.log(Math.ceil(-Math.log10(123.4)));
