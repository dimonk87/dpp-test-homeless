var unirest = require('unirest');
var token;


module.exports = {



    loginWithApi: function () {
        return new Promise(function(resolve, reject) {
            unirest.post(shared.testData.url + '/api/auth/login')
                .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                .send({'email': shared.testData.userEmail, 'password': shared.testData.password})
                .end(function(response) {
                    token = response.body.access_token;
                    resolve(token);
                });
        })
    },
    
    getIdUser: function (apiUsers) {
        return new Promise(function (resolve, reject) {
            unirest.get(shared.testData.url + apiUsers)
                .header({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
                .end(function(response) {
                    resolve(response.body.data[response.body.data.length - 1].id);
                });
        })
    },

    deleteCreatedUserWithApi: function (url) {
        unirest.delete(url)
            .header({'Accept': shared.testData.accept, 'Content-Type': shared.testData.content, 'Authorization': 'Bearer ' + token})
            .end(function () {
                return console.log(url);
            });
    },
    
    createUserWithApi: function (userName, userEmail) {
        unirest.post(shared.testData.url + '/api/users')
            .header({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
            .send({'email': userEmail, 'isBlocked': false, 'name': userName, 'password': page.usersPage.userPassword, 'phone': page.usersPage.userPhone, 'role': 3})
            .end(function (response) {
                console.log(response.body);
                return response.data;
            })
    },

    createPartnerWithApi: function (partnerName, partnerEmail, partnerCompany) {
        unirest.post(shared.testData.url + '/api/partners')
            .header({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
            .send({'email': partnerEmail, 'name': partnerName, 'company': partnerCompany})
            .end(function (response) {
                console.log(response.body);
                return response.data;
            })
    },

    createProcessWithApi: function (processName, ownerName, caseName) {
        unirest.post(shared.testData.url + '/api/comm-processes')
            .header({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
            .send({"name": processName, "tags": "", "description": page.processPage.descriptionForProcess, "direction": 1, "interval": 2, "local_dir": "/necessitatibus/nostrum/quia", "email_subscribers": "thelador@gmail.com", "protocol": 1,
                "is_active": 0, "connection": {
                    "host": "test",
                    "port": 32034,
                    "user": "rmaggio",
                    "password": ">?^wNY.}a|>",
                    "is_passive_mode": 1,
                    "dir": "/at/necessitatibus/nostrum/quia",
                    "connection_method": 1,
                    "encryption": 4,
                },  "rule_sets": [
                    {
                        "name": caseName,
                        "satisfy_type": 1,
                        "error_mail_content": "ewe ewe ew ew",
                        "validation_rules": [
                            {
                                "type_id": 5,
                                "value": null
                            }
                        ],
                        "processing_rules": [
                            {
                                "type_id": 7,
                                "value": "none"
                            }
                        ]
                    }
                ]})
            .end(function (response) {
                console.log(response.body);
                return response.data;
            });
    }

};