import { readLocalFile } from "../helper/localFileReader";

const stringNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

type WordToDigitMapping = Record<string, string>;

const stringToNumberMapping: WordToDigitMapping = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};
const possibleMatches = [...stringNumbers, ...numbers];

export async function runSolution(): Promise<number> {
    let totalSum = 0;
    const lines = await readLocalFile("src\\inputFiles\\Day01.txt");

    lines.forEach((line) => {
        const firstNumberMatchRegex = new RegExp(
            possibleMatches.join("|"),
            "i",
        );
        const firstMatchInLine = line.match(firstNumberMatchRegex);

        const results = [];

        if (firstMatchInLine !== null) {
            if (stringNumbers.includes(firstMatchInLine[0])) {
                results.push(stringToNumberMapping[firstMatchInLine[0]]);
            } else {
                results.push(firstMatchInLine[0]);
            }
        }

        const reversedInput = line.split("").reverse().join("");
        const reversedRegex = new RegExp(
            possibleMatches.join("|").split("").reverse().join(""),
            "i",
        );

        const lastMatchInLine = reversedInput.match(reversedRegex);

        if (lastMatchInLine !== null) {
            const lastMatch = lastMatchInLine[0].split("").reverse().join("");
            if (lastMatch !== "") {
                if (stringNumbers.includes(lastMatch)) {
                    results.push(stringToNumberMapping[lastMatch]);
                } else {
                    results.push(lastMatch);
                }
            }
        }

        totalSum += parseInt(results.join(""));
    });

    return totalSum;
}
