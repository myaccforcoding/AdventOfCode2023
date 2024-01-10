import { readLocalFile } from "../helper/localFileReader";

interface Coordinate {
    x: number;
    y: number;
}

interface Ray {
    position: Coordinate;
    direction: Coordinate;
}

const specialCharacters = ["/", "\\", "-", "|"];

function transformDirection(direction: Coordinate, specialCharacters: string): Coordinate[] {
    switch (specialCharacters) {
        case "/":
            return [{ x: -direction.y, y: -direction.x }];
        case "\\":
            return [{ x: direction.y, y: direction.x }];
        case "-":
            if (direction.y === 0) {
                return [{ ...direction }];
            }
            return [
                { x: direction.y, y: direction.x },
                { x: -direction.y, y: direction.x },
            ];
        case "|":
            if (direction.x === 0) {
                return [{ ...direction }];
            }
            return [
                { x: direction.y, y: -direction.x },
                { x: direction.y, y: direction.x },
            ];
        default:
            throw new Error("Invalid transformation character");
    }
}

function generateAllPossibleStartingRaysRays(numberOfRows: number, numberOfColumns: number): Ray[] {
    const currentRays: Ray[] = [];

    currentRays.push(
        { position: { x: 0, y: 0 }, direction: { x: 1, y: 0 } },
        { position: { x: 0, y: 0 }, direction: { x: 0, y: 1 } },
        { position: { x: numberOfColumns - 1, y: 0 }, direction: { x: -1, y: 0 } },
        { position: { x: numberOfColumns - 1, y: 0 }, direction: { x: 0, y: 1 } },
        { position: { x: 0, y: numberOfRows - 1 }, direction: { x: 1, y: 0 } },
        { position: { x: 0, y: numberOfRows - 1 }, direction: { x: 0, y: -1 } },
        { position: { x: numberOfColumns - 1, y: numberOfRows - 1 }, direction: { x: -1, y: 0 } },
        { position: { x: numberOfColumns - 1, y: numberOfRows - 1 }, direction: { x: 0, y: -1 } },
    );

    for (let i = 0; i < numberOfColumns; i++) {
        currentRays.push({
            position: { x: i, y: 0 },
            direction: { x: 0, y: 1 },
        });
    }

    for (let i = 0; i < numberOfColumns; i++) {
        currentRays.push({
            position: { x: i, y: numberOfRows - 1 },
            direction: { x: 0, y: -1 },
        });
    }

    for (let i = 1; i < numberOfRows - 1; i++) {
        currentRays.push({
            position: { x: 0, y: i },
            direction: { x: 1, y: 0 },
        });
    }

    for (let i = 1; i < numberOfRows - 1; i++) {
        currentRays.push({
            position: { x: numberOfColumns - 1, y: i },
            direction: { x: -1, y: 0 },
        });
    }

    return currentRays;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day16.txt");
    const charMatrix: string[][] = lines.map((line) => line.split(""));
    let result: number = 0;

    const startingRays = generateAllPossibleStartingRaysRays(charMatrix.length, charMatrix[0].length);

    for (let s = 0; s < startingRays.length; s++) {
        const currentRays = [startingRays[s]];
        const energizedNodes = new Set<string>();

        for (let i = 0; i < currentRays.length; i++) {
            const currentRay = currentRays[i];
            let currentPosition = currentRay.position;
            while (
                currentPosition.x >= 0 &&
                currentPosition.x < charMatrix[0].length &&
                currentPosition.y >= 0 &&
                currentPosition.y < charMatrix.length
            ) {
                energizedNodes.add(JSON.stringify(currentPosition));

                if (!specialCharacters.includes(charMatrix[currentPosition.y][currentPosition.x])) {
                    currentPosition = {
                        x: currentPosition.x + currentRay.direction.x,
                        y: currentPosition.y + currentRay.direction.y,
                    };
                } else {
                    const newRays = transformDirection(
                        currentRay.direction,
                        charMatrix[currentPosition.y][currentPosition.x],
                    );

                    newRays.forEach((direction) => {
                        const newPosition = {
                            x: currentPosition.x + direction.x,
                            y: currentPosition.y + direction.y,
                        };

                        const newRay = {
                            position: newPosition,
                            direction,
                        };
                        if (
                            !currentRays.some(
                                (ray) =>
                                    JSON.stringify(ray.position) === JSON.stringify(newRay.position) &&
                                    JSON.stringify(ray.direction) === JSON.stringify(newRay.direction),
                            )
                        ) {
                            currentRays.push(newRay);
                        }
                    });
                    break;
                }
            }
        }
        result = energizedNodes.size > result ? energizedNodes.size : result;
    }

    return result;
}
