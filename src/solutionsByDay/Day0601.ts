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

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day06.txt");
    const raceDurations = lines[0].split(/\s+/);
    const raceDistanceRecord = lines[1].split(/\s+/);
    const times = raceDurations.slice(1).map(Number);
    const distances = raceDistanceRecord.slice(1).map(Number);
    const races = times.map((time, index) => ({
        time,
        recordDistance: distances[index],
    }));

    let solution = 1;

    races.forEach((race) => {
        const possibleNumberOfWaysToWin = findWaysToWin(race.time, race.recordDistance);
        solution *= possibleNumberOfWaysToWin;
    });

    return solution;
}
