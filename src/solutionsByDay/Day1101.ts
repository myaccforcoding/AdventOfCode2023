import { readLocalFile } from "../helper/localFileReader";
import { transposeArray } from "../helper/transposeArray";

interface Coordinate {
    x: number;
    y: number;
}

function expand(curentInput: string[]): string[] {
    const expanded: string[] = [];

    curentInput.forEach((line) => {
        if (!line.includes("#")) {
            expanded.push(line);
        }
        expanded.push(line);
    });

    return expanded;
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
    // first expands the rows
    lines = expand(lines);

    // rotates the array to expand the columns
    lines = transposeArray(lines);
    lines = expand(lines);

    const coordinates = getGalaxyCoordinates(lines);

    let totalDistance: number = 0;

    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            totalDistance +=
                Math.abs(coordinates[i].x - coordinates[j].x) +
                Math.abs(coordinates[i].y - coordinates[j].y);
        }
    }

    return totalDistance;
}
