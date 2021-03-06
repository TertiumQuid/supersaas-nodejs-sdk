(function() {
  var validation  = require("./validation");
  var Appointment = require("../models/Appointment");

  module.exports = (function() {
    function mapSlotsOrBookings(obj, slot) {
      if (slot) {
        return (obj['slots'] || []).map (function(attributes) { new Slot(attributes) });
      } else {
        return (obj['bookings'] || []).map (function(attributes) { new Appointment(attributes) });
      }
    }

    function Appointments(client) {
      this.client = client;
    }

    Appointments.prototype.agenda = function(scheduleId, userId, fromTime, slot, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/agenda/" + validation.validateId(scheduleId);
      var query = {
        user: validation.validatePresent(userId),
        from: fromTime && fromTime !== callback ? validation.validateDatetime(fromTime) : null,
        slot: slot && slot !== callback ? true : null
      }
      return this.client.get(path, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          var res = mapSlotsOrBookings(data, slot);
          callback(null, res);
        }
      } : null);
    }

    Appointments.prototype.available = function(scheduleId, fromTime, lengthMinutes, resource, full, limit, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/free/" + validation.validateId(scheduleId);
      var query = {
        length: lengthMinutes ? validation.validateNumber(lengthMinutes) : null,
        from: fromTime && fromTime !== callback ? validation.validateDatetime(fromTime) : null,
        resource: resource && resource !== callback ? resource : null,
        full: full && full !== callback ? true : null,
        maxresults: limit && limit !== callback ? validation.validateNumber(limit) : null
      }
      return this.client.get(path, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          var res = mapSlotsOrBookings(data);
          callback(null, res);
        }
      } : null);
    }

    Appointments.prototype.list = function(scheduleId, form, startTime, limit, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/bookings";
      var query = {
        schedule_id: validation.validateId(scheduleId),
        form: form && form !== callback ? true : null,
        start: startTime && startTime !== callback ? validation.validateDatetime(startTime) : null,
        limit: limit && limit !== callback ? validation.validateNumber(limit) : null
      }
      return this.client.get(path, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          var res = mapSlotsOrBookings(data);
          callback(null, res);
        }
      } : null);
    }

    Appointments.prototype.get = function(scheduleId, appointmentId, callback) {
      var query = {schedule_id: validation.validateId(scheduleId)};
      var path = "/bookings/" + validation.validateId(appointmentId);
      return this.client.get(path, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          callback(null, new Appointment(data));
        }
      } : null);
    }

    Appointments.prototype.create = function(scheduleId, userId, attributes, form, webhook, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/bookings";
      var query = {webhook: webhook && webhook !== callback ? 'true' : null, schedule_id: scheduleId};
      var params = {
        schedule_id: validation.validateId(scheduleId),
        user_id: validation.validateId(userId),
        form: form ? true : nil,
        booking: {
          start: attributes['start'],
          finish: attributes['finish'],
          name: attributes['name'],
          email: attributes['email'],
          full_name: attributes['full_name'],
          address: attributes['address'],
          mobile: attributes['mobile'],
          phone: attributes['phone'],
          country: attributes['country'],
          field_1: attributes['field_1'],
          field_2: attributes['field_2'],
          field_1_r: attributes['field_1_r'],
          field_2_r: attributes['field_2_r'],
          super_field: attributes['super_field'],
          resource_id: attributes['resource_id'],
          slot_id: attributes['slot_id']
        }
      }
      return this.client.post(path, params, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          callback(null, new Appointment(params.booking));
        }
      } : null);
    }

    Appointments.prototype.update = function(scheduleId, appointmentId, attributes, form, webhook, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/bookings/" + validation.validateId(appointmentId);
      var query = {webhook: webhook && webhook !== callback ? 'true' : null};
      var params = {
        schedule_id: validation.validateId(scheduleId),
        form: form && form !== callback ? true : nil,
        booking: {
          start: attributes['start'],
          finish: attributes['finish'],
          name: attributes['name'],
          email: attributes['email'],
          full_name: attributes['full_name'],
          address: attributes['address'],
          mobile: attributes['mobile'],
          phone: attributes['phone'],
          country: attributes['country'],
          field_1: attributes['field_1'],
          field_2: attributes['field_2'],
          field_1_r: attributes['field_1_r'],
          field_2_r: attributes['field_2_r'],
          super_field: attributes['super_field'],
          resource_id: attributes['resource_id'],
          slot_id: attributes['slot_id']
        }
      }
      return this.client.put(path, params, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          callback(null, new Appointment(params.booking));
        }
      } : null);
    }

    Appointments.prototype.delete = function(appointmentId, callback) {
      var path = "/bookings/" + validation.validateId(appointmentId);
      return this.client.delete(path, null, null, callback);
    }

    Appointments.prototype.changes = function(scheduleId, fromTime, slot, callback) {
      callback = validation.getCallbackFunctionArg(arguments)
      var path = "/changes/" + validation.validateId(scheduleId);
      var query = {
        from: validation.validateDatetime(fromTime),
        slot: slot && slot !== callback ? true : null
      }
      return this.client.get(path, query, callback ? function(err, data) {
        if (err) {
          callback(err);
        } else {
          var res = mapSlotsOrBookings(data, slot);
          callback(null, res);
        }
      } : null);
    }

    return Appointments;
  })();

}).call(this);