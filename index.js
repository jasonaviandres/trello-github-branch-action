const core = require("@actions/core");
const github = require("@actions/github");

try {
  const nameToGreet = core.getInput("who-to-greet");
  console.log("Hello", nameToGreet);
  console.log(JSON.stringify(github.context.payload.action));
} catch (err) {
  core.setFailed(err.message);
}

// TODO 1: need to get a branch name that was just created

// TODO 2: need to check branch name and issue

// TODO 3: if branch name and issue match, then move trello card from backlog to in progress
