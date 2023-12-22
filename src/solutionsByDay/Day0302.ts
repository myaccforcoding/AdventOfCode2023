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
    const regex = /\d+/g;
    let totalSum = 0;
    const allStartsAndNeighborNumbers: StarsAndAdjacentNumbers[] = [];

    lines.forEach((line, index) => {
        let number;
        const y = index;

        while ((number = regex.exec(line)) !== null) {
            if (lines[y - 1] !== undefined && lines[y - 1] !== "") {
                const start = Math.max(0, number.index - 1);
                const end = Math.min(
                    number.index + number[0].length + 1,
                    lines[y - 1].length,
                );

                for (let x = start; x < end; x++) {
                    const character = lines[y - 1][x];
                    if (character === "*") {
                        const existingEntryIndex =
                            allStartsAndNeighborNumbers.findIndex(
                                (starEntry) =>
                                    starEntry.starCoordinates.x === x &&
                                    starEntry.starCoordinates.y === y - 1,
                            );
                        if (existingEntryIndex >= 0) {
                            allStartsAndNeighborNumbers[
                                existingEntryIndex
                            ].adjacentNumbers.push(parseInt(number[0]));
                        } else {
                            allStartsAndNeighborNumbers.push({
                                adjacentNumbers: [parseInt(number[0])],
                                starCoordinates: { x, y: y - 1 },
                            });
                        }
                    }
                }
            }

            if (
                line[number.index - 1] !== undefined &&
                line[number.index - 1] !== ""
            ) {
                const x = number.index - 1;
                const character = lines[y][x];
                if (character === "*") {
                    const existingEntryIndex =
                        allStartsAndNeighborNumbers.findIndex(
                            (starEntry) =>
                                starEntry.starCoordinates.x === x &&
                                starEntry.starCoordinates.y === y,
                        );
                    if (existingEntryIndex >= 0) {
                        allStartsAndNeighborNumbers[
                            existingEntryIndex
                        ].adjacentNumbers.push(parseInt(number[0]));
                    } else {
                        allStartsAndNeighborNumbers.push({
                            adjacentNumbers: [parseInt(number[0])],
                            starCoordinates: { x, y },
                        });
                    }
                }
            }

            if (
                line[number.index + number[0].length] !== undefined &&
                line[number.index + number[0].length] !== ""
            ) {
                const x = number.index + number[0].length;
                const character = lines[y][x];
                if (character === "*") {
                    const existingEntryIndex =
                        allStartsAndNeighborNumbers.findIndex(
                            (starEntry) =>
                                starEntry.starCoordinates.x === x &&
                                starEntry.starCoordinates.y === y,
                        );
                    if (existingEntryIndex >= 0) {
                        allStartsAndNeighborNumbers[
                            existingEntryIndex
                        ].adjacentNumbers.push(parseInt(number[0]));
                    } else {
                        allStartsAndNeighborNumbers.push({
                            adjacentNumbers: [parseInt(number[0])],
                            starCoordinates: { x, y },
                        });
                    }
                }
            }

            if (lines[y + 1] !== undefined && lines[y + 1] !== "") {
                const start = Math.max(0, number.index - 1);
                const end = Math.min(
                    number.index + number[0].length + 1,
                    lines[y + 1].length,
                );

                for (let x = start; x < end; x++) {
                    const character = lines[y + 1][x];
                    if (character === "*") {
                        const existingEntryIndex =
                            allStartsAndNeighborNumbers.findIndex(
                                (starEntry) =>
                                    starEntry.starCoordinates.x === x &&
                                    starEntry.starCoordinates.y === y + 1,
                            );
                        if (existingEntryIndex >= 0) {
                            allStartsAndNeighborNumbers[
                                existingEntryIndex
                            ].adjacentNumbers.push(parseInt(number[0]));
                        } else {
                            allStartsAndNeighborNumbers.push({
                                adjacentNumbers: [parseInt(number[0])],
                                starCoordinates: { x, y: y + 1 },
                            });
                        }
                    }
                }
            }
        }
    });

    const gears = allStartsAndNeighborNumbers.filter(
        (star) => star.adjacentNumbers.length === 2,
    );

    gears.forEach((gear) => {
        totalSum += gear.adjacentNumbers[0] * gear.adjacentNumbers[1];
    });
    return totalSum;
}
