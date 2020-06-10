
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

var apiKey = "66e71ddcf116ef131b637387ade6c4e2-us10"; //Here your API key from Mailchimp
var listID = "7378e95bfd"; //Here your list id

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
     res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
     var firstName = req.body.firstname;
     var lastName = req.body.lastname;
     var email = req.body.email;

     var data = {
          members: [
               {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                         FNAME: firstName,
                         LNAME: lastName
                    }
               }
          ]
     }

     var jsonData = JSON.stringify(data);

     var options = {
          url: "https://us20.api.mailchimp.com/3.0/lists/" + listID,
          method: "POST",
          headers: {
               "Authorization": "Darpan " + apiKey
          },
          body: jsonData
     }

     request(options, function (error, response, body) {
          if (error) {
               res.sendFile(__dirname + "/failure.html");
          } else {
               console.log(response.statusCode);
               if (response.statusCode === 200) {
                    res.sendFile(__dirname + "/success.html");
               } else {
                    res.sendFile(__dirname + "/failure.html");
               }
          }
     })
})

app.post("/failure", function (req, res) {
     res.redirect("/");
})

app.listen(3000, function () {
     console.log("Server is listening on port 3000");
})



// api key 66e71ddcf116ef131b637387ade6c4e2-us10
// id 7378e95bfd
// 66e71ddcf116ef131b637387ade6c4e2-us10