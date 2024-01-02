import { readLocalFile } from "../helper/localFileReader";

interface StarsAndAdjacentNumbers {
    starCoordinates: {
        x: number;
        y: number;
    };
    adjacentNumbers: number[];
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day03.txt");
    const numberRegex = /\d+/g;
    let totalSum = 0;
    const allStarsAndAdjacentNumbers: StarsAndAdjacentNumbers[] = [];

    function processAdjacentNumbers(
        x: number,
        y: number,
        adjacentNumber: number,
    ): void {
        const existingEntryIndex = allStarsAndAdjacentNumbers.findIndex(
            (starEntry) =>
                starEntry.starCoordinates.x === x &&
                starEntry.starCoordinates.y === y,
        );

        if (existingEntryIndex >= 0) {
            allStarsAndAdjacentNumbers[existingEntryIndex].adjacentNumbers.push(
                adjacentNumber,
            );
        } else {
            allStarsAndAdjacentNumbers.push({
                adjacentNumbers: [adjacentNumber],
                starCoordinates: { x, y },
            });
        }
    }

    lines.forEach((line, y) => {
        let number;
        while ((number = numberRegex.exec(line)) !== null) {
            const currentNumber = parseInt(number[0]); // Convert to number
            const startX = Math.max(0, number.index - 1);
            const endX = Math.min(
                number.index + number[0].length + 1,
                line.length,
            );

            for (let x = startX; x < endX; x++) {
                if (y > 0 && lines[y - 1][x] === "*") {
                    processAdjacentNumbers(x, y - 1, currentNumber);
                }

                if (lines[y][x] === "*" && x !== number.index - 1) {
                    processAdjacentNumbers(x, y, currentNumber);
                }

                if (
                    lines[y][x] === "*" &&
                    x !== number.index + number[0].length
                ) {
                    processAdjacentNumbers(x, y, currentNumber);
                }

                if (y < lines.length - 1 && lines[y + 1][x] === "*") {
                    processAdjacentNumbers(x, y + 1, currentNumber);
                }
            }
        }
    });

    const gears = allStarsAndAdjacentNumbers.filter(
        (star) => star.adjacentNumbers.length === 2,
    );

    gears.forEach((gear) => {
        totalSum += gear.adjacentNumbers[0] * gear.adjacentNumbers[1];
    });

    return totalSum;
}
