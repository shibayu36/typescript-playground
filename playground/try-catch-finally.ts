try {
  throw new Error("hoge");
} catch {
  throw new Error("fuga");
} finally {
  console.log("finally");
}
console.log("finished");
