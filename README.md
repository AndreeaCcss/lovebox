# lovebox 
Node HTTPS Client

## Getting started
The Lovebox is a device that incorporates a messanger. It is used through a mobile app that allows to send messages to that device.
The Lovebox has an input field that consists of 168 total characters, organized in blocks of 21 characters and 8 lines.

This Node https client connects to the Lovebox server using a POST request in order to send messages directly from the terminal, without using the mobile app. 

### Usage
In order to connect to the server, a box id and a key are needed. These are unique for each user and are stored in an .env file in this project.
The message is defined and sent using the command line in your terminal, like so:
```
node lovebox.js "Insert message here"
```
