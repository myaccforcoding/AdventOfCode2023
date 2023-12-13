import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day03.txt");
  const regex = /\d+/g;
  let totalSum = 0;

  lines.forEach((line, index) => {
    let number;
    const y = index;

    while ((number = regex.exec(line)) !== null) {
      const neighbourCharacters = [];

      if (lines[y - 1] !== undefined && lines[y - 1] !== "") {
        const start = Math.max(0, number.index - 1);
        const end = Math.min(
          number.index + number[0].length + 1,
          lines[y - 1].length,
        );

        for (let x = start; x < end; x++) {
          neighbourCharacters.push(lines[y - 1][x]);
        }
      }

      if (
        line[number.index - 1] !== undefined &&
        line[number.index - 1] !== ""
      ) {
        neighbourCharacters.push(line[number.index - 1]);
      }

      if (
        line[number.index + number[0].length] !== undefined &&
        line[number.index + number[0].length] !== ""
      ) {
        neighbourCharacters.push(line[number.index + number[0].length]);
      }

      if (lines[y + 1] !== undefined && lines[y + 1] !== "") {
        const start = Math.max(0, number.index - 1);
        const end = Math.min(
          number.index + number[0].length + 1,
          lines[y + 1].length,
        );

        for (let x = start; x < end; x++) {
          neighbourCharacters.push(lines[y + 1][x]);
        }
      }
      const hasSpecialChar = neighbourCharacters.some(
        (char) => char !== "." && char !== undefined,
      );
      if (hasSpecialChar) {
        totalSum += parseInt(number[0]);
      }
    }
  });
  console.log(totalSum);
}
