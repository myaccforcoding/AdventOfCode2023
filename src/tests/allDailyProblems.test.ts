import * as Day0101 from "../solutionsByDay/Day0101";
import * as Day0102 from "../solutionsByDay/Day0102";
import * as Day0201 from "../solutionsByDay/Day0201";
import * as Day0202 from "../solutionsByDay/Day0202";
import * as Day0301 from "../solutionsByDay/Day0301";
import * as Day0302 from "../solutionsByDay/Day0302";
import * as Day0401 from "../solutionsByDay/Day0401";
import * as Day0402 from "../solutionsByDay/Day0402";
import * as Day0501 from "../solutionsByDay/Day0501";
import * as Day0502 from "../solutionsByDay/Day0502";
import * as Day0601 from "../solutionsByDay/Day0601";
import * as Day0602 from "../solutionsByDay/Day0602";
import * as Day0701 from "../solutionsByDay/Day0701";
import * as Day0702 from "../solutionsByDay/Day0702";
import * as Day0801 from "../solutionsByDay/Day0801";
import * as Day0802 from "../solutionsByDay/Day0802";
import * as Day0901 from "../solutionsByDay/Day0901";
import * as Day0902 from "../solutionsByDay/Day0902";
import * as Day1001 from "../solutionsByDay/Day1001";
import * as Day1002 from "../solutionsByDay/Day1002";
import * as Day1101 from "../solutionsByDay/Day1101";
import * as Day1102 from "../solutionsByDay/Day1102";
import * as Day1201 from "../solutionsByDay/Day1201";
import * as Day1202 from "../solutionsByDay/Day1202";
import * as Day1301 from "../solutionsByDay/Day1301";
import * as Day1302 from "../solutionsByDay/Day1302";
import * as Day1401 from "../solutionsByDay/Day1401";
import * as Day1402 from "../solutionsByDay/Day1402";
import * as Day1501 from "../solutionsByDay/Day1501";
import * as Day1502 from "../solutionsByDay/Day1502";

describe("Day 01", () => {
    test("Part 01", async () => {
        const actual = await Day0101.runSolution();
        const expected = 55090;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0102.runSolution();
        const expected = 54845;
        expect(actual).toBe(expected);
    });
});

describe("Day 02", () => {
    test("Part 01", async () => {
        const actual = await Day0201.runSolution();
        const expected = 2237;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0202.runSolution();
        const expected = 66681;
        expect(actual).toBe(expected);
    });
});

describe("Day 03", () => {
    test("Part 01", async () => {
        const actual = await Day0301.runSolution();
        const expected = 532445;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0302.runSolution();
        const expected = 79842967;
        expect(actual).toBe(expected);
    });
});

describe("Day 04", () => {
    test("Part 01", async () => {
        const actual = await Day0401.runSolution();
        const expected = 17803;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0402.runSolution();
        const expected = 5554894;
        expect(actual).toBe(expected);
    });
});

describe("Day 05", () => {
    test("Part 01", async () => {
        const actual = await Day0501.runSolution();
        const expected = 389056265;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0502.runSolution();
        const expected = 137516820;
        expect(actual).toBe(expected);
    });
});

describe("Day 06", () => {
    test("Part 01", async () => {
        const actual = await Day0601.runSolution();
        const expected = 608902;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0602.runSolution();
        const expected = 46173809;
        expect(actual).toBe(expected);
    });
});

describe("Day 07", () => {
    test("Part 01", async () => {
        const actual = await Day0701.runSolution();
        const expected = 249390788;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0702.runSolution();
        const expected = 248750248;
        expect(actual).toBe(expected);
    });
});

describe("Day 08", () => {
    test("Part 01", async () => {
        const actual = await Day0801.runSolution();
        const expected = 19099;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0802.runSolution();
        const expected = 17099847107071;
        expect(actual).toBe(expected);
    });
});

describe("Day 09", () => {
    test("Part 01", async () => {
        const actual = await Day0901.runSolution();
        const expected = 1972648895;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day0902.runSolution();
        const expected = 919;
        expect(actual).toBe(expected);
    });
});

describe("Day 10", () => {
    test("Part 01", async () => {
        const actual = await Day1001.runSolution();
        const expected = 6800;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1002.runSolution();
        const expected = 483;
        expect(actual).toBe(expected);
    });
});

describe("Day 11", () => {
    test("Part 01", async () => {
        const actual = await Day1101.runSolution();
        const expected = 9536038;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1102.runSolution();
        const expected = 447744640566;
        expect(actual).toBe(expected);
    });
});

describe("Day 12", () => {
    test("Part 01", async () => {
        const actual = await Day1201.runSolution();
        const expected = 7506;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1202.runSolution();
        const expected = 548241300348335;
        expect(actual).toBe(expected);
    });
});

describe("Day 13", () => {
    test("Part 01", async () => {
        const actual = await Day1301.runSolution();
        const expected = 40006;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1302.runSolution();
        const expected = 28627;
        expect(actual).toBe(expected);
    });
});

describe("Day 14", () => {
    test("Part 01", async () => {
        const actual = await Day1401.runSolution();
        const expected = 109654;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1402.runSolution();
        const expected = 94876;
        expect(actual).toBe(expected);
    });
});

describe("Day 15", () => {
    test("Part 01", async () => {
        const actual = await Day1501.runSolution();
        const expected = 513172;
        expect(actual).toBe(expected);
    });

    test("Part 02", async () => {
        const actual = await Day1502.runSolution();
        const expected = 237806;
        expect(actual).toBe(expected);
    });
});
