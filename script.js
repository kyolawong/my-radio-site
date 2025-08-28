// script.js - lightweight player logic


function highlightActive(){
document.querySelectorAll('.station').forEach(el => el.classList.remove('active'));
// find the .station with matching URL and add .active
document.querySelectorAll('.station').forEach(el => {
if(el.querySelector('.url') && el.querySelector('.url').textContent === (currentStation && currentStation.url)){
el.classList.add('active');
}
});
}


// Timer logic
function startTimer(){
clearInterval(timerInterval);
playStart = Date.now() - (elapsedBefore * 1000);
timerInterval = setInterval(()=>{
const elapsed = Math.floor((Date.now() - playStart) / 1000);
timerEl.textContent = '⏱ ' + formatTime(elapsed);
}, 500);
}


function pauseTimer(){
if(playStart) elapsedBefore = Math.floor((Date.now() - playStart) / 1000);
clearInterval(timerInterval);
}


player.addEventListener('play', () => {
startTimer();
});
player.addEventListener('pause', () => {
pauseTimer();
});
player.addEventListener('error', (e) => {
console.error('Audio error', e);
alert('Audio error: this stream may not be playable from a static site (CORS or unsupported format).');
});


// Sleep timer (auto-stop)
setSleepBtn.onclick = () => {
const mins = parseInt(sleepMinEl.value, 10);
if(!mins || mins <= 0){ alert('Enter minutes for sleep timer'); return; }
if(sleepTimeout) clearTimeout(sleepTimeout);
sleepTimeout = setTimeout(()=>{
player.pause();
alert('Sleep timer: stopped playback.');
}, mins * 60 * 1000);
alert(`Sleep set for ${mins} minute(s)`);
};
cancelSleepBtn.onclick = () => {
if(sleepTimeout) { clearTimeout(sleepTimeout); sleepTimeout = null; alert('Sleep timer canceled'); }
};


// Favs
function toggleFavorite(url){
if(favorites.includes(url)){
favorites = favorites.filter(u=>u!==url);
}else{
favorites.push(url);
}
localStorage.setItem('myRadio_favorites', JSON.stringify(favorites));
}
