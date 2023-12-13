import { readLocalFile } from "../helper/localFileReader";

type ColorAndCount = Record<string, number>;

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day02.txt");
  let totalSum = 0;
  lines.forEach((line) => {
    const splitGameAndCumbesCount = line.split(": ");
    const countAndColor = splitGameAndCumbesCount[1]
      .split(/[,;]\s*/)
      .filter((item) => !item.includes(",") && !item.includes(";"));
    const counts: ColorAndCount = { red: 0, green: 0, blue: 0 };

    countAndColor.forEach((cube) => {
      const [count, color] = cube.split(" ");
      counts[color] =
        parseInt(count) > counts[color] ? parseInt(count) : counts[color];
    });
    totalSum += counts.red * counts.green * counts.blue;
  });

  console.log(totalSum);
}
