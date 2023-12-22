import { readLocalFile } from "../helper/localFileReader";

type ColorAndCount = Record<string, number>;

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day02.txt");
    let totalSum = 0;
    lines.forEach((line) => {
        const gameAndRevealedCubes = line.split(": ");
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
                parseInt(count) > currentCubeCountPerColor[color]
                    ? parseInt(count)
                    : currentCubeCountPerColor[color];
        });
        totalSum +=
            currentCubeCountPerColor.red *
            currentCubeCountPerColor.green *
            currentCubeCountPerColor.blue;
    });

    return totalSum;
}
