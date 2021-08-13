const { Given, When, Then } = require('@cucumber/cucumber');
const { client } = require('nightwatch-api');
const { createProject } = require('../helpers/apiHelpers');
const assert = require('assert');

const projectPage = client.page.projectPage();

Given(
  'user {string} has created the following projects:',
  async function (user, dataTable) {
    const projects = dataTable.hashes();
    let result;
    for (const project of projects) {
      result = await createProject(user, project);
    }
    assert.strictEqual(result, true, 'Cannot create project');
  }
);

Given(
  'the user has created a project board {string} using the webUI',
  async function (boardName) {
    await projectPage.createProjectBoard(boardName);
    const isProjectBoardExists = await projectPage.isProjectBoardExists(
      boardName
    );
    assert.strictEqual(
      isProjectBoardExists,
      true,
      'Expected project board to be created but is not'
    );
  }
);

Given(
  'the user has added a board column {string} using the webUI',
  async function (boardColumnName) {
    let columnNumber = 1;
    await projectPage.addBoardColumn(boardColumnName, columnNumber);
    const isBoardColumnExist = await projectPage.isBoardColumnExist(
      boardColumnName
    );
    assert.strictEqual(
      isBoardColumnExist,
      true,
      `Expected to board list to be ${isBoardColumnExist} but was not`
    );
  }
);

Given('the user has added the following columns:', async function (dataTable) {
  const boardColumns = dataTable.hashes();
  const expectedColumns = [];
  let count = 0;
  for (const { name } of boardColumns) {
    const isFisrtColumn = count === 0;
    await projectPage.addBoardColumn(name, isFisrtColumn);
    expectedColumns.push(name);
    count++;
  }
  // const actualColumns = await projectPage.getBoardColumns();
  // assert.deepEqual(
  //   actualColumns,
  //   expectedColumns,
  //   `Expected to board lists to be present but was not found`
  // );
});

When(
  'the user deletes a project {string} using the webUI',
  function (projectName) {
    return projectPage.deleteProject(projectName);
  }
);

When(
  'the user renames the project {string} to {string} using the webUI',
  function (oldProjectName, newProjectName) {
    return projectPage.renameProject(oldProjectName, newProjectName);
  }
);

When(
  'the user changes background of project {string} to purple using the webUI',
  function (projectName) {
    return projectPage.changeProjectBg(projectName);
  }
);

When(
  'the user creates a new project board {string} using the webUI',
  function (boardName) {
    return projectPage.createProjectBoard(boardName);
  }
);

When(
  'the user add a board column {string} using the webUI',
  function (boardColumnName) {
    let column = 1;
    return projectPage.addBoardColumn(boardColumnName, column);
  }
);
When('the user add the following columns:', async function (dataTable) {
  const boardColumns = dataTable.hashes();
  let columns = 0;
  for (const boardColumn of boardColumns) {
    columns++;
    await projectPage.addBoardColumn(Object.values(boardColumn), columns);
  }
});

When(
  'the user adds a card {string} in a column {string} using the webUI',
  function (cardName, boardColumnName) {
    let cardNumber = 1;
    return projectPage.addCard(cardName, cardNumber, boardColumnName);
  }
);

When(
  'the user add the following cards in column {string}:',
  async function (boardColumnName, dataTable) {
    const columnCards = dataTable.hashes();
    let cardNumber = 0;
    for (const columnCard of columnCards) {
      cardNumber++;
      await projectPage.addCard(
        Object.values(columnCard),
        cardNumber,
        boardColumnName
      );
    }
  }
);

Then(
  'the project title should be renamed to {string}',
  async function (newProjectName) {
    const isProjectRename = await projectPage.isProjectOpen(newProjectName);
    assert.strictEqual(
      isProjectRename,
      true,
      `Expected to project title to be ${newProjectName} but was not`
    );
  }
);

Then(
  'the created project {string} should be opened',
  async function (projectName) {
    const isProjectOpen = await projectPage.isProjectOpen(projectName);
    assert.strictEqual(
      isProjectOpen,
      true,
      `Expected project "${projectName}" to be opened but not found`
    );
  }
);

Then('the project background should be purple', async function () {
  const isBackgroundPurple = await projectPage.isBackgroundPurple();
  assert.strictEqual(
    isBackgroundPurple,
    true,
    'Expected background to be purple but is not'
  );
});

Then('the project board {string} should exist', async function (boardName) {
  const isProjectBoardExists = await projectPage.isProjectBoardExists(
    boardName
  );
  assert.strictEqual(
    isProjectBoardExists,
    true,
    'Expected project board to be created but does not'
  );
});

Then(
  'the board column {string} should exist',
  async function (boardColumnName) {
    const isBoardColumnExist = await projectPage.isBoardColumnExist(
      boardColumnName
    );
    assert.strictEqual(
      isBoardColumnExist,
      true,
      `Expected to board list to be ${boardColumnName} but was not`
    );
  }
);
Then('the following board columns shold exist:', async function (dataTable) {
  const boardColumns = dataTable.hashes();
  for (const boardColumn of boardColumns) {
    const isBoardColumnExist = await projectPage.isBoardColumnExist(
      boardColumn.name
    );
    assert.strictEqual(
      isBoardColumnExist,
      true,
      `Expected to board list to be ${boardColumn.name} but was not`
    );
  }
});

Then(
  'the card {string} in column {string} should exist',
  async function (cardName, columnName) {
    const isCardExist = await projectPage.isCardExist(columnName, cardName);
    assert.strictEqual(
      isCardExist,
      true,
      `Expected to card to be "${cardName}" but is not`
    );
  }
);

Then(
  'the following cards should exist in board columns',
  async function (dataTable) {
    const columnCards = dataTable.hashes();
    for (const columnCard of columnCards) {
      const isCardExist = await projectPage.isCardExist(
        columnCard.columnName,
        columnCard.cardName
      );
      assert.strictEqual(
        isCardExist,
        true,
        `Expected to card to be "${columnCard.cardName}" in "${columnCard.columnName}" but is not`
      );
    }
  }
);
