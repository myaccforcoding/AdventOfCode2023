import { readLocalFile } from "../helper/localFileReader";

function extrapolate(sequence: number[]): number {
    const firstOfEachSequence: number[] = [];

    while (!sequence.every((element) => element === 0)) {
        firstOfEachSequence.push(sequence[0]);
        sequence = sequence.slice(1).map((number, index) => number - sequence[index]);
    }

    let newLastElement = 0;

    firstOfEachSequence.reverse().forEach((element) => {
        newLastElement = element - newLastElement;
    });

    return newLastElement;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day09.txt");
    let result = 0;

    lines.forEach((line) => {
        const sequence = line.split(" ").map((element) => parseInt(element));
        result += extrapolate(sequence);
    });

    return result;
}
