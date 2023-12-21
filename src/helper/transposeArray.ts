// transposes an array so columns become rows with the same index. Example:
//          123                     147
// input:    456         output:     258
//          789                     369
export function transposeArray(array: string[]): string[] {
  const numRows = array[0].length;
  const transposedArray: string[] = [];

  for (let i = 0; i < numRows; i++) {
    let newRow = "";
    for (const row of array) {
      newRow += row[i];
    }
    transposedArray.push(newRow);
  }

  return transposedArray;
}
