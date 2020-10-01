// https://qiita.com/uhyo/items/e4f54ef3b87afdd65546

/** 1-1 */
// function isPositive(num: number): boolean {
//   return num >= 0;
// }

// // 使用例
// isPositive(3);

// // エラー例
// isPositive("123");
// const numVar: number = isPositive(-5);

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

/** 1-3. 関数の型 */
// type IsPositiveFunc = (num: number) => boolean;
// const isPositive: IsPositiveFunc = (num) => num >= 0;

// // 使用例
// isPositive(5);

// // エラー例
// isPositive("foo");
// const res: number = isPositive(123);
