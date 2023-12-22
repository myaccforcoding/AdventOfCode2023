import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day03.txt");
    const numberRegex = /\d+/g;
    let totalSum = 0;

    lines.forEach((line, index) => {
        let matchedNumberInLine;
        const y = index;

        while ((matchedNumberInLine = numberRegex.exec(line)) !== null) {
            const charsAdjacentToCurrentNumber = [];

            // checks if a line above the current one exists and gets all chars adjacent to the top of the current number
            if (lines[y - 1] !== undefined && lines[y - 1] !== "") {
                const startColumnIndex = Math.max(
                    0,
                    matchedNumberInLine.index - 1,
                );
                const endColumnIndex = Math.min(
                    matchedNumberInLine.index +
                        matchedNumberInLine[0].length +
                        1,
                    lines[y - 1].length,
                );

                for (let x = startColumnIndex; x < endColumnIndex; x++) {
                    charsAdjacentToCurrentNumber.push(lines[y - 1][x]);
                }
            }

            // checks if a column to the left of the current one exists and gets the char adjacent to the left of the current number
            if (
                line[matchedNumberInLine.index - 1] !== undefined &&
                line[matchedNumberInLine.index - 1] !== ""
            ) {
                charsAdjacentToCurrentNumber.push(
                    line[matchedNumberInLine.index - 1],
                );
            }

            // checks if a column to the right of the current one exists and gets the char adjacent to the right of the current number
            if (
                line[
                    matchedNumberInLine.index + matchedNumberInLine[0].length
                ] !== undefined &&
                line[
                    matchedNumberInLine.index + matchedNumberInLine[0].length
                ] !== ""
            ) {
                charsAdjacentToCurrentNumber.push(
                    line[
                        matchedNumberInLine.index +
                            matchedNumberInLine[0].length
                    ],
                );
            }

            // checks if a line below the current one exists and gets all chars adjacent to the below of the current number
            if (lines[y + 1] !== undefined && lines[y + 1] !== "") {
                const startColumnIndex = Math.max(
                    0,
                    matchedNumberInLine.index - 1,
                );
                const end = Math.min(
                    matchedNumberInLine.index +
                        matchedNumberInLine[0].length +
                        1,
                    lines[y + 1].length,
                );

                for (let x = startColumnIndex; x < end; x++) {
                    charsAdjacentToCurrentNumber.push(lines[y + 1][x]);
                }
            }

            const hasSpecialChar = charsAdjacentToCurrentNumber.some(
                (char) => char !== "." && char !== undefined,
            );

            if (hasSpecialChar) {
                totalSum += parseInt(matchedNumberInLine[0]);
            }
        }
    });
    return totalSum;
}
