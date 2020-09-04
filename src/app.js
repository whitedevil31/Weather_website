const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("../public/utils/geocode");

const forecast = require("../public/utils/forecast");
const direcname = path.join(__dirname, "../public");
const pathname = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", pathname);
hbs.registerPartials(partials);
app.use(express.static(direcname));
app.get("", (req, res) => {
  res.render("index", { title: "Weather", worksat: "facebook" });
});
0;
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Nanda" });
});
app.get("/help", (req, res) => {
  res.render("help", { name: "nanda", title: "Help" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you mmust provide  address !" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Page not found ",
    name: "Nanda ",
    title: "Error",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found ",
    name: "Nanda ",
    title: "Error",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
