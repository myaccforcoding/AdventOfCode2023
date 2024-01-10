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

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day16.txt");
    const charMatrix: string[][] = lines.map((line) => line.split(""));
    const energizedNodes = new Set<string>();

    const currentRays: Ray[] = [
        {
            position: { x: 0, y: 0 },
            direction: { x: 1, y: 0 },
        },
    ];

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

    return energizedNodes.size;
}
