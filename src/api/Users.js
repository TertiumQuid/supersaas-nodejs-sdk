(function() {
  var validation  = require("./validation");
  var User = require("../models/User");

  module.exports = (function() {
    function Users(client) {
      this.client = client;
    }

    Users.prototype.get = function(userId, form, limit, offset) {
    }

    Users.prototype.create = function(attributes, userId) {
    }

    Users.prototype.update = function(userId, attributes) {
    }

    Users.prototype.delete = function(userId) {
    }




    return Users;
  })();

}).call(this);