var fs = require('fs');
fs.unlink('./node_modules/selenium-cucumber-js/runtime/chromeDriver.js', function (err) {
    fs.readFile('./chromeDriver.js', function(err, data) {
        fs.appendFile('./node_modules/selenium-cucumber-js/runtime/chromeDriver.js', data, function (err) {
            console.log('Prepare is finished!');
        });
    });
});
