export function generateRandomNumber(min: number, max: number, fractionDigits = 0) {
  return +((Math.random()) * (max - min) + min).toFixed(fractionDigits);
}

export function getRandomItemFromArray<T>(items: T[]): T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function getRandomSliceFromArray<T>(items: T[]): T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItemsFromArray<T>(items: T[], targetArrayLength: number): T[] {
  const targetArray: T[] = [];
  for (let i = 0; i < targetArrayLength; i++) {
    targetArray.push(items[generateRandomNumber(0, items.length - 1)]);
  }
  return targetArray;
}

export function getRandomBoolean(): boolean {
  return Math.round(Math.random() * 10) > 5;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
