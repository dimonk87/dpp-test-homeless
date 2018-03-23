module.exports = {

    elements: {
        emailField: 'input-email',
        passwordField: "input-password",
        submitButton: "button.submit-button",
        firstUser: 'mat-row:first-of-type mat-cell:nth-of-type(2)',
        loginTitle: '.title',
        errorMessage: 'mat-error',
        profileName: '.user-button div span',
        logOutButton: '.user-button',
        processingTabLink: '[href="/points"]',
        firstProcess: 'mat-row:first-of-type .mat-column-name'
    },

    loginFunction: function (userEmail, userPassword) {
        driver.wait(until.elementLocated(by.id(page.loginPage.elements.emailField))).sendKeys(userEmail);
        driver.wait(until.elementLocated(by.id(page.loginPage.elements.passwordField))).sendKeys(userPassword);
        return driver.findElement(by.css(page.loginPage.elements.submitButton)).click();
    },

    checkErrors: function (selectElement, errorText) {
        return driver.wait(until.elementsLocated(by.css(selectElement))).then(function () {
            return helpers.getAttributeValue(selectElement, 'innerHTML');
        }).then((element)=>{
            expect(element).to.equal(errorText);
        });
    },

    checkExist: function (selectElement, errorText) {
        return driver.wait(until.elementsLocated(by.css(selectElement))).then(function () {
            return helpers.getAttributeValue(selectElement, 'innerHTML');
        }).then((element)=>{
            expect(element).to.not.equal(errorText);
        });
    }
};