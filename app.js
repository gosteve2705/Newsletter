//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const request =  require('request');
const https = require('https');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/signUp.html');
});


app.post('/', function(req,res){
   const email=  req.body.email;
   const firstName=  req.body.firstName;
   const lastName=  req.body.lastName;


const data = {
  members: [
    {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = 'https://us10.api.mailchimp.com/3.0/lists/8681556c91';
const options = {
  method: 'POST',
  auth: 'steve:b55099c05b97814f9426a5f2362ab788-us10'
};

const request =  https.request(url,options, function(response){
  if (response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html');
  }
  else{
    res.sendFile(__dirname + '/failure.html');
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();



} );

app.post('/failure',function(req,res){
  res.redirect('/');
});



app.listen(process.env.PORT || 3000, function (){
  console.log('server is up and running on port 3000');
});
