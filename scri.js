function runningClock() {
    let timeNow = new Date();
    
    let hour = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let second = timeNow.getSeconds();
    let hour1 = (hour<10?'0':'')+hour;
    minutes = (minutes < 10 ? '0':'')+minutes;
    second = (second < 10 ? '0':'')+second;
    let timeNowStamp = `${hour1}:${minutes}:${second}`;
    const timeDiv = document.getElementById('clock');
    const amOrPm = (hour < 12) ?'AM':'PM';
    hour = (hour < 13)? hour: (hour - 12);
    timeDiv.innerHTML = `${hour}:${minutes}:${second} ${amOrPm}`;
    alarmChecker(timeNowStamp);
}

setInterval(runningClock, 1000);

const alarmsListElement = document.getElementById('alarms-list');
const theSetAlarmButton = document.getElementById('set-alarm-button');
theSetAlarmButton.addEventListener('click',() => {
    const theTimeInputField = document.getElementById('time-input');
    console.log(theTimeInputField.value);
    theSetAlarmButtonClick(theTimeInputField.value);

});
const theTimeNowDiv = document.getElementById('my-round-clock');
function alarmChecker(timeNow) {
    const allSpanValue = document.querySelectorAll('span');
    
    allSpanValue.forEach(sp => {
        console.log(sp.textContent);
        console.log(timeNow);
        if(sp.textContent == timeNow) {
            let audio = new Audio('gypsy-jazz-guitar-relaxing-acoustic-nylon-guitar-141860.mp3');
            audio.play();
            const stopAlarmButton = document.createElement('button');
            stopAlarmButton.classList.add('stop-button');
            stopAlarmButton.textContent = "I am awake";
            theTimeNowDiv.appendChild(stopAlarmButton);
            stopAlarmButton.addEventListener('click', () => {
                audio.pause();
                audio.currentTime = 0;
                stopAlarmButton.remove();
            });
        }
    });
}



function theSetAlarmButtonClick(timeInputFieldValue) {
    const noOfAlarms = alarmsListElement.querySelectorAll('div');
    if(noOfAlarms.length >= 5) {
        noOfAlarms[4].remove();
    }
    const newdiv = document.createElement('div');
    newdiv.classList.add('enclose-div');
    newdiv.textContent = 'Alarm';
    const theTimeText = document.createElement('span');
    theTimeText.textContent = timeInputFieldValue;
    theTimeText.classList.add('the-time-text');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        newdiv.remove();
    });
    newdiv.appendChild(theTimeText);
    newdiv.appendChild(removeButton);
    alarmsListElement.insertBefore(newdiv, alarmsListElement.firstChild);
}
