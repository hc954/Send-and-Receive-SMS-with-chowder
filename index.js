const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const plivo = require('plivo');
const TelegramBot = require('node-telegram-bot-api');

// Environment Variables
const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID;
const TWILIO_API_KEY = process.env.API_KEY;
const TWILIO_API_SECRET = process.env.API_SECRET;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const PLIVO_AUTH_ID = process.env.PLIVO_AUTH_ID;
const PLIVO_AUTH_TOKEN = process.env.PLIVO_AUTH_TOKEN;
const DESTINATION_NUMBER = process.env.DESTINATION_NUMBER;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET);
const plivoClient = new plivo.Client(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});

telegramBot.on('message', (msg) => {
  const chatId = msg.chat.id;
  telegramBot.sendMessage(chatId, 'Received your message');
});

app.get('/send-sms', (req, res) => {
  res.send('SMS Sending Feature'); // Placeholder for SMS sending logic/page
});

app.get('/chat', (req, res) => {
  res.send('Chat with the bot'); // Placeholder for chat logic/page
});

app.get('/receive-otp', (req, res) => {
  res.sendFile(process.cwd() + '/receive_otp.php'); // Serve receive_otp logic
});

const app = express(); // Creates an app for your servers client

app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({ extended: true })); // Express modules / packages

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public')); // load the files that are in the public directory

const dashboardRoutes = require('./dashboard');
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');

const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.calls = new Map();
  client.idtosid = new Map();
  client.prefix = config.prefix;
  client.db = require("quick.db");
  client.chs = new Map();
  client.owners = config.owners
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

module.exports.bot = client;

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`server started on port ${PORT}`);
});

app.on('listening', () => {

})