Feature: Test processing points
  As admin I should be able to:
  - create new process
  - edit created process
  - copy created process
  - delete created or edited process

  Background:
    Given I am logged in in app as admin

  @process @processCreate
  Scenario: Create new processing point
    When I field in all required fields
    And I click button for create process
    Then I should see created processing point
    And I delete created process with API

  @process @processEdit
  Scenario: Edit created processing poin
    When I create new process with API
    Then I edit some info in process point
    And I click button for save edited process
    Then I should see edit processing point
    And I delete created process with API

  @process @processCopy
  Scenario: Copy created process
    When I create new process with API
    Then I push copy icon
    And I click button for save edited process
    Then I should see copied process
    And I delete created process with API

  @process @processDelete
  Scenario: Delete created process
    When I create new process with API
    And I click on delete icon
    Then I shouldn't see created process
