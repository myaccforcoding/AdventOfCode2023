/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Day0101 from "./solutionsByDay/Day0101";
import * as Day0102 from "./solutionsByDay/Day0102";
import * as Day0201 from "./solutionsByDay/Day0201";
import * as Day0202 from "./solutionsByDay/Day0202";
import * as Day0301 from "./solutionsByDay/Day0301";
import * as Day0302 from "./solutionsByDay/Day0302";
import * as Day0401 from "./solutionsByDay/Day0401";
import * as Day0402 from "./solutionsByDay/Day0402";
import * as Day0501 from "./solutionsByDay/Day0501";
import * as Day0502 from "./solutionsByDay/Day0502";
import * as Day0601 from "./solutionsByDay/Day0601";
import * as Day0602 from "./solutionsByDay/Day0602";
import * as Day0701 from "./solutionsByDay/Day0701";
import * as Day0702 from "./solutionsByDay/Day0702";
import * as Day0801 from "./solutionsByDay/Day0801";
import * as Day0802 from "./solutionsByDay/Day0802";
import * as Day0901 from "./solutionsByDay/Day0901";
import * as Day0902 from "./solutionsByDay/Day0902";
import * as Day1001 from "./solutionsByDay/Day1001";
import * as Day1002 from "./solutionsByDay/Day1002";
import * as Day1101 from "./solutionsByDay/Day1101";
import * as Day1102 from "./solutionsByDay/Day1102";
import * as Day1201 from "./solutionsByDay/Day1201";
import * as Day1202 from "./solutionsByDay/Day1202";
import * as Day1301 from "./solutionsByDay/Day1301";
import * as Day1302 from "./solutionsByDay/Day1302";
import * as Day1401 from "./solutionsByDay/Day1401";
import * as Day1402 from "./solutionsByDay/Day1402";

async function logSolution(): Promise<void> {
    console.log(await Day0102.runSolution());
}

logSolution().catch((err) => {
    console.error("An error occurred:", err);
});
