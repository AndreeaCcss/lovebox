const https = require('https');
const result =  require('dotenv').config();
if (result.error) { throw result.error };
const url = "https://api-v3.loveboxlove.com/graphql";

let text = process.argv[2];
let words = text.split(" ");
function groupIntoLines(words) {
    let result = [];
    let line = words[0];
    if  (line.length > 21) {
        let nextLine = line.substring(0, 21);
        result.push(nextLine); 
        line = line.substring(21, 42);
    };
    for (i = 1; i < words.length; i++) {
        let word = words[i]; 
        if(spaceLength = 1, spaceLength + line.length + word.length <= 21) {
            line = line + " " + word;
        } else if (line.length > 21) {
                let nextLine = line.substr(0, 21);
                result.push(nextLine);
                line = line.substr(21, 21); 
                result.push(line);
                line = word;
        } else {
            result.push(line);
            if (word.length > 21) {
                let nextSecondLine = word.substr(0, 21);
                result.push(nextSecondLine);
                line = word.substr(21, 21); 
            } else {
                line = word;
            }
        };         
    };
    result.push(line);
    return result;
};
console.log(groupIntoLines(words));

const postData = JSON.stringify({
    "query": "mutation sendNewMessage($content: String!, $type: Int, $boxId: String!, $date: DateTime, $sendEmail: Boolean) { sendNewMessage(content: $content, boxId: $boxId, type: $type, date: $date, sendEmail: $sendEmail) { recipient } }",
    "variables": {
          "boxId": process.env.BOX_ID,
          "date": null,
          "content": `${groupIntoLines(words)}`,
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
    console.error(`Problem with request: ${e.message}`);
  });
req.write(postData);
req.end();
//must always call req.end() when using https.request
