var config         = require("./config/config");
var express        = require('express');
var morgan         = require('morgan');
var methodOverride = require("method-override");
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");

var app = express();

app.use(morgan("dev"));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database);

app.listen(config.port, function(){
  console.log("Express is alive and kicking on port: ", config.port);
});
