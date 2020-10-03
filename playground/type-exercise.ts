// 問題: https://qiita.com/uhyo/items/e4f54ef3b87afdd65546
// 回答: https://qiita.com/uhyo/items/0e7821ce494024c98da5

/** 4-2. プロパティを上書きする関数 */
// function giveId<T extends object>(obj: T): Omit<T, "id"> & { id: string } {
//   const id = "本当はランダムがいいけどここではただの文字列";
//   return {
//     ...obj,
//     id,
//   };
// }

// // 使用例
// /*
//  * obj1の型は { foo: number; id: string } 型
//  */
// const obj1 = giveId({ foo: 123 });
// /*
//  * obj2の型は { num : number; id: string } 型
//  */
// const obj2 = giveId({
//   num: 0,
//   id: 100,
// });
// // obj2のidはstring型なので別の文字列を代入できる
// obj2.id = "";

/** 4-1. 無い場合はunknown (不正解) */
// function getFoo<T extends object>(
//   obj: T
// ): T extends { foo: infer E } ? E : unknown {
//   return (obj as any).foo;
// }

// // 使用例
// // numはnumber型
// const num = getFoo({
//   foo: 123,
// });
// // st2rはstring型
// const str2 = getFoo({
//   foo: "hoge",
//   bar: 0,
// });
// // unkはunknown型
// const unk = getFoo({
//   hoge: true,
// });

// // エラー例
// getFoo(123);
// getFoo(null);

/** 3-5. undefinedな引数 (不正解) */
// type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

// // 使用例
// const f1: Func<number, number> = (num) => num + 10;
// const v1: number = f1(10);

// const f2: Func<undefined, number> = () => 0;
// const v2: number = f2();
// const v3: number = f2(undefined);

// const f3: Func<number | undefined, number> = (num) => (num || 0) + 10;
// const v4: number = f3(123);
// const v5: number = f3();

// // エラー例
// const v6: number = f1();

/** 3-4. reducer */
// type Action =
//   | {
//       type: "increment";
//       amount: number;
//     }
//   | {
//       type: "decrement";
//       amount: number;
//     }
//   | {
//       type: "reset";
//       value: number;
//     };
// const reducer = (state: number, action: Action) => {
//   switch (action.type) {
//     case "increment":
//       return state + action.amount;
//     case "decrement":
//       return state - action.amount;
//     case "reset":
//       return action.value;
//   }
// };

// // 使用例
// reducer(100, {
//   type: "increment",
//   amount: 10,
// }) === 110;
// reducer(100, {
//   type: "decrement",
//   amount: 55,
// }) === 45;
// reducer(500, {
//   type: "reset",
//   value: 0,
// }) === 0;

// // エラー例
// reducer(0, {
//   type: "increment",
//   value: 100,
// });

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
//   emit<T extends keyof E>(eventName: T, payload: E[T]) {
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
// type MyPartial<T extends object> = {
//   [P in keyof T]?: T[P];
// };
// // 使用例
// /*
//  * T1は { foo?: number; bar?: string; } となる
//  */
// type T1 = MyPartial<{
//   foo: number;
//   bar: string;
// }>;
// /*
//  * T2は { hoge?: { piyo: number; } } となる
//  */
// type T2 = MyPartial<{
//   hoge: {
//     piyo: number;
//   };
// }>;

/** 3-1. 配列からMapを作る */
// function mapFromArray<T extends object, K extends keyof T>(
//   arr: T[],
//   key: K
// ): Map<T[K], T> {
//   const result = new Map();
//   for (const obj of arr) {
//     result.set(obj[key], obj);
//   }
//   return result;
// }

// // 使用例
// const data = [
//   { id: 1, name: "John Smith" },
//   { id: 2, name: "Mary Sue" },
//   { id: 100, name: "Taro Yamada" },
// ];
// const dataMap = mapFromArray(data, "id");
// console.log(dataMap);
// /*
// dataMapは
// Map {
//   1 => { id: 1, name: 'John Smith' },
//   2 => { id: 2, name: 'Mary Sue' },
//   100 => { id: 100, name: 'Taro Yamada' }
// }
// というMapになる
// */

