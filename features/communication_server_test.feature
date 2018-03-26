Feature: Test Communication Server tab
  As admin I should be able to:
  - create new communication server and user for this server
  - delete created communication server and user for this server

  Background:
    Given I am logged in app as admin

    @serverCreate
  Scenario: Create new communication server
    When I open Add communication Server form and fill in required fields
    Then I should see new communication server with status