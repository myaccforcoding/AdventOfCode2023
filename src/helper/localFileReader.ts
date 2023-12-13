import * as fs from "fs";
import * as readline from "readline";

export async function readLocalFile(filePath: string): Promise<string[]> {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines: string[] = [];

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
}
