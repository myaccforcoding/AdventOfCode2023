import { readLocalFile } from "../helper/localFileReader";
import { transposeArray } from "../helper/transposeArray";

function moveRocksPerLineInGivenDirection(input: string, direction: number = 1): string {
    const countOfRoundRocks = input.match(/O/g)?.length;

    let moved = input;
    if (countOfRoundRocks !== null && countOfRoundRocks !== undefined && countOfRoundRocks > 0) {
        const countOfSpaces = input.length - countOfRoundRocks;
        if (direction > 0) {
            moved = "O".repeat(countOfRoundRocks).concat(".".repeat(countOfSpaces));
        } else {
            moved = ".".repeat(countOfSpaces).concat("O".repeat(countOfRoundRocks));
        }
    }
    return moved;
}

function tiltPlatform(input: string[], tiltDirection: number): string[] {
    const tiltedInput: string[] = [];
    input.forEach((line) => {
        const split = line.split("#");
        tiltedInput.push(split.map((subStr) => moveRocksPerLineInGivenDirection(subStr, tiltDirection)).join("#"));
    });

    return tiltedInput;
}

function rotateOneCycle(lines: string[]): string[] {
    lines = transposeArray(lines);
    lines = tiltPlatform(lines, 1);

    lines = transposeArray(lines);
    lines = tiltPlatform(lines, 1);

    lines = transposeArray(lines);
    lines = tiltPlatform(lines, -1);

    lines = transposeArray(lines);
    lines = tiltPlatform(lines, -1);
    return lines;
}

export async function runSolution(): Promise<number> {
    let lines = await readLocalFile("src\\inputFiles\\Day14.txt");
    const windowSize = 1000;
    const window = new Array(windowSize);
    let rotatedLines: string[] = [];
    let count = 0;
    do {
        rotatedLines = rotateOneCycle(lines);
        window[count % windowSize] = JSON.stringify(rotatedLines);
        for (let i = 0; i < count; i++) {
            if (window[i] === window[(i + count) % windowSize]) {
                break;
            }
        }
        lines = rotatedLines;
        count++;
    } while (count < windowSize);
    let result = 0;
    rotatedLines.forEach((line, index) => {
        const numberOfRoundRocksInLine = line.match(/O/g);
        if (numberOfRoundRocksInLine !== null) {
            result += numberOfRoundRocksInLine.length * (rotatedLines.length - index);
        }
    });

    return result;
}
