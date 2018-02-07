(function() {
  module.exports = {
    SDK: {
      Client: require("./Client"),
      API: {
        Appointments: require("./api/Appointments"),
        Forms: require("./api/Forms"),
        Users: require("./api/Users")
      },
      Models: {
        Appointment: require("./models/Appointment"),
        Form: require("./models/Form"),
        Slot: require("./models/Slot"),
        User: require("./models/User")
      }
    }
  };

}).call(this);