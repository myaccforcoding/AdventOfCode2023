import { readLocalFile } from "../helper/localFileReader";

type ColorAndCount = Record<string, number>;

const maxCountPerColor: ColorAndCount = { red: 12, green: 13, blue: 14 };

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day02.txt");
    let totalSum = 0;
    lines.forEach((line) => {
        const gameAndRevealedCubes = line.split(": ");
        const gameId = gameAndRevealedCubes[0].split(" ")[1];

        const cubesCountAndColor = gameAndRevealedCubes[1]
            .split(/[,;]\s*/)
            .filter((item) => !item.includes(",") && !item.includes(";"));

        const currentCubeCountPerColor: ColorAndCount = {
            red: 0,
            green: 0,
            blue: 0,
        };

        cubesCountAndColor.forEach((cube) => {
            const [count, color] = cube.split(" ");
            currentCubeCountPerColor[color] =
                parseInt(count) > currentCubeCountPerColor[color] ? parseInt(count) : currentCubeCountPerColor[color];
        });

        if (
            currentCubeCountPerColor.red <= maxCountPerColor.red &&
            currentCubeCountPerColor.green <= maxCountPerColor.green &&
            currentCubeCountPerColor.blue <= maxCountPerColor.blue
        ) {
            totalSum += parseInt(gameId);
        }
    });

    return totalSum;
}
