const str =
  "person/shard_id=1/batch_id=b863d80d-4b7c-4cd5-88bc-cea585c416dc/status=failed/dfe9511b-d7c1-4de6-a80e-2e5f777ee2c1";
const matched = str.match(/\/status=([^/]+)\//);
if (matched) {
  console.log(matched[1]);
}
