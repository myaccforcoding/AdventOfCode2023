import { readLocalFile } from "../helper/localFileReader";

type WordToDigitMapping = Record<string, string>;

export async function runSolution(): Promise<number> {
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

    let totalSum = 0;
    const lines = await readLocalFile("src\\inputFiles\\Day01.txt");

    lines.forEach((line) => {
        const regex = new RegExp(possibleMatches.join("|"), "i");
        const firstMatch = line.match(regex);

        const results = [];

        if (firstMatch !== null) {
            if (stringNumbers.includes(firstMatch[0])) {
                results.push(stringToNumberMapping[firstMatch[0]]);
            } else {
                results.push(firstMatch[0]);
            }
        }

        const reversedInput = line.split("").reverse().join("");
        const reversedRegex = new RegExp(
            possibleMatches.join("|").split("").reverse().join(""),
            "i",
        );
        const reversedMatch = reversedInput.match(reversedRegex);
        if (reversedMatch !== null) {
            const lastMatch = reversedMatch[0].split("").reverse().join("");
            if (lastMatch !== "") {
                if (stringNumbers.includes(lastMatch)) {
                    results.push(stringToNumberMapping[lastMatch]);
                } else {
                    results.push(lastMatch);
                }
            }
        }

        totalSum += parseInt(results[0] + results[results.length - 1]);
    });

    return totalSum;
}
