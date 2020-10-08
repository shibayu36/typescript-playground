// 問題: https://qiita.com/uhyo/items/e4f54ef3b87afdd65546
// 回答: https://qiita.com/uhyo/items/0e7821ce494024c98da5

/** 3-3. イベント */
interface EventPayloads {
  start: {
    user: string;
  };
  stop: {
    user: string;
    after: number;
  };
  end: {};
}

class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: E[Ev]): void {
    // 省略
  }
}

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1",
});
ed.emit("stop", {
  user: "user1",
  after: 3,
});
ed.emit("end", {});

// エラー例
ed.emit("start", {
  user: "user2",
  after: 0,
});
ed.emit("stop", {
  user: "user2",
});
ed.emit("foobar", {
  foo: 123,
});

/** 3-2. Partial */
type MyPartial<T extends {}> = {
  [P in keyof T]?: T[P];
};
// 使用例
/*
 * T1は { foo?: number; bar?: string; } となる
 */
type T1 = MyPartial<{
  foo: number;
  bar: string;
}>;
/*
 * T2は { hoge?: { piyo: number; } } となる
 */
type T2 = MyPartial<{
  hoge: {
    piyo: number;
  };
}>;

/** 3-1. 配列からMapを作る */
function mapFromArray<T extends {}, K extends keyof T>(
  arr: T[],
  key: K
): Map<T[K], T> {
  const result = new Map();
  for (const obj of arr) {
    result.set(obj[key], obj);
  }
  return result;
}

// 使用例
const data = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Mary Sue" },
  { id: 100, name: "Taro Yamada" },
];
const dataMap = mapFromArray(data, "id");
/*
dataMapは
Map {
  1 => { id: 1, name: 'John Smith' },
  2 => { id: 2, name: 'Mary Sue' },
  100 => { id: 100, name: 'Taro Yamada' }
}
というMapになる
*/

// エラー例
mapFromArray(data, "age");

/** 2-5. useState */
type SetStateArg<T> = T | ((prev: T) => T);
declare function useState<T>(initial: T): [T, (state: SetStateArg<T>) => void];

// 使用例
// number型のステートを宣言 (numStateはnumber型)
const [numState, setNumState] = useState(0);
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState((state) => state + 10);

// 型引数を明示することも可能
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

// エラー例
setNumState("foobar");

/** 2-4. プロパティを1つ増やす関数 */
function giveId<T>(obj: T): T & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}

// 使用例
const obj1: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });
const obj2: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true,
});

// エラー例
const obj3: {
  id: string;
  piyo: string;
} = giveId({
  foo: "bar",
});

/** 2-3. 省略可能なプロパティ */
declare function addEventListener(
  event: string,
  callback: () => void,
  options: boolean | { capture?: boolean; once?: boolean; passive?: boolean }
): void;
// 使用例
addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false,
});

// エラー例
addEventListener("foobar", () => {}, "string");
addEventListener("hoge", () => {}, {
  capture: true,
  once: false,
  excess: true,
});

/** 2-2. いくつかの文字列を受け取れる関数 */
type Speed = "slow" | "medium" | "fast";

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

// 使用例
const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");

// エラー例
getSpeed("veryfast");

/** 2-1. ジェネリクス */
function myFilter<T>(arr: T[], predicate: (elem: T) => boolean): T[] {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

// 使用例
const res = myFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0);
const res2 = myFilter(["foo", "hoge", "bar"], (str) => str.length >= 4);

// エラー例
myFilter([1, 2, 3, 4, 5], (str) => str.length >= 4);
