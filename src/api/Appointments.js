(function() {
  var validation  = require("./validation");
  var Appointment = require("../models/Appointment");

  module.exports = (function() {
    function Appointments(client) {
      this.client = client;
    }




    return Appointments;
  })();

}).call(this);