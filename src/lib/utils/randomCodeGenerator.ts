import { randomInt } from "crypto";

export function generateRandomCode(numberOfDigits: number): number {
  const min = Math.pow(10, numberOfDigits - 1);
  const max = Math.pow(10, numberOfDigits) - 1;
  return randomInt(min, max);
}
