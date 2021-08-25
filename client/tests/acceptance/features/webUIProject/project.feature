Feature: project 
    As a admin
    I want to change project elements
    So that I organize project board 

    Background: 
        Given the following users has been created:
            | name   | password | email          | isAdmin |
            | user10 | test     | test@test.test | true    |
        And the user has logged in with email "test@test.test" and password "test"

    Scenario: delete a project
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
            | project2 |
            | project3 |
        And the user has opened project "project2"
        When the user deletes a project "project2" using the webUI
        Then the user should be in dashboard page
    
    Scenario: rename project title
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1" 
        When the user renames the project "project1" to "testproject2" using the webUI
        Then the project title should be renamed to "testproject2"

    Scenario: edit project background
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1" 
        When the user changes background of project "project1" to purple using the webUI 
        Then the project background should be purple

    Scenario: create a new project board
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        When the user creates a new project board "Acceptance test" using the webUI
        Then the project board "Acceptance test" should exist

    Scenario: create a board column
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        And the user has created a project board "Acceptance test" using the webUI
        When the user add a board column "Todo" using the webUI
        Then the board column "Todo" should exist
    
    Scenario: create board columns
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        And the user has created a project board "Acceptance test" using the webUI
        When the user add the following columns:
            | name        |
            | Todo        |
            | In-progress |
        Then the following board columns shold exist:
            | name        |
            | Todo        |
            | In-progress |
    
    Scenario: add card in a board column
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        And the user has created a project board "Acceptance test" using the webUI
        And the user has added a board column "Todo" using the webUI
        When the user adds a card "card1" in a column "Todo" using the webUI
        Then the card "card1" should exist in column "Todo"

    Scenario: add cards in a board columns
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        And the user has created a project board "Acceptance test" using the webUI
        And the user has added the following columns:
            | name        |
            | Todo        |
            | In-progress |
        When the user adds the following cards in column "Todo":
            | name          |
            | Share testing |
            | Implement CI  |
        And the user adds the following cards in column "In-progress":
            | name               |
            | Basic UI test      |
            | Refactor test code |
        Then the following cards should exist in board columns:
        | columnName  | cardName           |
        | Todo        | Share testing      |
        | Todo        | Implement CI       |
        | In-progress | Basic UI test      |
        | In-progress | Refactor test code |

    Scenario: drag and drop cards in a board columns
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        And the user has created a project board "Acceptance test" using the webUI
        And the user has added the following columns:
            | name        |
            | Todo        |
            | In-progress |
        And the user has added the following cards in column "Todo":
            | name          |
            | Share testing |
            | Implement CI  |
        When the user drags the card "Share testing" from column "Todo" to "In-progress" using the webUI
        Then the card "Share testing" should exist in column "In-progress"