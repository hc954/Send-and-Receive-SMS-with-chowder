const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const plivo = require('plivo');

// Environment Variables
const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_API_KEY = process.env.API_KEY;
const TWILIO_API_SECRET = process.env.API_SECRET;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const PLIVO_AUTH_ID = process.env.PLIVO_AUTH_ID;
const PLIVO_AUTH_TOKEN = process.env.PLIVO_AUTH_TOKEN;
const DESTINATION_NUMBER = process.env.DESTINATION_NUMBER;


const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET);
const plivoClient = new plivo.Client(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN);
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

// Function to send OTP via call using Twilio
function sendOTPCall(targetNumber, otp) {
  twilioClient.calls.create({
    url: 'http://your-server.com/otp-voice.xml', // XML file for OTP voice message
    to: targetNumber,
    from: TWILIO_NUMBER,
    twiml: `<Response><Say>Your OTP is ${otp}</Say></Response>`
  })
  .then(call => console.log(call.sid))
  .catch(error => console.error(error));
}

// Function to send a bot message via call using Plivo
function sendBotCall(targetNumber, message) {
  plivoClient.calls.create(
    TWILIO_NUMBER, // from number
    targetNumber,
    'http://your-server.com/bot-message.xml?message=' + encodeURIComponent(message)
  ).then((response) => {
    console.log('Status: ', response.message);
    console.log('API Response:\n', response);
  }).catch((err) => {
    console.error(err);
  });
}

// Example usage
const targetNumber = DESTINATION_NUMBER || 'TARGET_PHONE_NUMBER'; // Use environment variable if available
const otp = '123456';  // For illustration purposes.  Replace with actual OTP generation.
const botMessage = 'This is your bot message';

sendOTPCall(targetNumber, otp);
sendBotCall(targetNumber, botMessage);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});

app.on('listening', () => {

})