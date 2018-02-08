(function() {
  var validation  = require("./validation");
  var Appointment = require("../models/Appointment");

  module.exports = (function() {
    function Appointments(client) {
      this.client = client;
    }

    Appointments.prototype.agenda = function(scheduleId, userId, fromTime, slot) {
    }

    Appointments.prototype.available = function(scheduleId, fromTime, lengthMinutes, resource, full, limit) {
    }

    Appointments.prototype.get = function(scheduleId, appointmentId, form, startTime, limit) {
    }

    Appointments.prototype.create = function(scheduleId, userId, attributes, form, webhook) {
    }

    Appointments.prototype.update = function(scheduleId, appointmentId, attributes, webhook) {
    }

    Appointments.prototype.delete = function(appointmentId) {
    }

    Appointments.prototype.changes = function(scheduleId, fromRime, slot) {
    }



    return Appointments;
  })();

}).call(this);