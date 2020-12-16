// 問題: https://qiita.com/uhyo/items/e4f54ef3b87afdd65546
// 回答: https://qiita.com/uhyo/items/0e7821ce494024c98da5

/** 4-8. オプショナルなキーだけ抜き出す */
type MapToNever<Obj> = {
  [Key in keyof Obj]: never
}
type PickUndefinedKeys<Obj> = {
  [Key in keyof Obj]-?: undefined extends Obj[Key] ? Key : never
}[keyof Obj]
type OptionalKeys<Obj> = PickUndefinedKeys<MapToNever<Obj>>

// 使用例
type Data = {
  foo: string;
  bar?: number;
  baz?: boolean;

  hoge: undefined;
  piyo?: undefined;
};

// "bar" | "baz" | "piyo"
type T = OptionalKeys<Data>;

/** 4-7. 条件を満たすキーだけを抜き出す */
type KeysOfType<Obj, Val> = {
  [Key in keyof Obj]-?: Obj[Key] extends Val ? Key : never
}[keyof Obj];

// 使用例
type Data = {
  foo: string;
  bar: number;
  baz: boolean;

  hoge?: string;
  fuga: string;
  piyo?: number;
};

// "foo" | "fuga"
// ※ "hoge" は string | undefiendなので含まない
type StringKeys = KeysOfType<Data, string>;

function useNumber<Obj>(obj: Obj, key: KeysOfType<Obj, number>) {
  // ヒント: ここはanyを使わざるを得ない
  const num: number = (obj as any)[key];
  return num * 10;
}

declare const data: Data;

// これはOK
useNumber(data, "bar");
// これは型エラー
useNumber(data, "baz");

/** 4-6. ページを描画する関数 */
type Page =
  | {
      page: "top";
    }
  | {
      page: "mypage";
      userName: string;
    }
  | {
      page: "ranking";
      articles: string[];
    };

type PageGenerators = {
  [P in Page["page"]]: (prop: Extract<Page, { page: P }>) => string
};

const pageGenerators: PageGenerators = {
  top: () => "<p>top page</p>",
  mypage: ({ userName }) => `<p>Hello, ${userName}!</p>`,
  ranking: ({ articles }) =>
    `<h1>ranking</h1>
         <ul>
        ${articles.map(name => `<li>${name}</li>`).join("")}</ul>`
};
const renderPage = (page: Page) => pageGenerators[page.page](page as any);

/** 4-5. 最低一つは必要なオプションオブジェクト */
type AtLeastOne<T extends object, K = keyof T>  = K extends keyof T ? Pick<T, K> & Partial<Omit<T, K>> : never
// 使用例
interface Options {
  foo: number;
  bar: string;
  baz: boolean;
}
function test(options: AtLeastOne<Options>) {
  const { foo, bar, baz } = options;
  // 省略
}
test({
  foo: 123,
  bar: "bar"
});
test({
  baz: true
});

// エラー例
test({});

/** 4-4. 一部だけPartial */
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
// 使用例

// 元のデータ
interface Data {
  foo: number;
  bar: string;
  baz: string;
}
/*
 * T1は { foo?: number; bar?: string; baz: string } 型
 */
type T1 = PartiallyPartial<Data, "foo" | "bar">

/** 4-3. unionは嫌だ (不正解) */
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

type EmitPayload<E, Ev, EvOrig> = Ev extends keyof E ? EvOrig[] extends Ev[] ? E[Ev] : never : never

class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: EmitPayload<E, Ev, Ev>): void {
    // 省略
  }
}

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1"
});
ed.emit("stop", {
  user: "user1",
  after: 3
});
ed.emit("end", {});

// エラー例
ed.emit<"start" | "stop">("stop", {
  user: "user1"
});

/** 4-2. プロパティを上書きする関数 */
function giveId<T extends object>(obj: T): Omit<T, "id"> & {id: string} {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id
  };
}

// 使用例
/*
 * obj1の型は { foo: number; id: string } 型
 */
const obj1 = giveId({ foo: 123 });
/*
 * obj2の型は { num : number; id: string } 型
 */
const obj2 = giveId({
  num: 0,
  id: 100,
});
// obj2のidはstring型なので別の文字列を代入できる
obj2.id = '';
obj2.id = 123

/** 4-1. 無い場合はunknown */
function getFoo<T extends object>(obj: T): T extends { foo: infer R } ? R : unknown {
  return (obj as any).foo;
}

// 使用例
// numはnumber型
const num = getFoo({
  foo: 123
});
// strはstring型
const str2 = getFoo({
  foo: "hoge",
  bar: 0
});
// unkはunknown型
const unk = getFoo({
  hoge: true
});

// エラー例
getFoo(123);
getFoo(null);

/** 3-5. undefinedな引数 */
type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

// 使用例
const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

const f3: Func<number | undefined, number> = num => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// エラー例
const v6: number = f1();

/** 3-4. reducer */
type ActionIncrement = {
  type: "increment",
  amount: number
}
type ActionDecrement = {
  type: "decrement",
  amount: number
}
type ActionReset = {
  type: "reset",
  value: number
}
type Action = ActionIncrement | ActionDecrement | ActionReset
const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;
    case "reset":
      return action.value;
  }
};

// 使用例
reducer(100, {
    type: 'increment',
    amount: 10,
}) === 110;
reducer(100, {
    type: 'decrement',
    amount: 55,
}) === 45;
reducer(500, {
    type: 'reset',
    value: 0,
}) === 0;

// エラー例
reducer(0,{
    type: 'increment',
    value: 100,
});

/** 3-3. イベント */
// interface EventPayloads {
//   start: {
//     user: string;
//   };
//   stop: {
//     user: string;
//     after: number;
//   };
//   end: {};
// }

// class EventDischarger<E> {
//   emit<Ev extends keyof E>(eventName: Ev, payload: E[Ev]): void {
//     // 省略
//   }
// }

// // 使用例
// const ed = new EventDischarger<EventPayloads>();
// ed.emit("start", {
//   user: "user1",
// });
// ed.emit("stop", {
//   user: "user1",
//   after: 3,
// });
// ed.emit("end", {});

// // エラー例
// ed.emit("start", {
//   user: "user2",
//   after: 0,
// });
// ed.emit("stop", {
//   user: "user2",
// });
// ed.emit("foobar", {
//   foo: 123,
// });

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
// function giveId<T>(obj: T): T & { id: string } {
//   const id = "本当はランダムがいいけどここではただの文字列";
//   return {
//     ...obj,
//     id,
//   };
// }

// // 使用例
// const obj1: {
//   id: string;
//   foo: number;
// } = giveId({ foo: 123 });
// const obj2: {
//   id: string;
//   num: number;
//   hoge: boolean;
// } = giveId({
//   num: 0,
//   hoge: true,
// });

// // エラー例
// const obj3: {
//   id: string;
//   piyo: string;
// } = giveId({
//   foo: "bar",
// });

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
