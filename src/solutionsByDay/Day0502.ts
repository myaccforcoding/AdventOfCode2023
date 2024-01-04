import { readLocalFile } from "../helper/localFileReader";

interface SeedMap {
    startIndex: number;
    range: number;
}

interface SourceToDestinationMap {
    sourceStart: number;
    destinationStart: number;
    range: number;
}

function parseMapping(mapIdentifier: string, lines: string[]): SourceToDestinationMap[] {
    const startMapIndex = lines.findIndex((line) => line.startsWith(mapIdentifier));
    const endMapIndex = lines.findIndex((line, index) => index > startMapIndex && line.trim() === "");
    const effectiveEndMapIndex = endMapIndex !== -1 ? endMapIndex : lines.length;

    const mapLines = lines.slice(startMapIndex + 1, effectiveEndMapIndex);

    const sourceToDestinationMap: SourceToDestinationMap[] = [];
    mapLines.forEach((map) => {
        const values = map.split(" ").map((value) => parseInt(value));
        const destinationStart = values[0];
        const sourceStart = values[1];
        const range = values[2];

        sourceToDestinationMap.push({ destinationStart, sourceStart, range });
    });

    return sourceToDestinationMap;
}

function getMappingValue(maps: SourceToDestinationMap[], destinationValue: number): number {
    let result: number = destinationValue;
    for (let mapIndex = 0; mapIndex < maps.length; mapIndex++) {
        if (
            maps[mapIndex].destinationStart <= destinationValue &&
            maps[mapIndex].destinationStart + maps[mapIndex].range >= destinationValue
        ) {
            const offset = destinationValue - maps[mapIndex].destinationStart;
            result = maps[mapIndex].sourceStart + offset;
            break;
        }
    }
    return result;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day05.txt");

    // seed
    const seedNumberStartingIndex = lines[0].indexOf(":");
    const seedNumericValues = lines[0]
        .substring(seedNumberStartingIndex + 2)
        .split(" ")
        .map((stringNumericValue) => Number(stringNumericValue));

    const seedMap: SeedMap[] = [];
    for (let i = 0; i < seedNumericValues.length; i += 2) {
        seedMap.push({
            startIndex: seedNumericValues[i],
            range: seedNumericValues[i + 1],
        });
    }

    const humidityToLocationMap = parseMapping("humidity-to-location map:", lines);
    const temperatureToHumidityMap = parseMapping("temperature-to-humidity map:", lines);
    const lightToTemperatureMap = parseMapping("light-to-temperature map:", lines);
    const waterToLightMap = parseMapping("water-to-light map:", lines);
    const fertilizerToWaterMap = parseMapping("fertilizer-to-water map:", lines);
    const soilToFertilizerMap = parseMapping("soil-to-fertilizer map:", lines);
    const seedToSoilMap = parseMapping("seed-to-soil map:", lines);

    let isValidSeedFound: boolean = false;

    for (let location = 0; ; location++) {
        const humidity = getMappingValue(humidityToLocationMap, location);
        const temperature = getMappingValue(temperatureToHumidityMap, humidity);
        const light = getMappingValue(lightToTemperatureMap, temperature);
        const water = getMappingValue(waterToLightMap, light);
        const fertilizer = getMappingValue(fertilizerToWaterMap, water);
        const soil = getMappingValue(soilToFertilizerMap, fertilizer);
        const seed = getMappingValue(seedToSoilMap, soil);

        seedMap.forEach((map) => {
            if (seed >= map.startIndex && seed <= map.startIndex + map.range) {
                isValidSeedFound = true;
            }
        });

        if (isValidSeedFound) {
            return location;
        }
    }
}
