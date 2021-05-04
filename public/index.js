let socket = io();

// name change
document.getElementById('player_update').addEventListener("change", event => {
    let newName = event.target.value
    socket.emit('player_update', { name: newName })
});

// next
document.getElementById('next').addEventListener("click", () => {
    socket.emit('next', {})
});

// answer_button
let buttons = document.getElementsByClassName('answer_button')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", event => {
        socket.emit('answer', { type: 'button', answer: event.target.value })
    });
}

// answer_input
document.getElementById('answer_input').addEventListener("keydown", event => {
    let k = event.key
    if (k == 'i' || k == 'o' || k == 'n' || k == 'h' || k == 'b') {
        socket.emit('answer', { type: 'input', answer: k })
    }
});

// game_update
socket.on('game_update', payload => {
    // image_update
    let image_html = document.getElementById('image')
    image_html.setAttribute("src", `/img/${payload.card}.jpg`)

    // players_update
    let players_html = document.getElementById('player_list')
    let first_row = '<th>name</th>';
    let second_row = '<th>point</th>';
    payload.players.forEach(({name, point}) => {
        first_row += `<th>${name}</th>`
        second_row += `<th>${point}</th>`
    })
    let table = wrap_with_table(wrap_with_tr(first_row) + wrap_with_tr(second_row))
    players_html.innerHTML = table
})

function wrap_with_tr(inner) {
    return '<tr>' + inner + '</tr>'
}

function wrap_with_table(inner) {
    return '<table rules="all">' + inner + '</table>'
}
