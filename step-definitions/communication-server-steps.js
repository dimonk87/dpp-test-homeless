module.exports = function () {
    var serverName;
    var serverPort;
    var serverRootDir;
    var serverVhost;

    this.Given(/^I am logged in app as admin$/, function () {
        serverName = "FTP server" + Math.floor(Math.random()*1000);
        serverPort = Math.floor(Math.random()*10000);
        serverRootDir = "/home";
        serverVhost = "192.168.0." + Math.floor(Math.random()*1000);
        return helpers.loadPage(shared.testData.url)
            .then(function () {
                return page.apiRequest.loginWithApi();
            }).then(function (token) {
                driver.executeScript(`localStorage.setItem('access_token', '${token}')`);
                driver.executeScript(`localStorage.setItem('user', '{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}')`);
                driver.executeScript(`localStorage.setItem('lang', 'en')`);
            })
    });

    //Create new communication server
    this.When(/^I open Add communication Server form and fill in required fields$/, function () {
        helpers.loadPage(shared.testData.url + '/credentials');
        return page.serversPage.createNewFTPserver(serverName, serverPort, serverRootDir, serverVhost);
    });
    this.Then(/^I should see new communication server with status$/, function () {
        //driver.wait(until.elementLocated(by.css(page.serversPage.elements.lastServerStatus)));
        return page.loginPage.checkErrors(page.serversPage.elements.lastServerStatus, 'Processing');
    });

}