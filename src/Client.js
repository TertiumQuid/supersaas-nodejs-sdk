(function() {
  const url = require("url");
  const http = require("http");
  const https = require("https");
  const querystring = require('querystring');
  const Appointments = require("./api/Appointments");
  const Forms = require("./api/Forms");
  const Users = require("./api/Users");

  var DEFAULT_HOST = 'http://localhost:3000';

  var Client = function Client(configuration) {
    this.accountName = configuration.accountName;
    this.userName = configuration.userName;
    this.password = configuration.password;
    this.host = configuration.host;
    this.test = configuration.test;

    this.last_request = null;

    this.appointments = new Appointments(this);
    this.forms = new Forms(this);
    this.users = new Users(this);
  }
  Client.API_VERSION = '1';
  Client.VERSION = '0.1.0';

  Client.prototype.request = function(httpMethod, path, params, query) {
    params = params || {};
    query = query || {};
    if (!this.accountName) {
      throw new Error("Account name not configured. Call `Client.configure`.");
    }
    if (!this.password) {
      throw new Error("Account password not configured. Call `Client.configure`.");
    }

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': this._userAgent(),
      'Authorization': 'Basic ' + new Buffer(this.accountName + ':' + this.password).toString('base64')
    }

    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(httpMethod)) {
      throw new Error("Invalid HTTP Method: " + httpMethod + ". Only `GET`, `POST`, `PUT`, `DELETE` supported.");
    }

    var parsedUrl = this.host + "/" + this.path;
    if (query) {
      parsedUrl += "?"  + querystring.stringify(query);
    }
    parsedUrl = url.parse(parsedUrl);
    var options = {
      method: httpMethod,
      hostname: parsedUrl.host,
      port: parsedUrl.port,
      path: path,
      headers: headers
    };
    var req = this._requestModule(parsedUrl).request(options, function(res) {
    })

    if (this.test) {
      return {};
    }
  }
  Client.prototype._requestModule = function(url) {
    return url.protocol === 'https' ? https : http
  }
  Client.prototype._userAgent = function() {
    return "SSS/" + Client.VERSION + " Node/" + process.version + " API/" + Client.API_VERSION;
  }

  var config = {
    accountName: process.env['SSS_SDK_ACCOUNT_NAME'],
    userName: process.env['SSS_SDK_USER_NAME'],
    password: process.env['SSS_SDK_PASSWORD'],
    host: DEFAULT_HOST,
    test: false
  }
  Client.Instance = new Client(config);
  Client.configure = function (configuration) {
    for (var key in config) {
      if (configuration[key]) {
        Client.Instance[key] = configuration[key]
      }
    }
  }

  module.exports = Client;
}).call(this);