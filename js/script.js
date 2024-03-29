// set our variables
var time, alarm, currentH, currentM,
    activeAlarm = false,
    sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");

/*
  audio sound source: https://freesound.org/people/SieuAmThanh/sounds/397787/
*/

// loop alarm
sound.loop = true;

// define a function to display the current time
function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  // time = "1:00:00 AM";
  // watch for alarm
  if (time === alarm) {
    sound.play();
    
    // show snooze button
    snooze.className = "";
    groupTime.className= "";
  }
  setTimeout(displayTime, 1000);
}
displayTime();

// add option values relative towards time
function addMinSecVals(id) {
  var select = id;
  var min = 59;
  
  for (i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;
  
  for (i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);

// set and clear alarm
startstop.onclick = function() {
  // set the alarm
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    ampm.disabled = true;
    
    alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    // clear the alarm
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
    ampm.disabled = false;
    
    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";
    
    // hide snooze button
    snooze.className = "hide";
    groupTime.className = "hide";
    activeAlarm = false;
  }
};

// snooze for 5 minutes
snooze.onclick = function() {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    let addM =parseInt( timeAdd.value);
    
    if (currentM >= (60 - addM)) {
      let mt =   addM - (60 - parseInt(currentM));
      if (mt <= 9) {
        minutes.value = "0" + parseInt(currentM + addM);
      } else {
        minutes.value = mt;
      }
      hours.value = parseInt(currentH) + 1;

    } else {
      if (parseInt(currentM) + addM <= 9) {
        minutes.value = "0" + parseInt(currentM + addM);
      } else {
        minutes.value = parseInt(currentM) + addM;
      }
    }
    
    // hide snooze button
    snooze.className = "hide";
    groupTime.className = "hide"
    
    // now reset alarm
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};