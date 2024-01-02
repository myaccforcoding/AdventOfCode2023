import { readLocalFile } from "../helper/localFileReader";

interface Lens {
    label: string;
    focalLength: number;
}

function hashString(stringToHash: string): number {
    let hashedValue = 0;
    for (let i = 0; i < stringToHash.length; i++) {
        hashedValue = hashCharacter(hashedValue, stringToHash.charAt(i));
    }
    return hashedValue;
}

function hashCharacter(startingValue: number, characterToHash: string): number {
    const asciiValue = characterToHash.charCodeAt(0);
    return ((asciiValue + startingValue) * 17) % 256;
}

function getOperationSequence(input: string): string | null {
    const regex = /-\w*$|=\w*$/;
    const match = input.match(regex);

    if (match !== null) {
        if (match[0].startsWith("=")) {
            return match[0].substring(1);
        }
        return match[0];
    }
    return null;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day15.txt");
    const boxesAndLenses: Record<number, Lens[]> = {};
    for (let i = 0; i <= 255; i++) {
        boxesAndLenses[i] = [];
    }

    lines.forEach((line) => {
        const entry = line.split(",");
        entry.forEach((entry) => {
            const lensLabel = entry.split(/[-=]/)[0];
            const operation = getOperationSequence(entry);
            const boxId = hashString(lensLabel);

            let existingIndex = -1;
            if (boxesAndLenses[boxId].length >= 0) {
                existingIndex = boxesAndLenses[boxId].findIndex(
                    (lense) => lense.label === lensLabel,
                );
            }
            if (operation !== null) {
                if (operation === "-") {
                    if (existingIndex >= 0) {
                        boxesAndLenses[boxId].splice(existingIndex, 1);
                    }
                } else {
                    if (existingIndex >= 0) {
                        boxesAndLenses[boxId][existingIndex].focalLength =
                            parseInt(operation);
                    } else {
                        boxesAndLenses[boxId].push({
                            label: lensLabel,
                            focalLength: parseInt(operation),
                        });
                    }
                }
            }
        });
    });

    let result = 0;

    for (let index = 0; index < 256; index++) {
        boxesAndLenses[index].forEach((lense, lenseIndex) => {
            result += (index + 1) * (lenseIndex + 1) * lense.focalLength;
        });
    }

    return result;
}
