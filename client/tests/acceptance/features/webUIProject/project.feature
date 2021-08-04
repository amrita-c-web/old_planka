Feature: project board
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
        When the user renames the project to "testproject2" using the webUI
        Then the project title should be renamed to "testproject2"

    Scenario: edit project background
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1" 
        When the user changes background to purple using the webUI 
        Then the project background should be purple

    Scenario: create a new project board
        Given user "user10" has created the following projects:
            | name     |
            | project1 |
        And the user has opened project "project1"
        When the user creates a new project board "board1" using the webUI
        Then the project board "board1" should exist