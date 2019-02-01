const axios = require('axios');

const result =  require('dotenv').config();

if (result.error) { throw result.error };

var text =  process.argv[2];

axios.post('https://api-v3.loveboxlove.com/graphql', {
  query: "mutation sendNewMessage($content: String!, $type: Int, $boxId: String!, $date: DateTime, $sendEmail: Boolean) { sendNewMessage(content: $content, boxId: $boxId, type: $type, date: $date, sendEmail: $sendEmail) { recipient } }",
  variables: {
    boxId: process.env.BOX_ID,
    date: null,
    content: `${text}`,
    type: 1,
    sendEmail: false
    },
  operationName: "sendNewMessage",
}, {
  headers: {Authorization : process.env.API_KEY,
            "Content-Type": "application/json; charset=utf-8"
  }
})
.then((res) => {
  console.log(`statusCode: ${res.status}`)
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
})
