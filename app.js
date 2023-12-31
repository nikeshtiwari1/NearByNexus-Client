const express = require("express");
const { initializeApp } = require('firebase/app');
const { getMessaging } = require('firebase/messaging');
const moment = require('moment');

const app = express();
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors');
var multer = require('multer');

require('@marvnet/express-dynamic-helpers-patch')(app);
const firebaseConfig = require("./config/firebaseConfig.js");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "fhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    userId : "",
    token : "",
    role : ""

}));
app.dynamicHelpers({
  userDetail: function(req, res){
    if(req.session && req.session.userId){
      return {userId: req.session.userId,role: req.session.role ?req.session.role : null};
  }
  }
});

const fireBaseapp = initializeApp(firebaseConfig);
// const messaging = getMessaging(fireBaseapp);

// Create an instance of the Firebase Messaging service// Handle incoming messages when the app is in the foreground
// messaging.onMessage((payload) => {
//   console.log("Received foreground message:", payload);
// });


app.use("/", router);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log("App us listining to port 3500");
});
