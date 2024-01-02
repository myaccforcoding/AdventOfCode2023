import { readLocalFile } from "../helper/localFileReader";

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

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day15.txt");
    let result = 0;
    lines.forEach((line) => {
        const entry = line.split(",");
        entry.forEach((entry) => {
            result += hashString(entry);
        });
    });
    return result;
}
