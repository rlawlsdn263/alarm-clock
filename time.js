'use strict';

//시계
const time = document.querySelector('.alarm__time');
const audio = new Audio('files/ringtone.mp3');

function clock() {
    const date = new Date();
    const hours = String(date.getHours() % 12).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    
    time.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}

clock();
setInterval(clock ,1000);

//알람 설정하기
const input = document.querySelector('.alarm__set');
const inputHours = document.querySelector('.alarm__set .hours');
const inputMinutes = document.querySelector('.alarm__set .minutes');
const inputPeriod = document.querySelector('.alarm__set .period');

const button = document.querySelector('.alarm__btn button');
let onoff = true;

button.addEventListener('click', (e) => {
    e.preventDefault();
    if(onoff) {
        onoff = false;
        button.innerText = 'Stop Alarm';
        setAlarm();
    } else {
        onoff = true;
        button.innerText = 'Set Alarm';
        stopMusic();
    }
})

function setAlarm() {
        const savedHours = inputHours.value;
        const savedMinutes = inputMinutes.value;
        const savedPeriod = inputPeriod.value;
        const alarmTime = `${savedHours}:${savedMinutes} ${savedPeriod}`;
        const interval = setInterval(() => {
            const date = new Date();
            const hours = String(date.getHours() % 12).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
            const newTime = `${hours}:${minutes} ${ampm}`;
            if(alarmTime === newTime) {
                playMusic();
                clearInterval(interval);
            }
        },1000)
}

function playMusic() {
    audio.play();
}

function stopMusic() {
    audio.pause();
}