// // エラー例
// mapFromArray(data, "age");

/** 2-5. useState */
// type setStateArgs<T> = T | ((prev: T) => T);
// type setState<T> = (updater: setStateArgs<T>) => void;
// declare function useState<T>(initial: T): [T, setState<T>];
// // 使用例
// // number型のステートを宣言 (numStateはnumber型)
// const [numState, setNumState] = useState(0);
// // setNumStateは新しい値で呼び出せる
// setNumState(3);
// // setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
// setNumState((state) => state + 10);

// // 型引数を明示することも可能
// const [anotherState, setAnotherState] = useState<number | null>(null);
// setAnotherState(100);

// // エラー例
// setNumState("foobar");

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
// 使用例
// declare function addEventListener2(
//   event: string,
//   callback: () => void,
//   options?:
//     | boolean
//     | {
//         capture?: boolean;
//         once?: boolean;
//         passive?: boolean;
//       }
// ): void;
// addEventListener2("foobar", () => {});
// addEventListener2("event", () => {}, true);
// addEventListener2("event2", () => {}, {});
// addEventListener2("event3", () => {}, {
//   capture: true,
//   once: false,
// });

// // エラー例
// addEventListener2("foobar", () => {}, "string");
// addEventListener2("hoge", () => {}, {
//   capture: true,
//   once: false,
//   excess: true,
// });

/** 2-2. いくつかの文字列を受け取れる関数 */
// type Speed = "slow" | "medium" | "fast";

// function getSpeed(speed: Speed): number {
//   switch (speed) {
//     case "slow":
//       return 10;
//     case "medium":
//       return 50;
//     case "fast":
//       return 200;
//   }
// }

// // 使用例
// const slowSpeed = getSpeed("slow");
// const mediumSpeed = getSpeed("medium");
// const fastSpeed = getSpeed("fast");

// // エラー例
// getSpeed("veryfast");

/** 2-1. ジェネリクス */
// function myFilter<T>(arr: T[], predicate: (elm: T) => boolean) {
//   const result = [];
//   for (const elm of arr) {
//     if (predicate(elm)) {
//       result.push(elm);
//     }
//   }
//   return result;
// }

// // 使用例
// const res = myFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0);
// const res2 = myFilter(["foo", "hoge", "bar"], (str) => str.length >= 4);

// // エラー例
// myFilter([1, 2, 3, 4, 5], (str) => str.length >= 4);

/** 1-4. 配列の型 */
// function sumOfPos(arr: number[]) {
//   return arr.filter((num) => num >= 0).reduce((acc, num) => acc + num, 0);
// }

// // 使用例
// const sum: number = sumOfPos([1, 3, -2, 0]);

// // エラー例
// sumOfPos(123, 456);
// sumOfPos([123, "foobar"]);

/** 1-3. 関数の型 */
// type IsPositiveFunc = (num: number) => boolean;
// const isPositive: IsPositiveFunc = (num) => num >= 0;

// // 使用例
// isPositive(5);

// // エラー例
// isPositive("foo");
// const res: number = isPositive(123);

/** 1-2 */
// type User = {
//   name: string;
//   age: number;
//   private: boolean;
// };
// function showUserInfo(user: User) {
//   // 省略
// }

// // 使用例
// showUserInfo({
//   name: "John Smith",
//   age: 16,
//   private: false,
// });

// // エラー例
// showUserInfo({
//   name: "Mary Sue",
//   private: false,
// });
// const usr: User = {
//   name: "Gombe Nanashino",
//   age: 100,
// };

/** 1-1 */
// function isPositive(num: number): boolean {
//   return num >= 0;
// }

// // 使用例
// isPositive(3);

// // エラー例
// isPositive("123");
// const numVar: number = isPositive(-5);
