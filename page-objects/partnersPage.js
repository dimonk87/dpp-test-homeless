module.exports = {

    elements: {
        partnerNameField: 'input-name',
        partnerEmailField: 'input-email',
        partnerCompanyField: 'input-company',
        partnerPhoneField: 'input-phone',
        noteField: 'textarea[formcontrolname=note]',
        operationNumberField: 'input[formcontrolname="bn"]',
        institutionIdentifierField: 'input[formcontrolname=ik]',
        createPartnersButton: 'add-partner-button',
        addPartnerButton: '[aria-label="Add partner"]',
        editPartnerButton: '[aria-label="Edit partner"]',
        editPartnerIcon: 'mat-row:last-of-type [tabindex="0"]',
        copyPartnerIcon: 'mat-row:last-of-type button:first-of-type',
        deletePartnerIcon: 'mat-row:last-of-type button:last-of-type',
        deletePartnerFirstConfirm: 'mat-dialog-container button:first-of-type',
        deletePartnerSecondConfirm: 'fuse-delete-dialog-confirm .mat-button:first-of-type',
        lastPartnerName: 'mat-row:last-of-type .mat-column-name div',
        lastPartnerCompany: 'mat-row:last-of-type .mat-column-company div',
        lastPartnerEmail: 'mat-row:last-of-type .mat-column-email div',
        editFormTitle: 'form>div:first-of-type'
    },

    createNewPartner: function (partnerName, partnerEmail, partnerCompany) {
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.createPartnersButton))).click();
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.partnerNameField))).sendKeys(partnerName);
        driver.findElement(by.id(page.partnersPage.elements.partnerEmailField)).sendKeys(partnerEmail);
        driver.findElement(by.id(page.partnersPage.elements.partnerCompanyField)).sendKeys(partnerCompany);
        return driver.findElement(by.css(page.partnersPage.elements.addPartnerButton)).click();
    },
    
    editCreatedPartner: function (partnerName, partnerEmail, partnerCompany) {
        driver.wait(until.elementLocated(by.css(page.partnersPage.elements.editPartnerIcon))).click();
        driver.wait(until.elementLocated(by.id(page.partnersPage.elements.partnerNameField))).clear();
        driver.findElement(by.id(page.partnersPage.elements.partnerNameField)).sendKeys('Change' + partnerName);
        driver.findElement(by.id(page.partnersPage.elements.partnerEmailField)).clear();
        driver.findElement(by.id(page.partnersPage.elements.partnerEmailField)).sendKeys('new' + partnerEmail);
        driver.findElement(by.id(page.partnersPage.elements.partnerCompanyField)).clear();
        driver.findElement(by.id(page.partnersPage.elements.partnerCompanyField)).sendKeys('New' + partnerCompany);
        return driver.findElement(by.css(page.partnersPage.elements.editPartnerButton)).click();
    },

    deleteCreatedPartner: function () {
        driver.wait(until.elementLocated(by.css(page.partnersPage.elements.deletePartnerIcon))).click();
        return driver.wait(until.elementLocated(by.css(page.partnersPage.elements.deletePartnerFirstConfirm))).click()
            .then(function () {
                 return driver.wait(until.elementLocated(by.css('mat-spinner')));
            });
    }
    

};