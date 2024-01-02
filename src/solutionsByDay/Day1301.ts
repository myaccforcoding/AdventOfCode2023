import { readLocalFile } from "../helper/localFileReader";
import { transposeArray } from "../helper/transposeArray";

function inputToPatterns(lines: string[]): string[][] {
    const patterns = [];
    let currentPattern: string[] = [];

    lines.forEach((line) => {
        if (line !== "") {
            currentPattern.push(line);
        } else {
            patterns.push(currentPattern);
            currentPattern = [];
        }
    });

    if (currentPattern.length > 0) {
        patterns.push(currentPattern);
    }

    return patterns;
}

function getReflectionIndex(pattern: string[]): number {
    let reflectionIndex: number = -1;

    for (let index = 0; index < pattern.length; index++) {
        if (
            index < pattern.length - 1 &&
            pattern[index] === pattern[index + 1]
        ) {
            const width = Math.min(index, pattern.length - (index + 2));
            let isMirrored = true;
            for (let i = 1; i <= width; i++) {
                if (pattern[index - i] !== pattern[index + i + 1]) {
                    isMirrored = false;
                    break;
                }
            }
            if (isMirrored) {
                reflectionIndex = index;
                break;
            }
        }
    }

    return reflectionIndex;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day13.txt");
    const patterns = inputToPatterns(lines);

    let result = 0;

    patterns.forEach((pattern) => {
        let index = getReflectionIndex(pattern);
        if (index !== -1) {
            result += (index + 1) * 100;
        } else {
            index = getReflectionIndex(transposeArray(pattern));
            result += index + 1;
        }
    });

    return result;
}
