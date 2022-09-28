const core = require("@actions/core");
const github = require("@actions/github");

try {
  const nameToGreet = core.getInput("who-to-greet");
  console.log("Hello", nameToGreet);
  console.log(JSON.stringify(github.context.payload));
} catch (err) {
  core.setFailed(err.message);
}
