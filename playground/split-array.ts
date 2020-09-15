const array = [1, 2, 3, 4, 5, 6, 7, 8];

const chunk = 5;
for (let i = 0, j = array.length; i < j; i += chunk) {
  const rules = array.slice(i, i + chunk);
  console.log(rules);
}

const tempArray = [...array];
while (tempArray.length > 0) {
  const rules = tempArray.splice(0, 5);
  console.log(rules);
}
