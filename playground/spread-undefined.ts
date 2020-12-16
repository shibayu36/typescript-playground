function main() {
  const hoge: object | undefined = undefined;

  const fuga = {
    foo: "bar",
    ...(hoge ?? {}),
  };
  console.log(fuga);
}
main();
