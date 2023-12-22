export function factorize(numberToFactorize: number): number[] {
    const factors: number[] = [];

    for (let divisor = 2; divisor <= numberToFactorize; divisor++) {
        while (numberToFactorize % divisor === 0) {
            factors.push(divisor);
            numberToFactorize /= divisor;
        }
    }
    return factors;
}
