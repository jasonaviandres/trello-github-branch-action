const core = require("@actions/core");
const github = require("@actions/github");

try {
  const apiKey = process.env["TRELLO_API_KEY"];
  const apiToken = process.env["TRELLO_API_TOKEN"];
  const boardId = process.env["TRELLO_BOARD_ID"];
  const action = core.getInput("trello-action");
  const myToken = process.env["TOKEN"];

  const octokit = github.getOctokit(myToken);

  switch (action) {
    case "move_card_when_branch_created":
      moveCardWhenBranchCreated(apiKey, apiToken, boardId);
      break;
  }
} catch (error) {
  core.setFailed(error.message);
}

const moveCardWhenBranchCreated = (apiKey, apiToken, boardId) => {
  const departureListID = process.env["TRELLO_DEPARTURE_LIST_ID"];
  const destinationListID = process.env["TRELLO_DESTINATION_LIST_ID"];
  //this needs to be changed to branch name
  console.log(github.context.payload);
};

// Fetch all labels from trello board
const getLabelsOfBoard = (apiKey, apiToken, boardId) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/labels?key=${apiKey}&token=${apiToken}`
    )
      .then((resp) => {
        resolve(JSON.parse(resp));
      })
      .catch((err) => reject(err));
  });
};

// Fetch all members from trello board
const getMembersOfBoard = (apiKey, apiToken, boardId) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${apiToken}`
    )
      .then((resp) => {
        resolve(JSON.parse(resp));
      })
      .catch((err) => reject(err));
  });
};

// Fetch all cards of a list
const getCardsOfList = (apiKey, apiToken, listId) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`
    )
      .then((resp) => resolve(JSON.parse(resp)))
      .catch((err) => reject(err));
  });
};

// PUT method of trello to move card
const putCard = (apiKey, apiToken, cardId, params) => {
  const options = {
    method: "PUT",
    url: `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`,
    form: {
      idList: params.destinationListId,
      idMembers: params.memberIds,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(options)
      .then((resp) => resolve(JSON.parse(resp)))
      .catch((err) => reject(err));
  });
};
