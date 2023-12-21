import { factorize } from "./factorization";

type PrimeFactorAndCount = Record<string, number>;

export function calculateLeastCommonMultiple(numbers: number[]): number {
  const primesToCalculateLCM: PrimeFactorAndCount = {};

  numbers.forEach((numberToFactorize) => {
    const primeFactorsAndCount: PrimeFactorAndCount = {};
    const factors = factorize(numberToFactorize);
    factors.forEach((factor) => {
      primeFactorsAndCount[factor] =
        (primeFactorsAndCount[factor] ?? 0) > 0
          ? primeFactorsAndCount[factor] + 1
          : 1;
    });

    for (const factor in primeFactorsAndCount) {
      if ((primesToCalculateLCM[factor] ?? 0) > 0) {
        primesToCalculateLCM[factor] = Math.max(
          primesToCalculateLCM[factor],
          primeFactorsAndCount[factor],
        );
      } else {
        primesToCalculateLCM[factor] = primeFactorsAndCount[factor];
      }
    }
  });

  let lcm = 1;
  for (const factor in primesToCalculateLCM) {
    lcm *= Math.pow(parseInt(factor), primesToCalculateLCM[factor]);
  }

  return lcm;
}
