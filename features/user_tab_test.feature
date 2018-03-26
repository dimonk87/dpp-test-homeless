Feature: Test users tab
  As admin I should be able to:
  - create new users
  - edit created users
  - delete created or edited users

  Background:
    Given I am logged in

  @user @api @userCreate
  Scenario: Create new user
    When I open Add user form and fill in all field with valid date
    Then I should see created user
    And I delete created user with api

  @user @api @userEdit
  Scenario: Edit created user
    Given I have created user with api
    When I edit user name
    Then I should see edited user
    And I delete created user with api

  @user @api
  Scenario: Delete created user
    Given I have created user with api
    When I choose delete created user
    Then I shouldn't see deleted user