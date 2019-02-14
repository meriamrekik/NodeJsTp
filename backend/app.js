
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();


const port = 4000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

const server = http.createServer(app);

const config = require('./config/database');
mongoose.connect(config.database);
const io = socketIo(server);
const UserRouter = require('./routes/UserRouter');
const ConferenceRouter  = require('./routes/ConferenceRouter');

app.use('/user',UserRouter);


app.use('/conference',ConferenceRouter);
const getApiAndEmit = "TODO"

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4001, () => console.log(`Listening on port 4001`));


const ClientManager = require('./public/ClientManager')
const ChatroomManager = require('./public/ChatroomManager')
const makeHandlers = require('./public/hendlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', function (client) {
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetChatrooms,
      
      handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager)
  
    console.log('client connected...', client.id)
    clientManager.addClient(client)
  
    client.on('register', handleRegister)
  
    client.on('join', handleJoin)
  
    client.on('leave', handleLeave)
  
    client.on('message', handleMessage)
  
    client.on('chatrooms', handleGetChatrooms)
  
  
  client.on("disconnect", () => {
    console.log("Client disconnected");
  });

});

server.listen(4001, () => console.log('Listening on port 3000'));