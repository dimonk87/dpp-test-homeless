module.exports = function () {

    var partnerName;
    var partnerEmail;
    var partnerCompany;

    this.Given(/^I am logged in in app$/, function () {
        partnerName = "user" + Date.now();
        partnerEmail = "mail" + Date.now() + "@mail.com";
        partnerCompany = "LTD" + Math.floor(Math.random()*100);
        return helpers.loadPage(shared.testData.url)
            .then(function () {
                return page.apiRequest.loginWithApi();
            }).then(function (token) {
                driver.executeScript(`localStorage.setItem('access_token', '${token}')`);
                driver.executeScript(`localStorage.setItem('user', '{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}')`);
                driver.executeScript(`localStorage.setItem('lang', 'en')`);
            })
    });


    //Create new partner
    this.When(/^I open Add Partner form and fill in all field$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
        return page.partnersPage.createNewPartner(partnerName, partnerEmail, partnerCompany);
    });
    this.Then(/^I should see created partner$/, function () {
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.createPartnersButton)));
        page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerName, partnerName);
        page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerEmail, partnerEmail);
        return page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerCompany, partnerCompany);
    });
    this.Then(/^I delete created partner with API$/, function () {
        return page.apiRequest.getIdUser('/api/partners')
            .then(function (lastUserId) {
                var urlDelete = shared.testData.url + '/api/partners/' + lastUserId;
                return page.apiRequest.deleteCreatedUserWithApi(urlDelete);
            })
    });

    //Edit created partner
    this.Given(/^I have created partner with API$/, function () {
        return page.apiRequest.createPartnerWithApi(partnerName, partnerEmail, partnerCompany);
    });
    this.When(/^I edit partner's info$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
        driver.wait(until.elementLocated(by.css('mat-spinner')));
        return page.partnersPage.editCreatedPartner(partnerName, partnerEmail, partnerCompany);
    });
    this.Then(/^I should see edited partner with new data$/, function () {
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.createPartnersButton)));
        page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerName, 'Change' + partnerName);
        page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerEmail, 'new' + partnerEmail);
        return page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerCompany, 'New' + partnerCompany);
    });

    //Copy created partner
    this.When(/^I click copy and see Edit form$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
        driver.wait(until.elementLocated(by.css(page.partnersPage.elements.copyPartnerIcon))).click();
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.partnerNameField)));
        return page.loginPage.checkErrors(page.partnersPage.elements.editFormTitle, 'Partner');
    });
    this.Then(/^I save changes$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
    });
    this.Then(/^I should see copied partner$/, function () {
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.createPartnersButton)));
        return page.loginPage.checkErrors(page.partnersPage.elements.lastPartnerCompany, 'Copy of ' + partnerCompany);
    });

    //Delete created partner
    this.When(/^I choose delete created partner$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
        return page.partnersPage.deleteCreatedPartner();
    });
    this.Then(/^I shouldn't see deleted partner$/, function () {
        helpers.loadPage(shared.testData.url + '/partners');
        return page.loginPage.checkExist(page.partnersPage.elements.lastPartnerName, ' ' + partnerName);
    });



}