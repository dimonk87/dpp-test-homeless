Feature: Login page test
  As an admin I want to check login page
  I want to know abaut errors with incorrect logged in
  I should be able to sign in with valid date

  Background:
    Given I open sign in page


  Scenario: I see login page
    Then I should see title "LOGIN TO YOUR ACCOUNT"

    @logAsAdmin @loginPage
  Scenario: Logged in successfull as admin
    When I logged in on page
    Then I should see profile name "admin"

  @loginPage
  Scenario: Try to log in with empty fields
    When I don't fill in fields
    Then I shouldn't be able to click

  @loginPage
  Scenario: Check validation
    When I fill in fields with incorrect data
    Then I shoul see an error message "Incorrect password or e-mail entered. Please try again."

  @loginPage
  Scenario: Logged in successfull as manager
    When I logged in as a manager
    Then I should see profile name "manager"

  @loginPage
  Scenario:  Logged in successfull as viewer
    When I logged in as a viewer
    Then I should see profile name "viewer"