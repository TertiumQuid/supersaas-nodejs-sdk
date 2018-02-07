(function() {

  var INTEGER_REGEX = new RegExp('\A[0-9]+\Z');
  var DATETIME_REGEX = /\A\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\Z/;

  module.exports = {
    validateId: function(value) {
      if (typeof value === "number") {
        return value;
      } else if (value && isNaN(value) && INTEGER_REGEX.test(value)) {
        return parseInt(value);
      } else {
        throw new Error("Invalid id parameter: " + value + ". Provide a integer value.");
      }
    },

    validateNumber: function(value) {
      return this.validateId(value)
    },

    validateOptions: function(value, options) {
      if (options.includes(value)) {
        return value;
      } else {
        throw new Error("Invalid option parameter: " + value + ". Must be one of " + options.join(', ') + ".")
      }
    },

    validateDatetime: function(value) {
      if (value && typeof value === "string" && DATETIME_REGEX.test(value)) {
        return value
      } else if (typeof value === "date") {
        return value.getFullYear() + "-" + value.getDate() + "-" + (value.getMonth() + 1) + " " + value.getHours() + ":" + value.getMinutes() + ":00"
      } else {
        throw new Error ("Invalid datetime parameter: #{value}. Provide a Time object or formatted 'YYYY-DD-MM HH:MM:SS' string.")
      }
    },

    validatePresent: function(value) {
      if (typeof value === "string" ? value.length : value ) {
        return value
      } else {
        throw new Error("Required parameter is missing.");
      }
    }
  }
}).call(this);
