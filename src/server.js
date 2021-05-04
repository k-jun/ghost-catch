const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./game.js');
const port = 3000

const game = new Game();
game.shuffle();

// static files
app.use(express.static('public'));

// websocket handler
io.on('connection', (socket) => {
  // player
  game.player_add(socket.id, "anonimous")
  game_update()
  socket.on("disconnect", (reason) => {
    game.player_remove(socket.id)
  });
  socket.on("player_update", (payload) => {
    game.player_update(socket.id, payload.name)
    game_update()
  });
  // game
  socket.on('next', (payload) => {
    game.next()
    game_update()
  })
  socket.on('answer', (payload) => {
    game.answer(socket.id, payload.answer)
    game_update()
  })
})

function game_update() {
  io.emit("game_update", game.json());
}

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
