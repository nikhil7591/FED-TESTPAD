let timer;
let running = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapResetBtn = document.getElementById('lapReset');
const lapsContainer = document.getElementById('laps');

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.innerText = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function handleStartStop() {
  if (running) {
    clearInterval(timer); // Stop the timer
    running = false;
    startStopBtn.innerText = 'Start'; // User Story 7
    startStopBtn.style.backgroundColor = 'green';
    lapResetBtn.innerText = 'Reset'; // User Story 8
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    running = true;
    startStopBtn.innerText = 'Stop'; // User Story 7
    startStopBtn.style.backgroundColor = 'red';
    lapResetBtn.innerText = 'Lap'; // Reset button back to Lap
  }
}

function handleLapReset() {
  if (running) {
    // User Story 6
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement('li');
    li.innerText = lapTime;
    lapsContainer.prepend(li);
  } else {
    // Reset functionality when timer is stopped
    clearInterval(timer);
    elapsedTime = 0;
    display.innerText = '00:00:00';
    lapsContainer.innerHTML = ''; // Clear lap times
    startStopBtn.innerText = 'Start';
    startStopBtn.style.backgroundColor = 'green';
    lapResetBtn.innerText = 'Lap';
  }
}

startStopBtn.addEventListener('click', handleStartStop);
lapResetBtn.addEventListener('click', handleLapReset);
