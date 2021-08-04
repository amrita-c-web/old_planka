Feature: login
    As a admin
    I want to log in
    So that I can manage project

    Scenario: User logs in with valid credentials
        Given user has browsed to the login page
        When user logs in with username "demo@demo.demo" and password "demo" using the webUI
        Then the user should be in dashboard page
    
    Scenario Outline: User can not log in with invalid credentials
        Given user has browsed to the login page 
        When user logs in with username "<username>" and password "<password>" using the webUI
        Then error message "<error_message>" should be displayed in the webUI
        Examples:
            | username       | password | error_message              |
            | same           | sg123    | Invalid e-mail or username |
            | game           | demo     | Invalid e-mail or username |
            | demo@demo.demo | se24     | Invalid password           |

    Scenario: User can log out
        Given the following users has been created:
            | name   | password | email          |
            | user10 | test     | test@test.test |
        And the user has logged in with email "test@test.test" and password "test" 
        When user "user10" logs out using the webUI
        Then the user should be in the login page