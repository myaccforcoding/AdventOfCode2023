import { readLocalFile } from "../helper/localFileReader";

interface HandAndBid {
  handCards: string;
  bid: number;
}

const fiveOfAKindCategory: HandAndBid[] = [];
const fourOfAKindCategory: HandAndBid[] = [];
const fullHouseCategory: HandAndBid[] = [];
const threeOfAKindCategory: HandAndBid[] = [];
const twoPairsCategory: HandAndBid[] = [];
const onePairCategory: HandAndBid[] = [];
const highCardCategory: HandAndBid[] = [];

function determineHandCategory(handAndBid: HandAndBid): void {
  const countByChar: Record<string, number> = {};
  for (const char of handAndBid.handCards) {
    countByChar[char] = (countByChar[char] ?? 0) + 1;
  }

  if (Object.values(countByChar).some((count) => count === 5)) {
    fiveOfAKindCategory.push(handAndBid);
  } else if (Object.values(countByChar).some((count) => count === 4)) {
    fourOfAKindCategory.push(handAndBid);
  } else if (
    Object.values(countByChar).some((count) => count === 3) &&
    Object.values(countByChar).some((count) => count === 2)
  ) {
    fullHouseCategory.push(handAndBid);
  } else if (Object.values(countByChar).some((count) => count === 3)) {
    threeOfAKindCategory.push(handAndBid);
  } else if (
    Object.values(countByChar).filter((count) => count === 2).length === 2
  ) {
    twoPairsCategory.push(handAndBid);
  } else if (Object.values(countByChar).some((count) => count === 2)) {
    onePairCategory.push(handAndBid);
  } else {
    highCardCategory.push(handAndBid);
  }
}

// returns
// -1 if cardHandA > cardHandB
//  1 if cardHandA < cardHandB
//  0 if cardHandA = cardHandB
function cardHandComparer(cardHandA: string, cardHandB: string): number {
  const cardOrderFromHighestToLowest = "AKQJT98765432";

  for (let i = 0; i < cardHandA.length; i++) {
    const charA = cardHandA[i];
    const charB = cardHandB[i];

    const orderOfCardFromHandA = cardOrderFromHighestToLowest.indexOf(charA);
    const orderOfCardFromHandB = cardOrderFromHighestToLowest.indexOf(charB);

    if (orderOfCardFromHandA !== orderOfCardFromHandB) {
      return Math.sign(orderOfCardFromHandA - orderOfCardFromHandB);
    }
  }
  return 0;
}

export async function runSolution(): Promise<void> {
  const lines = await readLocalFile("src\\inputFiles\\Day07.txt");

  lines.forEach((line) => {
    const splitLine = line.split(" ");
    const handAndBid: HandAndBid = {
      handCards: splitLine[0],
      bid: parseInt(splitLine[1]),
    };
    determineHandCategory(handAndBid);
  });

  fiveOfAKindCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  fourOfAKindCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  fullHouseCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  threeOfAKindCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  twoPairsCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  onePairCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );
  highCardCategory.sort((handAndBidA, handAndBidB) =>
    cardHandComparer(handAndBidA.handCards, handAndBidB.handCards),
  );

  const allHandsAndBidsSorted = [
    ...fiveOfAKindCategory,
    ...fourOfAKindCategory,
    ...fullHouseCategory,
    ...threeOfAKindCategory,
    ...twoPairsCategory,
    ...onePairCategory,
    ...highCardCategory,
  ].reverse();

  let result = 0;
  allHandsAndBidsSorted.forEach((handAndBid, index) => {
    result += handAndBid.bid * (index + 1);
  });

  console.log(result);
}
