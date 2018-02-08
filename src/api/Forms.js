(function() {
  var validation  = require("./validation");
  var Form = require("../models/Form");

  module.exports = (function() {
    function Forms(client) {
      this.client = client;
    }

    Forms.prototype.get = function(formId) {
    }

    Forms.prototype.find = function(formId, fromTime) {
    }

    return Forms;
  })();

}).call(this);