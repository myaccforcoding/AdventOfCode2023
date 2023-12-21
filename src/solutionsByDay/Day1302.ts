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

function getNumberOfDifferencesPerChar(lineA: string, lineB: string): number {
  let differences = 0;
  for (let i = 0; i < lineA.length; i++) {
    if (lineA[i] !== lineB[i]) {
      differences++;
    }
  }
  return differences;
}

function getRefelctionIndex(pattern: string[]): number {
  let refelctionIndex: number = -1;
  for (let index = 0; index < pattern.length; index++) {
    let smudgeCount = 0;
    if (index < pattern.length - 1) {
      smudgeCount += getNumberOfDifferencesPerChar(
        pattern[index],
        pattern[index + 1],
      );
      if (pattern[index] === pattern[index + 1] || smudgeCount === 1) {
        const width = Math.min(index, pattern.length - (index + 2));
        let isMirrored = true;
        for (let i = 1; i <= width; i++) {
          smudgeCount += getNumberOfDifferencesPerChar(
            pattern[index - i],
            pattern[index + i + 1],
          );
          if (smudgeCount > 1) {
            isMirrored = false;
            break;
          }
        }
        if (isMirrored && smudgeCount === 1) {
          refelctionIndex = index;
          break;
        }
      }
    }
  }

  return refelctionIndex;
}

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day13.txt");
  const patterns = inputToPatterns(lines);

  let result = 0;

  patterns.forEach((pattern) => {
    let index = getRefelctionIndex(pattern);
    if (index !== -1) {
      result += (index + 1) * 100;
    } else {
      index = getRefelctionIndex(transposeArray(pattern));
      result += index + 1;
    }
  });

  console.log(result);
}
