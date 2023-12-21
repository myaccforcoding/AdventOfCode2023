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

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day10.txt");
  let startCoordinates: Coordinate = { x: 0, y: 0 };

  lines.forEach((line, index) => {
    const startPositionX = line.indexOf("S");
    if (startPositionX !== -1) {
      startCoordinates = { x: startPositionX, y: index };
    }
  });

  let currentNodes: Node[] = [];

  if (startCoordinates.x > 0) {
    const leftSymbol = lines[startCoordinates.y][startCoordinates.x - 1];
    if (leftSymbol !== "." && connectionMap[leftSymbol].includes(right)) {
      currentNodes.push({
        nodeCoordinate: { x: startCoordinates.x - 1, y: startCoordinates.y },
        previous: right,
        symbol: leftSymbol,
      });
    }
  }

  if (startCoordinates.x < lines[0].length - 2) {
    const rightSymbol = lines[startCoordinates.y][startCoordinates.x + 1];
    if (rightSymbol !== "." && connectionMap[rightSymbol].includes(left)) {
      currentNodes.push({
        nodeCoordinate: { x: startCoordinates.x + 1, y: startCoordinates.y },
        previous: left,
        symbol: rightSymbol,
      });
    }
  }

  if (startCoordinates.y > 0) {
    const topSymbol = lines[startCoordinates.y - 1][startCoordinates.x];
    if (topSymbol !== "." && connectionMap[topSymbol].includes(bottom)) {
      currentNodes.push({
        nodeCoordinate: { x: startCoordinates.x, y: startCoordinates.y - 1 },
        previous: bottom,
        symbol: topSymbol,
      });
    }
  }

  if (startCoordinates.y < lines.length - 2) {
    const bottomSymbol = lines[startCoordinates.y + 1][startCoordinates.x];
    if (bottomSymbol !== "." && connectionMap[bottomSymbol].includes(top)) {
      currentNodes.push({
        nodeCoordinate: { x: startCoordinates.x, y: startCoordinates.y + 1 },
        previous: top,
        symbol: bottomSymbol,
      });
    }
  }
  let counter = 0;

  while (currentNodes.every((element) => element.symbol !== "S")) {
    const newCurrentNodes: Node[] = [];
    currentNodes.forEach((node) => {
      const connections = connectionMap[node.symbol];
      const nextNodeConnection = connections.filter(
        (connection) =>
          !connection.every((value, index) => value === node.previous[index]),
      )[0];
      const nextNodeCoordinates: Coordinate = {
        x: node.nodeCoordinate.x + nextNodeConnection[0],
        y: node.nodeCoordinate.y + nextNodeConnection[1],
      };
      const nextNodeSymbol =
        lines[nextNodeCoordinates.y][nextNodeCoordinates.x];
      const nextNodePrevious = [
        node.nodeCoordinate.x - nextNodeCoordinates.x,
        node.nodeCoordinate.y - nextNodeCoordinates.y,
      ];
      newCurrentNodes.push({
        symbol: nextNodeSymbol,
        nodeCoordinate: nextNodeCoordinates,
        previous: nextNodePrevious,
      });
    });
    counter++;
    currentNodes = newCurrentNodes;
  }

  console.log(Math.round(counter / 2));
}
