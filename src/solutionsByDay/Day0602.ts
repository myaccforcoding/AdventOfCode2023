import { readLocalFile } from "../helper/localFileReader";

function findWaysToWin(raceTime: number, raceRecordDistance: number): number {
  let bestHoldTime = Math.floor(raceTime / 2);
  const maxDistance = bestHoldTime * (raceTime - bestHoldTime);

  if (maxDistance > raceRecordDistance) {
    let count = 0;

    while (bestHoldTime > 0) {
      bestHoldTime--;

      const newDistance = bestHoldTime * (raceTime - bestHoldTime);

      if (newDistance > raceRecordDistance) {
        count++;
      } else {
        break;
      }
    }

    return count * 2 + (raceTime % 2 === 1 ? 2 : 1);
  }

  return 0;
}

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day06.txt");
  const raceTime = parseInt(lines[0].replace(/\D/g, ""));
  const raceRecordDistance = parseInt(lines[1].replace(/\D/g, ""));
  let solution = 1;
  const possibleNumberOfWaysToWin = findWaysToWin(raceTime, raceRecordDistance);
  solution *= possibleNumberOfWaysToWin;
  console.log(solution);
}
