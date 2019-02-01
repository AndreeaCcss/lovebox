const https = require('https');

const result =  require('dotenv').config();

if (result.error) { throw result.error };

const url = "https://api-v3.loveboxlove.com/graphql";

var text  = process.argv[2];

const postData = JSON.stringify({
    "query": "mutation sendNewMessage($content: String!, $type: Int, $boxId: String!, $date: DateTime, $sendEmail: Boolean) { sendNewMessage(content: $content, boxId: $boxId, type: $type, date: $date, sendEmail: $sendEmail) { recipient } }",
    "variables": {
          "boxId": process.env.BOX_ID,
          "date": null,
          "content": ` ${text}`,
          "type": 1,
          "sendEmail": false
        },
    "operationName": "sendNewMessage"
  });

const options = {
    method: 'POST',
    headers: {
        'Content-Length': postData.length,
        'Content-Type': 'application/json',
        'Authorization': process.env.API_KEY
        
        }
};

const req = https.request(url, options, (res) =>{
    res.read();
    console.log(`oh well: ${res.statusCode}`);
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
req.write(postData);
req.end();



//must always call req.end() when using https.request
