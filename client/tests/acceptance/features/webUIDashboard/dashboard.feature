Feature: dashboard
    As a admin
    I want to create a project
    So that I can manage project

    Background: 
        Given the following users has been created:
            | name   | password | email          | isAdmin |
            | user10 | test     | test@test.test | true    |
        And the user has logged in with email "test@test.test" and password "test"

    Scenario: create a new project
        When the user creates a project with name "testproject" using the webUI
        Then the created project "testproject" should be opened