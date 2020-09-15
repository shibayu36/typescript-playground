const hoge: string = "fuga";

console.log({
  foo: "bar",
  ...(hoge === "fuga" ? { hoge: "fuga" } : {}),
});

console.log({
  foo: "bar",
  ...(hoge === "hoge" ? { hoge: "fuga" } : {}),
});
