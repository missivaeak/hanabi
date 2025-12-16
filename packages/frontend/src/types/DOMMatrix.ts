export function matrixToCss(matrix: DOMMatrix) {
  return `matrix3d(${[
    matrix.m11,
    matrix.m12,
    matrix.m13,
    matrix.m14,
    matrix.m21,
    matrix.m22,
    matrix.m23,
    matrix.m24,
    matrix.m31,
    matrix.m32,
    matrix.m33,
    matrix.m34,
    matrix.m41,
    matrix.m42,
    matrix.m43,
    matrix.m44,
  ].join(",")})`;
}

declare global {
  interface DOMMatrix {
    toCSS(): string;
    copy(): DOMMatrix;
  }
}

DOMMatrix.prototype.toCSS = function (this: DOMMatrix) {
  return matrixToCss(this);
};

DOMMatrix.prototype.copy = function (this: DOMMatrix) {
  return DOMMatrix.fromMatrix(this);
};
