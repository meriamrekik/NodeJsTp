const Chatroom = require('./Chatroom')
const Conference = require('../models/conference')

module.exports = function () {
  // mapping of all available chatrooms
  const chatrooms = new Array(
    Conference.find(c => {
        if (c){
      c.map(x=> [x.nom,
      Chatroom(x)]);}
    })
  )

  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client))
  }

  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName)
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  }
}