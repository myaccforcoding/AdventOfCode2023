import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day04.txt");
  let totalSum = 0;
  lines.forEach((line) => {
    const cardIdIndex = line.indexOf(":");
    const scratchcardContent = line.substring(cardIdIndex + 1).split("|");
    const myNumbers = scratchcardContent[0]
      .split(" ")
      .filter((element) => element !== "");
    const winningNumbers = scratchcardContent[1]
      .split(" ")
      .filter((element) => element !== "");
    const matchingNumbers = winningNumbers.filter((value) =>
      myNumbers.includes(value),
    );
    if (matchingNumbers.length > 0) {
      totalSum += Math.pow(2, matchingNumbers.length - 1);
    }
  });
  console.log(totalSum);
}
