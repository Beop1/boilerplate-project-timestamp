// index.js
// where your node app starts

require("dotenv").config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/:date?", (req, res) => {

  if(req.params.date === null || req.params.date === ""){
    const datetime = new Date();
    const unix = datetime.getTime();
    const utc = datetime.toUTCString();
    return res.json({unix, utc});
  }
  
  const datetime = new Date(req.params.date);;

  if(isNaN(datetime)) {
    return res.status(400).json({ error: "Invalid Date" });
  }
  
  const unix = datetime.getTime();
  const utc = datetime.toUTCString();

  res.json({unix, utc});
});

//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
