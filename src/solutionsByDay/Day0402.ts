import { readLocalFile } from "../helper/localFileReader";

type CardIdAndMultiplier = Record<number, number>;

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day04.txt");
    let totalSum = 0;
    const cardIdAndMultiplier: CardIdAndMultiplier = {};
    lines.forEach((line, index) => {
        let numberOfThisCard = 0;
        if (
            cardIdAndMultiplier[index] !== undefined &&
            cardIdAndMultiplier[index] !== 0 &&
            !isNaN(cardIdAndMultiplier[index])
        ) {
            numberOfThisCard += cardIdAndMultiplier[index] + 1;
        } else {
            numberOfThisCard += 1;
        }

        totalSum += numberOfThisCard;

        const cardIdIndex = line.indexOf(":");
        const scratchcardContent = line.substring(cardIdIndex + 1).split("|");
        const myNumbers = scratchcardContent[0].split(" ").filter((element) => element !== "");
        const winningNumbers = scratchcardContent[1].split(" ").filter((element) => element !== "");
        const matchingNumbers = winningNumbers.filter((value) => myNumbers.includes(value));

        for (let i = 1; i <= matchingNumbers.length; i++) {
            if (
                cardIdAndMultiplier[index + i] !== undefined &&
                cardIdAndMultiplier[index + i] !== 0 &&
                !isNaN(cardIdAndMultiplier[index + i])
            ) {
                cardIdAndMultiplier[index + i] += numberOfThisCard;
            } else {
                cardIdAndMultiplier[index + i] = numberOfThisCard;
            }
        }
    });
    return totalSum;
}
