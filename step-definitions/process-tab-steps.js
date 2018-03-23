module.exports = function () {

    var processName;
    var ownerName;
    var caseName;

    this.Given(/^I am logged in in app as admin$/, function () {
        processName = "Proccess" + Math.floor(Math.random()*1000);
        ownerName = "Owner" + Math.floor(Math.random()*100);
        caseName = "Rule" + Math.floor(Math.random()*100);
        return helpers.loadPage(shared.testData.url)
            .then(function () {
                return page.apiRequest.loginWithApi();
            }).then(function (token) {
                driver.executeScript(`localStorage.setItem('access_token', '${token}')`);
                driver.executeScript(`localStorage.setItem('user', '{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}')`);
                driver.executeScript(`localStorage.setItem('lang', 'en')`);
            })
    });

    //Create new processing point
    this.When(/^I field in all required fields$/, function () {
        helpers.loadPage(shared.testData.url + '/points')
            .then(function () {
                return page.processPage.addProcessingPoint(processName);
            })
            .then(function () {
                return page.processPage.addInterface();
            });
        return page.processPage.addCase(caseName);
    });
    this.When(/^I click button for create process$/, function () {
        return helpers.clickHiddenElement(page.processPage.buttons.addPoint);
    });
    this.Then(/^I should see created processing point$/, function () {
        driver.wait(until.elementLocated(by.id(page.processPage.buttons.createProcess)));
        page.loginPage.checkErrors(page.processPage.elements.lastProcessName, processName);
        return page.loginPage.checkErrors(page.processPage.elements.interfaceDirection, 'Receive');
    });
    this.Then(/^I delete created process with API$/, function () {
        return page.apiRequest.getIdUser('/api/comm-processes')
            .then(function (lastUserId) {
                var urlDelete = shared.testData.url + '/api/comm-processes/' + lastUserId;
                console.log(typeof urlDelete);
                return page.apiRequest.deleteCreatedUserWithApi(urlDelete);
            })
    });

    //Edit created processing poin
    this.When(/^I create new process with API$/, function () {
        return page.apiRequest.createProcessWithApi(processName, ownerName, caseName);
    });
    this.Then(/^I edit some info in process point$/, function () {
        helpers.loadPage(shared.testData.url + '/points');
        return page.processPage.editProcess(processName);
    });
    this.Then(/^I click button for save edited process$/, function () {
        helpers.clickHiddenElement((page.processPage.buttons.editPoint));
    });
    this.Then(/^I should see edit processing point$/, function () {
        driver.wait(until.elementLocated(by.id(page.processPage.buttons.createProcess)));
        page.loginPage.checkErrors(page.processPage.elements.lastProcessName, 'Change' + processName);
        return page.loginPage.checkErrors(page.processPage.elements.interfaceDirection, 'Receive');
    });

    //Copy created process
    this.Then(/^I push copy icon$/, function () {
        helpers.loadPage(shared.testData.url + '/points');
        driver.wait(until.elementLocated(by.css(page.processPage.buttons.copyProcess))).click();
        return driver.wait(until.elementLocated(by.id(page.processPage.fields.processName)));
    });

    this.Then(/^I should see copied process$/, function () {
        driver.wait(until.elementLocated(by.css(page.processPage.elements.spinner)));
        driver.wait(until.elementLocated(by.id(page.processPage.buttons.createProcess)));
        return page.loginPage.checkErrors(page.processPage.elements.lastProcessName, 'Copy of ' + processName);
    });

    //Delete created process
    this.When(/^I click on delete icon$/, function () {
        helpers.loadPage(shared.testData.url + '/points');
        return page.processPage.deleteCreatedProcess();
    });
    this.Then(/^I shouldn't see created process$/, function () {
        helpers.loadPage(shared.testData.url + '/points');
        driver.wait(until.elementLocated(by.css(page.processPage.elements.spinner)));
        driver.wait(until.elementLocated(by.id(page.processPage.buttons.createProcess)));
        return page.loginPage.checkExist(page.processPage.elements.lastProcessName, processName);
    });



}