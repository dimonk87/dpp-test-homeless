'use strict';

var chromedriver = require('chromedriver');
var selenium = require('selenium-webdriver');

module.exports = function() {

    var driver = new selenium.Builder().withCapabilities({
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
            //args: ['start-maximized']
            args: ['headless']
        },
        path: chromedriver.path
    }).build();

    driver.manage().window().maximize();
    return driver;
};
