const express = require('express')
const bodyParser = require('body-parser');

//Environment Variables
const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_API_KEY = process.env.API_KEY;
const TWILIO_API_SECRET = process.env.API_SECRET;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER
const DESTINATION_NUMBER = process.env.DESTINATION_NUMBER

const client = require('twilio')(TWILIO_API_KEY, TWILIO_API_SECRET, { accountSid: TWILIO_ACCOUNT_SID });
const MessagingResponse = require('twilio').twiml.MessagingResponse;



const app = express(); // Creates an app for your servers client

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({ extended: true })); // Express modules / packages

app.use(express.static('public')); // load the files that are in the public directory

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/sms-response', (req, res) => {
  console.log('receiving message')
  const twiml = new MessagingResponse();
  twiml.message(`You just sent ${req.body.Body} to the Twilio API.`);
  res.send(twiml.toString());
})

app.listen(3000, () => {
  console.log('server started. sending initial SMS')
  client.messages
      .create({body: 'Hello, world!', from: TWILIO_NUMBER, to: DESTINATION_NUMBER})
      .then(message => console.log(message.sid));
});

app.on('listening', () => {
  
})
