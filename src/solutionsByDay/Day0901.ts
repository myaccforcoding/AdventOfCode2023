import { readLocalFile } from "../helper/localFileReader";

function extrapolate(sequence: number[]): number {
    let lastOfEachSequence: number[] = [];

    while (!sequence.every((element) => element === 0)) {
        lastOfEachSequence.push(sequence[sequence.length - 1]);
        sequence = sequence.slice(1).map((number, index) => number - sequence[index]);
    }

    let newLastElement = 0;

    lastOfEachSequence.reverse().forEach((element) => {
        newLastElement = newLastElement + element;
    });

    return newLastElement;
}

export async function runSolution(): Promise<void> {
    const lines = await readLocalFile("src\\inputFiles\\Day09.txt");
    let result = 0;

    lines.forEach((line) => {
        const sequence = line.split(" ").map((element) => parseInt(element));
        result += extrapolate(sequence);
    });

    console.log(result);
}
