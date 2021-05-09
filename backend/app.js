const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const usersRouter = require("./routes/user");
const fileRouter = require("./routes/file");
const bikeRouter = require("./routes/bike");

const app = express();

app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session settings
app.use(
  session({
    secret: "jIPEyvTVBGPu7vfA",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      //secure: true,
      maxAge: 1000 * 60 * 15, //session expires in 15 minutes
    },
  })
);

// Allow crossed domain requests
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api/user", usersRouter);
app.use("/api/file", fileRouter);
app.use("/api/bike", bikeRouter);

module.exports = app;
