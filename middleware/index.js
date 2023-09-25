const express = require("express");
const app = express();
const morgan = require("morgan");

morgan("tiny");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path, res.statusCode);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS");
  next();
});

const verifyPassword = (req, res, next) => {
  const password = req.query.password;
  if (password === "chicken") {
    next();
  } else {
    res.send("SORRY YOU NEED A PASSWORD");
  }
};

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("Hello World");
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("woof woof");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "MY SECRET IS: Sometimes I wear headphones in public so I don't have to talk to anyone"
  );
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
