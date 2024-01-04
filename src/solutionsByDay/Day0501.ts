import { readLocalFile } from "../helper/localFileReader";

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

function getMappingValue(maps: SourceToDestinationMap[], sourceValue: number): number {
    let result: number = sourceValue;
    for (let mapIndex = 0; mapIndex < maps.length; mapIndex++) {
        if (
            maps[mapIndex].sourceStart <= sourceValue &&
            maps[mapIndex].sourceStart + maps[mapIndex].range >= sourceValue
        ) {
            const offset = sourceValue - maps[mapIndex].sourceStart;
            result = maps[mapIndex].destinationStart + offset;
            break;
        }
    }
    return result;
}

export async function runSolution(): Promise<number> {
    const lines = await readLocalFile("src\\inputFiles\\Day05.txt");

    const locations: number[] = [];

    // seed
    const seedNumberStartingIndex = lines[0].indexOf(":");
    const seedNumericValues = lines[0]
        .substring(seedNumberStartingIndex + 2)
        .split(" ")
        .map((stringNumericValue) => Number(stringNumericValue));

    seedNumericValues.forEach((seed) => {
        const seedToSoilMap = parseMapping("seed-to-soil map:", lines);
        const soil = getMappingValue(seedToSoilMap, seed);

        const soilToFertilizerMap = parseMapping("soil-to-fertilizer map:", lines);
        const fertilizer = getMappingValue(soilToFertilizerMap, soil);

        const fertilizerToWaterMap = parseMapping("fertilizer-to-water map:", lines);
        const water = getMappingValue(fertilizerToWaterMap, fertilizer);

        const waterToLightMap = parseMapping("water-to-light map:", lines);
        const light = getMappingValue(waterToLightMap, water);

        const lightToTemperatureMap = parseMapping("light-to-temperature map:", lines);
        const temperature = getMappingValue(lightToTemperatureMap, light);

        const temperatureToHumidityMap = parseMapping("temperature-to-humidity map:", lines);
        const humidity = getMappingValue(temperatureToHumidityMap, temperature);

        const humidityToLocationMap = parseMapping("humidity-to-location map:", lines);
        const location = getMappingValue(humidityToLocationMap, humidity);

        locations.push(location);
    });

    return Math.min(...locations);
}
