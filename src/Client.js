(function() {
    Appointments = require("./api/Appointments");
    Forms = require("./api/Forms");
    Users = require("./api/Users");

    var Client = function Client() {
    }
    Client.API_VERSION = '1';
    Client.VERSION = '0.1.0';

    module.exports = Client;
}).call(this);