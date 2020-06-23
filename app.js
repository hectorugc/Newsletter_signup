const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function (req,res) {
res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const mail = req.body.email;

  var data = {
    members: [
      {
        email_address:mail,
        status:"subscribed",
        merge_field:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us10.api.mailchimp.com/3.0/lists/ba1f0f5f4d';

  const options = {
    method:"POST",
    auth:"hector:d4b9d25ac64ca33dd0598f447670ebed-us10"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/succes.html")
    } else{
      res.sendFile(__dirname + "/failure.html")
    }


    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  // request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3001,function(){
  console.log("port 3001");
});



// api key
// d4b9d25ac64ca33dd0598f447670ebed-us10
