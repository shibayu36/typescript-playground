import { shuffle as _shuffle } from "underscore";

export function log(): void {
  console.log("hoge");
}

export function shuffle(list: number[]): number[] {
  return _shuffle(list);
}
