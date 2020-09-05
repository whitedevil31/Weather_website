const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c49bfd08efb572ab3a79e5709d91a06c&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "Weather:" +
          body.current.weather_descriptions[0] +
          " " +
          "outside and the temperature is around " +
          body.current.temperature +
          "F." +
          "<br>" +
          "<br>" +
          "The average wind speed is " +
          body.current.wind_speed +
          "m/hr" +
          " and humidity is nearly " +
          body.current.humidity +
          "%." +
          "<br>" +
          "<br>" +
          "TimeZone:" +
          " " +
          body.location.timezone_id +
          "." +
          "<br>" +
          "<br>" +
          "Time of the report:" +
          " " +
          body.location.localtime +
          "."
      );
    }
  });
};

module.exports = forecast;
