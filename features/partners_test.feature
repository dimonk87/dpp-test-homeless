Feature: Test partners tab
  As admin I should be able to:
  - create new partners
  - edit created partners
  - copy created partners
  - delete created or edited partners

  Background:
    Given I am logged in in app

  @partner @api @createPartner
  Scenario: Create new partner
    When I open Add Partner form and fill in all field
    Then I should see created partner
    And I delete created partner with API

  @partner @api
  Scenario: Edit created partner
    Given I have created partner with API
    When I edit partner's info
    Then I should see edited partner with new data
    And I delete created partner with API

  @partner @api @copyPartner
  Scenario: Copy created partner
    Given I have created partner with API
    When I click copy and see Edit form
    Then I save changes
    And I should see copied partner
    And I delete created partner with API

  @partner @api
  Scenario: Delete created partner
    Given I have created partner with API
    When I choose delete created partner
    Then I shouldn't see deleted partner