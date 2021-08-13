const { format } = require('util');
const { client } = require('nightwatch-api');

module.exports = {
  url: function () {
    return this.api.launchUrl + '/projects';
  },
  commands: [
    {
      addBoardColumn: function (boardColumnName, isFisrtColumn) {
        if (isFisrtColumn) {
          return this.waitForElementVisible('@addListIcon')
            .click('@addListIcon')
            .setValue('@boardColumnNameInput', boardColumnName)
            .waitForElementVisible('@addListBtn')
            .click('@addListBtn');
        } else {
          return this.setValue('@boardColumnNameInput', boardColumnName)
            .waitForElementVisible('@addListBtn')
            .click('@addListBtn');
        }
      },
      addCard: function (cardName, cardNumber, boardColumnName) {
        const cardInputField = {
          selector: this.getCardInputEl(boardColumnName),
          locateStrategy: 'xpath',
        };
        const addCardConfirmBtn = {
          selector: this.getaddCardConfirmEl(boardColumnName),
          locateStrategy: 'xpath',
        };
        if (cardNumber == 1) {
          const checkBoardName = {
            selector: this.getCardEl(boardColumnName),
            locateStrategy: 'xpath',
          };
          return this.waitForElementVisible(checkBoardName)
            .click(checkBoardName)
            .waitForElementVisible(cardInputField)
            .setValue(cardInputField, cardName)
            .waitForElementVisible(addCardConfirmBtn)
            .click(addCardConfirmBtn);
        } else {
          return this.waitForElementVisible(cardInputField)
            .setValue(cardInputField, cardName)
            .waitForElementVisible(addCardConfirmBtn)
            .click(addCardConfirmBtn);
        }
      },
      deleteProject: function (projectName) {
        return this.openProjectActions(projectName)
          .waitForElementVisible('@deleteProject')
          .click('@deleteProject')
          .waitForElementVisible('@confirmDeleteBtn')
          .click('@confirmDeleteBtn');
      },
      renameProject: function (oldProjectName, newProjectName) {
        return this.openProjectActions(oldProjectName)
          .waitForElementVisible('@projectTitleInput')
          .clearValue('@projectTitleInput')
          .setValue('@projectTitleInput', newProjectName)
          .waitForElementVisible('@saveTitleBtn')
          .click('@saveTitleBtn');
      },
      changeProjectBg: function (projectName) {
        return this.openProjectActions(projectName)
          .waitForElementVisible('@editProjectBackground')
          .click('@editProjectBackground')
          .waitForElementVisible('@purpleBgBtn')
          .click('@purpleBgBtn');
      },
      createProjectBoard: function (boardName) {
        return this.waitForElementVisible('@addBoardIcon')
          .click('@addBoardIcon')
          .waitForElementVisible('@projectBoardInputField')
          .setValue('@projectBoardInputField', boardName)
          .waitForElementVisible('@createBoardBtn')
          .click('@createBoardBtn');
      },
      openProjectActions: function (projectName) {
        const projectTitleEl = {
          selector: this.getProjectTitle(projectName),
          locateStrategy: 'xpath',
        };
        return this.waitForElementVisible(projectTitleEl).click(projectTitleEl);
      },
      isBackgroundPurple: async function () {
        let result = false;
        await this.isVisible('@purpleBg', (res) => {
          result = res.value;
        });
        return result;
      },
      isProjectBoardExists: async function (boardName) {
        let result = false;
        const projectBoardEl = {
          selector: this.getProjectBoardEl(boardName),
          locateStrategy: 'xpath',
        };
        await this.isVisible(projectBoardEl, (res) => {
          result = res.value;
        });
        return result;
      },
      isProjectOpen: async function (projectName) {
        let result = false;
        const projectTitleEl = {
          selector: this.getProjectTitle(projectName),
          locateStrategy: 'xpath',
        };
        await this.isVisible(projectTitleEl, (res) => {
          result = res.value;
        });
        return result;
      },
      isBoardColumnExist: async function (boardColumnName) {
        let result = false;
        const boardListEl = {
          selector: this.getBoardColumnEl(boardColumnName),
          locateStrategy: 'xpath',
        };
        await this.isVisible(boardListEl, (res) => {
          result = res.value;
        });
        return result;
      },
      isCardExist: async function (columnName, cardName) {
        let result = false;
        const cardTabEl = {
          selector: this.getCardTabEl(columnName, cardName),
          locateStrategy: 'xpath',
        };
        await this.isVisible(cardTabEl, (res) => {
          result = res.value;
        });
        return result;
      },
      getBoardColumns: async function () {
        const boardColumns = [];
        await this.api.elements('@boardColumn', async function ({ value }) {
          value.forEach(function (element) {
            const elementId = Object.values(element)[0];
            client.elementIdText(elementId, function ({ value }) {
              boardColumns.push(value);
            });
          });
        });
        return boardColumns;
      },
      getaddCardConfirmEl: function (boardColumnName) {
        return format(
          this.elements.addCardConfirmBtn.selector,
          boardColumnName
        );
      },
      getCardInputEl: function (boardColumnName) {
        return format(this.elements.cardInputField.selector, boardColumnName);
      },
      getCardTabEl: function (columnName, cardName) {
        return format(this.elements.cardTab.selector, columnName, cardName);
      },
      getCardEl: function (boardColumnName) {
        return format(this.elements.addCardBtn.selector, boardColumnName);
      },
      getProjectBoardEl: function (boardName) {
        return format(this.elements.projectBoardTab.selector, boardName);
      },
      getProjectTitle: function (projectName) {
        return format(this.elements.projectHeader.selector, projectName);
      },
      getBoardColumnEl: function (boardColumnName) {
        return format(this.elements.addBoardColumn.selector, boardColumnName);
      },
    },
  ],
  elements: {
    addBoardIcon: {
      selector: 'button[class*=Boards_addButton]',
    },
    addListIcon: {
      selector: '//button[contains(@class,"BoardKanban_addListButton")]',
      locateStrategy: 'xpath',
    },
    addListBtn: {
      selector:
        '//button[contains(@class,"ListAdd_submitButton") and text()="Add list"]',
      locateStrategy: 'xpath',
    },
    boardColumn: {
      selector: '//div[contains(@class,"List_headerName")]',
      locateStrategy: 'xpath',
    },
    boardColumnName: {
      selector: '//div[contains(@class,"List_headerName") and text()="%s"]',
      locateStrategy: 'xpath',
    },
    addCardBtn: {
      selector:
        '//div[@class="List_innerWrapper__Hck6J"]//div//div[text()="%s"]/../../button',
      locateStrategy: 'xpath',
    },
    addBoardList: {
      selector: '//div[contains(@class,"List_headerName")and text()="%s"]',

    addCardConfirmBtn: {
      selector:
        '//div[@class="List_innerWrapper__Hck6J"]//div//div[text()="%s"]//ancestor::div[@class="List_outerWrapper__pTVo5"]//button[contains(@class, "CardAdd_submitButton")and text()="Add card"]',
      locateStrategy: 'xpath',
    },
    boardColumnNameInput: {
      selector: 'div[class*=ListAdd_field] input',
    },
    cardInputField: {
      selector:
        '//div[@class="List_innerWrapper__Hck6J"]//div//div[text()="%s"]//ancestor::div[@class="List_outerWrapper__pTVo5"]//textarea[@class="CardAdd_field__bZkCx"]',
    },
    cardTab: {
      selector:
        '//div[@class="List_innerWrapper__Hck6J"]//div//div[text()="%s"]//ancestor::div[@class="List_outerWrapper__pTVo5"]//div[contains(@class,"Card_name")and text()="%s"]',
      locateStrategy: 'xpath',
    },
    confirmDeleteBtn: {
      selector: '//button[text()="Delete project"]',
      locateStrategy: 'xpath',
    },
    createBoardBtn: {
      selector: '//button[text()="Create board"]',
      locateStrategy: 'xpath',
    },
    deleteProject: {
      selector:
        '//button[contains(@class,"GeneralPane_actionButton") and text()="Delete Project"]',
      locateStrategy: 'xpath',
    },
    editProjectBackground: {
      selector: '//a[contains(@class,"item") and text()="Background"]',
      locateStrategy: 'xpath',
    },
    editProjectTitle: {
      selector:
        '//a[contains(@class,"ActionsPopup_menuItem__K6RRF") and text()="Edit Title"]',
      locateStrategy: 'xpath',
    },
    projectHeader: {
      selector: '//a[contains(@class,"Header_item") and text()="%s"]',
      locateStrategy: 'xpath',
    },
    projectTitleInput: {
      selector: 'div[class*=InformationEdit_field] input',
    },
    purpleBg: {
      selector: 'div[class*=styles_backgroundPurpleRose]',
    },
    purpleBgBtn: {
      selector: 'button[class*=styles_backgroundPurpleRose]',
    },
    projectBoardInputField: {
      selector: 'div[class*=AddPopup_field] input',
    },
    projectBoardTab: {
      selector: '//a[contains(@class, "Boards_link") and text()="%s"]',
      locateStrategy: 'xpath',
    },
    saveTitleBtn: {
      selector: '//button[text()="Save"]',
      locateStrategy: 'xpath',
    },
  },
};
