import { MapCell } from "@/helpers/types";

export const createMap = (colNames: string[], colsCount: number): MapCell[] => {
  const result = [] as MapCell[];

  colNames.forEach((colX) => {
    colNames.forEach((colY) => {
      const corr = colX === colY ? 0 : Math.round(Math.random() * 40) + 10;

      result.push({
        rowName: colX,
        colName: colY,
        correlation: corr,
        row: 0,
        col: 0,
        id: Date.now().toString(16) + colY + colX,
      });
    });
  });

  result.forEach((item, i) => (item.row = Math.ceil((i + 1) / colsCount)));

  for (let row = 1; row <= colsCount; row++) {
    const match = result.filter((item) => item.row === row);

    match.forEach((item, i) => (item.col = i + 1));
  }

  return result;
};
