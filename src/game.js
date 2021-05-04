

module.exports = class Game {
  constructor() {
    let cards = [];
    for (let i = 1; i <= 60; i++) {
      cards.push(i);
    }
    this.cards = cards
    this.index = 0
    this.players = {}
    this.done = false;
  }

  player_add(id, name) {
    this.players[id] = new Player(id, name)
  }

  player_remove(id) {
    delete this.players[id];
  }

  player_update(id, name) {
    this.players[id].name = name
  }

  next() {
    if (this.done) {
      this.index += 1;
      this.done = false;
    }
  }

  answer(id, answer, type) {
    if (this.done) {
      return;
    }

    let card = this.cards[this.index] - 1;
    let r = card % 12;
    let d = Math.floor(card / 12);
    let ok = false;
    let v = ['i', 'o', 'n', 'b', 'h'];
    if (v[d] == answer) {
      if ((d <= 3 && r <= 6 || d == 4 && r <= 7) && type == 'button') {
        ok = true;
      }
      if ((d <= 3 && r > 6 || d == 4 && r > 7) && type == 'input') {
        ok = true;
      }
    }

    if (ok) {
      this.done = true;
      this.players[id].increment_point();
    }
  }

  shuffle() {
    var j, x, i;
    for (i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }

  json() {
    let players = [];
    Object.keys(this.players).forEach(key => {
      players.push({
        name: this.players[key].name,
        point: this.players[key].point,
      })
    })
    return {
      card: this.cards[this.index],
      players: players,
    }

  }
}


class Player {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.point = 0
  }

  set_name(name) {
    this.name = name
  }

  increment_point() {
    this.point += 1;
  }
}
