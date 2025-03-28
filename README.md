# Twilio Video Conference

This code sends an outbound SMS to a number of your choice with the [SMS API](https://www.twilio.com/docs/sms). It then uses (TwiML (Twilio Markup Language))[https://www.twilio.com/docs/messaging/twiml] to send a response to any inbound messages.

## Pre-requisites

### Configured Twilio Number
You'll need to [have a Twilio Phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console) in your region.

Once you have a Twilio number, you'll need to go to the number in the Twilio console Phone Numbers page and configure the inbound messaging webhook with your Replit URL + `/sms-response`. This URL will appear on the landing page when you run your Express server.

For some parts of the world, it may take a while to get a phone number. In this case, we recommend testing this app using the [Twilio Dev Phone](https://www.twilio.com/docs/labs/dev-phone) (requires using another Twilio number).

### Environment variables

You'll need to set some secrets in Replit to keep the application secure. Remember, you should NEVER publish your account credentials, and you should remove them from this application when you're finished testing so that others can't use your Twilio credit.

You'll need to set the following secrets:

| Variable      | Description                                                                       | Required |
| :------------ | :-------------------------------------------------------------------------------- | :------- |
| `ACCOUNT_SID` | Find in the [console](https://www.twilio.com/console)                             | Yes      |
| `API_KEY`     | Twilio API Key. Create one here (https://www.twilio.com/console/runtime/api-keys) | Yes      |
| `API_SECRET`  | Twilio API Secret corresponding to your API Key                                   | Yes      |
| `DESTINATION_NUMBER` | The number to which a message will be sent. | Yes |
| `TWILIO_NUMBER` | A Twilio phone number that is owned by the previously declared Account SID. Used as the `from` number. | Yes |