const searchParams = new URLSearchParams("to=2021-03-04T12:34:56Z");
searchParams.append("from", "2021-03-06T12:34:56Z");
console.log(searchParams.toString());
console.log(searchParams.get("from"));
