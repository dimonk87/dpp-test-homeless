module.exports = function () {

    var userName;
    var userEmail;

    // this.BeforeScenario(function () {
    //     userName = "user" + Date.now();
    //     userEmail = "mail" + Date.now() + "@mail.com";
    //     return helpers.loadPage(shared.testData.url)
    //         .then(function () {
    //            return page.apiRequest.loginWithApi();
    //     }).then(function (token) {
    //         driver.executeScript(`localStorage.setItem('access_token', '${token}')`);
    //         driver.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
    //     })
    // });

    this.Given(/^I am logged in$/, function () {
        userName = "user" + Date.now();
        userEmail = "mail" + Date.now() + "@mail.com";
        return helpers.loadPage(shared.testData.url)
            .then(function () {
                return page.apiRequest.loginWithApi();
            }).then(function (token) {
                driver.executeScript(`localStorage.setItem('access_token', '${token}')`);
                driver.executeScript(`localStorage.setItem('user', '{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}')`);
                driver.executeScript(`localStorage.setItem('lang', 'en')`);
            })
    });


    //Create new user
    this.When(/^I open Add user form and fill in all field with valid date$/, function () {
        helpers.loadPage(shared.testData.url + '/users');
        return page.usersPage.createNewUser(userName, userEmail);
    });
    this.Then(/^I should see created user$/, function () {
        driver.wait(until.elementLocated(by.css(page.usersPage.elements.addUserButton)));
        page.loginPage.checkErrors(page.usersPage.elements.lastUserName, ' ' + userName);
        return page.loginPage.checkErrors(page.usersPage.elements.lastUserRole, 'manager');
    });
    this.Then(/^I delete created user with api$/, function () {
        return page.apiRequest.getIdUser('/api/users')
            .then(function (lastUserId) {
                var urlDelete = shared.testData.url + '/api/users/' + lastUserId;
                return page.apiRequest.deleteCreatedUserWithApi(urlDelete);
            })
    });

    //Edit created user
    this.Given(/^I have created user with api$/, function () {
        return page.apiRequest.createUserWithApi(userName, userEmail);
    });
    this.When(/^I edit user name$/, function () {
        helpers.loadPage(shared.testData.url + '/users');
        driver.wait(until.elementLocated(by.css('mat-spinner')));
        return page.usersPage.editCreatedUser(userName);
    });
    this.Then(/^I should see edited user$/, function () {
        driver.wait(until.elementLocated(by.css(page.usersPage.elements.addUserButton)));
        page.loginPage.checkErrors(page.usersPage.elements.lastUserName, ' Change ' + userName);
        return page.loginPage.checkErrors(page.usersPage.elements.lastUserRole, 'auditor');
    });

    //Delete created user
    this.When(/^I choose delete created user$/, function () {
        helpers.loadPage(shared.testData.url + '/users');
        return page.usersPage.deleteCreatedUser();
    });
    this.Then(/^I shouldn't see deleted user$/, function () {
        helpers.loadPage(shared.testData.url + '/users');
        return page.loginPage.checkExist(page.usersPage.elements.lastUserName, ' ' + userName);
    });


};