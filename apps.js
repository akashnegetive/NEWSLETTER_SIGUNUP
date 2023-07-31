const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
//const request = require('request');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  const firstName = req.body.FName;
  const lastName = req.body.LName;
  const email = req.body.Email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]

  };

  const jsonData = JSON.stringify(data)


  const url = "https://us10.api.mailchimp.com/3.0/lists/1414b7b1f8";

  const options = {
    method: "POST",
    auth: "akash:de1452780ecfe35211dfb5f070496042-us10"
  };

  const request = https.request(url,options,function(response){
   response.on("data",function(data){
     sub_data = JSON.parse(data);
     console.log(sub_data);
     if(response.statusCode !== 200){
       res.sendFile(__dirname+"/failure.html")
     }else{
       res.sendFile(__dirname+"/success.html")
     }
   });
 });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("login to server 3000");
});
