import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<number> {
    let totalSum = 0;

    const numbersRegEx = /\d/g;

    const lines = await readLocalFile("src\\inputFiles\\Day01.txt");

    lines.forEach((line) => {
        const matches = line.match(numbersRegEx);

        if (matches !== null) {
            totalSum += parseInt(matches[0] + matches[matches.length - 1]);
        }
    });

    return totalSum;
}
