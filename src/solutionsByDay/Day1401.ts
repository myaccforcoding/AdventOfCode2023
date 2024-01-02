import { readLocalFile } from "../helper/localFileReader";

interface RocksIndices {
    cubeRocksRowIndex: number[];
    roundRocksRowIndex: number[];
}

const rockIndicesByColumn: Record<number, RocksIndices> = {};

const cubeRockChar = "#";
const roundRockChar = "O";

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day14.txt");

    lines.forEach((line, index) => {
        // we start at -1 since if there is no # on row 0 there is a virtual # at -1 because round rocks do not fall off
        for (let i = 0; i < line.length; i++) {
            if (
                rockIndicesByColumn[i] === undefined ||
                rockIndicesByColumn[i] === null
            ) {
                rockIndicesByColumn[i] = {
                    cubeRocksRowIndex: [-1],
                    roundRocksRowIndex: [],
                };
            }

            if (line[i] === cubeRockChar)
                rockIndicesByColumn[i].cubeRocksRowIndex.push(index);
            if (line[i] === roundRockChar)
                rockIndicesByColumn[i].roundRocksRowIndex.push(index);
        }
    });

    let currentWeight = 0;

    for (const column in rockIndicesByColumn) {
        const { cubeRocksRowIndex, roundRocksRowIndex } =
            rockIndicesByColumn[column];

        cubeRocksRowIndex.push(lines.length);
        for (let i = 0; i < cubeRocksRowIndex.length - 1; i++) {
            const roundRocksInBetween = roundRocksRowIndex.filter(
                (roundRockRowIndex) =>
                    roundRockRowIndex > cubeRocksRowIndex[i] &&
                    roundRockRowIndex < cubeRocksRowIndex[i + 1],
            );
            if (roundRocksInBetween.length > 0) {
                const cubeA = cubeRocksRowIndex[i];
                const amount = roundRocksInBetween.length;
                const start = lines.length - (cubeA + 1);

                for (let r = start; r > start - amount; r--) {
                    currentWeight += r;
                }
            }
        }
    }
    return currentWeight;
}
