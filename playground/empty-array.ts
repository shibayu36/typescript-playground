const s = "aiueo";
const cache: (boolean | undefined)[][] = Array.from(new Array(s.length), () => new Array(s.length));
console.log(cache[1][2]);
