import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day08.txt");
    const threeLetterRegex = /[A-Z,1-9]{3}/g;

    const instructon = lines[0].split("").map((char) => (char === "L" ? 0 : 1));
    const graph: Record<string, string[]> = {};

    lines.splice(2).forEach((line) => {
        const graphNodeData = [...line.matchAll(threeLetterRegex)].map(
            (m) => m[0],
        );
        graph[graphNodeData[0]] = [graphNodeData[1], graphNodeData[2]];
    });

    let currentKey = "AAA";
    let counter = 0;

    while (currentKey !== "ZZZ") {
        currentKey = graph[currentKey][instructon[counter % instructon.length]];
        counter++;
    }

    return counter;
}
