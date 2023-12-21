import { readLocalFile } from "../helper/localFileReader";

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Test.txt");

  lines.forEach((line, index) => {});
}
