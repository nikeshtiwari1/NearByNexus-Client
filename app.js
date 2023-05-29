const express = require("express");

const app = express();
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    username : "",
    userType : ""

}));
app.use("/", router);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(3500, () => {
  console.log("App us listining to port 3500");
});
