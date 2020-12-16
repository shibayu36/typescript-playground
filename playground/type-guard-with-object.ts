function main() {
  type SampleType = {
    hoge: string | undefined;
    fuga: string;
    piyo: number;
  };

  function isHogeDefined<T extends { hoge: string | undefined }>(o: T): o is T & { hoge: string } {
    return typeof o.hoge === "string";
  }

  const sampleWithHoge: SampleType = {
    hoge: "exists",
    fuga: "fuga",
    piyo: 1,
  };
  if (isHogeDefined(sampleWithHoge)) {
    sampleWithHoge.hoge;
  }
}
main();
