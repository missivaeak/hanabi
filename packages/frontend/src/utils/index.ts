import type { Result } from "../types";

export function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

export const TAU = 6.283185;
export const HAND_SIZE = 4;

export function range(length: number): number[];
export function range(start: number, length: number): number[];
export function range(arg1: number, arg2?: number) {
  if (arg2) {
    const start = arg1;
    const end = arg2;
    const range = [...Array(end).keys()];
    return range.splice(start);
  }

  const length = arg1;
  return [...Array(length).keys()];
}

export function makeResult<T>(value: T): Result<T> & { value: T } {
  return {
    value: value,
    error: null,
  };
}

export function makeError(error: string) {
  return {
    value: null,
    error,
  };
}

export const DEFAULT_DELAY = 100;
export function delay(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms ?? DEFAULT_DELAY));
}
