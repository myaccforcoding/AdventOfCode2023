import { readLocalFile } from "../helper/localFileReader";
import { transposeArray } from "../helper/transposeArray";

interface Coordinate {
    x: number;
    y: number;
}

function getIndciesWithoutGalaxies(curentInput: string[]): number[] {
    const indicesWithoutGalaxies: number[] = [];

    curentInput.forEach((line, index) => {
        if (!line.includes("#")) {
            indicesWithoutGalaxies.push(index);
        }
    });

    return indicesWithoutGalaxies;
}

function getGalaxyCoordinates(lines: string[]): Coordinate[] {
    const allGalaxiesCoordinates: Coordinate[] = [];

    lines.forEach((line, index) => {
        const galaxiesXCoordinate = line
            .split("")
            .reduce((coordinates: number[], char, index) => {
                if (char === "#") {
                    coordinates.push(index);
                }
                return coordinates;
            }, []);
        galaxiesXCoordinate.forEach((x) => {
            allGalaxiesCoordinates.push({ x, y: index });
        });
    });

    return allGalaxiesCoordinates;
}

export async function runSolution(): Promise<number> {
    let lines = await readLocalFile("src\\inputFiles\\Day11.txt");

    const rowIndicesWithoutGalaxies = getIndciesWithoutGalaxies(lines);

    lines = transposeArray(lines);

    const columnIndicesWithoutGalaxies = getIndciesWithoutGalaxies(lines);

    // reverses the transponse so rowIndicesWithoutGalaxies and columnIndicesWithoutGalaxies are actually correct
    lines = transposeArray(lines);

    const coordinates = getGalaxyCoordinates(lines);

    let totalDistance: number = 0;

    const emptyMultiplyer = 1000000;
    let numberOfEmptyRowsAndColumnsCrossed = 0;

    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            rowIndicesWithoutGalaxies.forEach((row) => {
                if (
                    row > Math.min(coordinates[i].y, coordinates[j].y) &&
                    row < Math.max(coordinates[i].y, coordinates[j].y)
                ) {
                    numberOfEmptyRowsAndColumnsCrossed++;
                }
            });

            columnIndicesWithoutGalaxies.forEach((column) => {
                if (
                    column > Math.min(coordinates[i].x, coordinates[j].x) &&
                    column < Math.max(coordinates[i].x, coordinates[j].x)
                ) {
                    numberOfEmptyRowsAndColumnsCrossed++;
                }
            });
            totalDistance +=
                Math.abs(coordinates[i].x - coordinates[j].x) +
                Math.abs(coordinates[i].y - coordinates[j].y);
        }
    }
    totalDistance += emptyMultiplyer * numberOfEmptyRowsAndColumnsCrossed;
    totalDistance -= numberOfEmptyRowsAndColumnsCrossed; // since empty rows and columns are not expanded but replaced we need to substract 1 step for each since we still calculated the distance with 1 step each
    return totalDistance;
}
