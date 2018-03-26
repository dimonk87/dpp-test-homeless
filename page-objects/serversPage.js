module.exports = {

    elements: {
        addButton: 'add-credentials-button',
        addCommServerButton: '.ng-trigger-toggleInBottom button:first-of-type',
        addCommUserButton: '.ng-trigger-toggleInBottom button:last-of-type',
        serverTypeSelect: '#input-server',
        optionFTP: '[data-test="ftp"]',
        serverNameInput: 'input-name',
        serverPortInput: 'input-port',
        serverRootDir: 'input-root_dir',
        serverVhostInput: 'input-vhost',
        addNewServerButton: '[data-test="add_new_server"]',
        lastServerStatus: 'mat-accordion .mat-expansion-panel:last-of-type [data-test="status_of_server"]'
    },

    createNewFTPserver: function (serverName, serverPort, serverRootDir, serverVhost) {
        driver.wait(until.elementLocated(by.id(page.serversPage.elements.addButton))).click();
        driver.wait(until.elementLocated(by.css('.ng-trigger-toggleInBottom[style~="scale(1);"]'))).then(function () {
            driver.findElement(by.css(page.serversPage.elements.addCommServerButton)).click();
            driver.wait(until.elementLocated(by.css('mat-spinner')));
            helpers.clickHiddenElement(page.serversPage.elements.serverTypeSelect);
            return driver.wait(until.elementLocated(by.css('.mat-select-content'))).then(function () {
                return driver.findElement(by.css(page.serversPage.elements.optionFTP)).click();
            });
        });
        driver.findElement(by.id(page.serversPage.elements.serverNameInput)).sendKeys(serverName);
        driver.findElement(by.id(page.serversPage.elements.serverPortInput)).sendKeys(serverPort);
        driver.findElement(by.id(page.serversPage.elements.serverRootDir)).sendKeys(serverRootDir);
        driver.findElement(by.id(page.serversPage.elements.serverVhostInput)).sendKeys(serverVhost).then(function () {
            return driver.findElement(by.css(page.serversPage.elements.addNewServerButton)).click();
        });
        return driver.wait(until.elementLocated(by.css(page.serversPage.elements.lastServerStatus)));
    }
}