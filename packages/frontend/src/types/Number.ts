declare global {
  interface Number {
    mod(modulus: number): number;
  }
}

Number.prototype.mod = function (this: number, other: number) {
  return mod(this, other);
};

export function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
