function print(data) {
  const label = document.createElement('label');
  label.innerText = data;
  document.body.appendChild(label);
}

function newLine() {
  const br = document.createElement('br');
  document.body.appendChild(br);
}

const board_size = 8;


for (let row = 0; row < board_size; row++) {
  for (let col = 0; col < board_size; col++) {
    if ((row + col) % 2 === 0) {
      print('* ');
    } else {
      print('# ');
    }
  }
  newLine();
}
