import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Test.txt");

    lines.forEach((line, index) => {});
    return 0;
}
