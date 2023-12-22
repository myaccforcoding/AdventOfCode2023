import { readLocalFile } from "../helper/localFileReader";

type KeyValuePair = Record<string, number>;

const knownPatternsAndPossibleArrangementCount: KeyValuePair = {};

function calculatePossibleArrangements(
    springPattern: string,
    defectSprings: number[],
): number {
    const key = `${springPattern}-${defectSprings.join(",")}`;
    if (key in knownPatternsAndPossibleArrangementCount) {
        return knownPatternsAndPossibleArrangementCount[key];
    }

    let result = 0;

    if (springPattern.length === 0 && defectSprings.length === 0) {
        result = 1;
    } else if (defectSprings.length === 0 && springPattern.includes("#")) {
        result = 0;
    } else if (springPattern.startsWith(".")) {
        result += calculatePossibleArrangements(
            springPattern.substring(1),
            defectSprings,
        );
    } else if (springPattern.startsWith("?")) {
        result += calculatePossibleArrangements(
            springPattern.replace("?", "."),
            defectSprings,
        );
        result += calculatePossibleArrangements(
            springPattern.replace("?", "#"),
            defectSprings,
        );
    } else if (springPattern.startsWith("#")) {
        if (
            !springPattern.substring(0, defectSprings[0]).includes(".") &&
            springPattern.length >= defectSprings[0]
        ) {
            // group of valid size found

            if (
                springPattern.substring(defectSprings[0]).startsWith(".") ||
                springPattern.substring(defectSprings[0]).startsWith("?")
            ) {
                // the group can be followed by a .

                result += calculatePossibleArrangements(
                    springPattern.substring(defectSprings[0] + 1),
                    defectSprings.slice(1),
                );
            } else if (springPattern.substring(defectSprings[0]) === "") {
                result += calculatePossibleArrangements(
                    springPattern.substring(defectSprings[0]),
                    defectSprings.slice(1),
                );
            }
        }
    }

    knownPatternsAndPossibleArrangementCount[key] = result;
    return result;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day12.txt");
    let totalCount = 0;
    lines.forEach((line) => {
        const [springPattern, listOfDefectSprings] = line.split(" ");
        const defectSprings = listOfDefectSprings.split(",").map(Number);
        totalCount += calculatePossibleArrangements(
            springPattern,
            defectSprings,
        );
    });

    return totalCount;
}
