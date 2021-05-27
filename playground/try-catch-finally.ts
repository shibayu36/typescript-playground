try {
  throw new Error("hoge");
} catch {
  // throw new Error("fuga");
} finally {
  console.log("finally");
}
console.log("finished");

const tryCatchExample = (): string => {
  try {
    throw new Error("hoge");
  } catch {
    return "hoge";
  } finally {
    console.log("tryCatchExample finally");
  }
};

tryCatchExample();
