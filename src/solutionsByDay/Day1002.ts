import { readLocalFile } from "../helper/localFileReader";

const left = [-1, 0];
const right = [1, 0];
const top = [0, -1];
const bottom = [0, 1];

interface Node {
    previous: number[];
    nodeCoordinate: Coordinate;
    symbol: string;
}

interface Coordinate {
    x: number;
    y: number;
}

type ConnectionMap = Record<string, number[][]>;

const connectionMap: ConnectionMap = {
    "|": [top, bottom],
    "-": [left, right],
    L: [top, right],
    J: [top, left],
    "7": [bottom, left],
    F: [bottom, right],
};

function countInside(lines: string[], loopEdges: Coordinate[], startNodeSymbol: string): number {
    let countOfInsideTiles = 0;
    lines.forEach((row, rowIndex) => {
        let edgeCrossingsInRow = 0;
        row.split("").forEach((cell, colIndex) => {
            cell = cell === "S" ? startNodeSymbol : cell;
            const isEdge = loopEdges.some((edge) => edge.y === rowIndex && edge.x === colIndex);
            if (isEdge) {
                if (["|", "L", "J"].includes(cell)) {
                    edgeCrossingsInRow += 1;
                }
            } else {
                if (edgeCrossingsInRow % 2 === 1) {
                    countOfInsideTiles += 1;
                }
            }
        });
    });
    return countOfInsideTiles;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day10.txt");
    let startCoordinates: Coordinate = { x: 0, y: 0 };

    lines.forEach((line, index) => {
        const startPositionX = line.indexOf("S");
        if (startPositionX !== -1) {
            startCoordinates = { x: startPositionX, y: index };
        }
    });

    let currentNodes: Node[] = [];

    const startNodeConnections: number[][] = [];

    if (startCoordinates.x > 0) {
        const leftSymbol = lines[startCoordinates.y][startCoordinates.x - 1];
        if (leftSymbol !== "." && connectionMap[leftSymbol].includes(right)) {
            currentNodes.push({
                nodeCoordinate: {
                    x: startCoordinates.x - 1,
                    y: startCoordinates.y,
                },
                previous: right,
                symbol: leftSymbol,
            });
            startNodeConnections.push(left);
        }
    }

    if (startCoordinates.x < lines[0].length - 2) {
        const rightSymbol = lines[startCoordinates.y][startCoordinates.x + 1];
        if (rightSymbol !== "." && connectionMap[rightSymbol].includes(left)) {
            currentNodes.push({
                nodeCoordinate: {
                    x: startCoordinates.x + 1,
                    y: startCoordinates.y,
                },
                previous: left,
                symbol: rightSymbol,
            });
            startNodeConnections.push(right);
        }
    }

    if (startCoordinates.y > 0) {
        const topSymbol = lines[startCoordinates.y - 1][startCoordinates.x];
        if (topSymbol !== "." && connectionMap[topSymbol].includes(bottom)) {
            currentNodes.push({
                nodeCoordinate: {
                    x: startCoordinates.x,
                    y: startCoordinates.y - 1,
                },
                previous: bottom,
                symbol: topSymbol,
            });
            startNodeConnections.push(top);
        }
    }

    if (startCoordinates.y < lines.length - 2) {
        const bottomSymbol = lines[startCoordinates.y + 1][startCoordinates.x];
        if (bottomSymbol !== "." && connectionMap[bottomSymbol].includes(top)) {
            currentNodes.push({
                nodeCoordinate: {
                    x: startCoordinates.x,
                    y: startCoordinates.y + 1,
                },
                previous: top,
                symbol: bottomSymbol,
            });
            startNodeConnections.push(bottom);
        }
    }

    let startNodeSymbol: string = "";

    for (const key in connectionMap) {
        // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
        const sortedConnections = connectionMap[key].sort();
        // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
        const sortedStartNodeConnections = startNodeConnections.sort();
        if (
            sortedConnections.every(
                (connection, index) =>
                    connection[0] === sortedStartNodeConnections[index][0] &&
                    connection[1] === sortedStartNodeConnections[index][1],
            )
        ) {
            startNodeSymbol = key;
            break;
        }
    }

    const loopCoordinates = new Set<Coordinate>(currentNodes.map((node) => node.nodeCoordinate));
    loopCoordinates.add(startCoordinates);

    while (currentNodes.every((element) => element.symbol !== "S")) {
        const newCurrentNodes: Node[] = [];
        const connections = connectionMap[currentNodes[0].symbol];
        const nextNodeConnection = connections.filter(
            (connection) => !connection.every((value, index) => value === currentNodes[0].previous[index]),
        )[0];
        const nextNodeCoordinates: Coordinate = {
            x: currentNodes[0].nodeCoordinate.x + nextNodeConnection[0],
            y: currentNodes[0].nodeCoordinate.y + nextNodeConnection[1],
        };
        const nextNodeSymbol = lines[nextNodeCoordinates.y][nextNodeCoordinates.x];
        const nextNodePrevious = [
            currentNodes[0].nodeCoordinate.x - nextNodeCoordinates.x,
            currentNodes[0].nodeCoordinate.y - nextNodeCoordinates.y,
        ];
        newCurrentNodes.push({
            symbol: nextNodeSymbol,
            nodeCoordinate: nextNodeCoordinates,
            previous: nextNodePrevious,
        });
        loopCoordinates.add(nextNodeCoordinates);
        currentNodes = newCurrentNodes;
    }

    return countInside(lines, [...loopCoordinates], startNodeSymbol);
}
