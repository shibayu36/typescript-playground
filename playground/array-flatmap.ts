import { uniq } from "lodash";

const services = [
  {
    children: [
      {
        name: "hoge",
      },
      {
        name: "fuga",
      },
    ],
  },
  {
    children: [
      {
        name: "foo",
      },
      {
        name: "bar",
      },
      {
        name: "baz",
      },
    ],
  },
];

const roleNames = uniq(services.flatMap((s) => s.children.map((r) => r.name))).sort();
console.log(roleNames);
