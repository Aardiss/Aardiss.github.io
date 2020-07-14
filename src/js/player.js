let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;

$().ready(function(){
    video = document.getElementById("yt-player");

    video.addEventListener('click', playStop);

    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
      playButtons[i].addEventListener('click', playStop);
    }

    let volumeControl = document.getElementById("volume");
    volumeControl.addEventListener('click', soundOff);

    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('onmousemove', setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.min = 0;
    durationControl.value = 0;

    soundControl = document.getElementById("volumeLevel");
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);
    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;

    video.addEventListener('ended', function () {
      $(".play-pic").toggleClass("play-pic--active");
      video.currentTime = 0;
      }, false);
    });

  
    function playStop() {
      $(".play-pic").toggleClass("play-pic--active");

      durationControl.max = video.duration;

      if (video.paused) {
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        $('.playback-mark').addClass('active')
              
      } else { 
        video.pause();
        clearInterval(intervalId);
        $('.playback-mark').removeClass('active')
      }
    }

    function stopInterval() {
      video.pause();
      clearInterval(intervalId);
    }

    function setVideoDuration() {
      if (video.paused) {
          video.play();
      } else {
          video.pause();
      }
      video.currentTime = durationControl.value;
      intervalId = setInterval(updateDuration,1000/66);
    }

    function updateDuration() {
      durationControl.value = video.currentTime;
    }

    function soundOff() {
      if (video.volume === 0) {
          video.volume = soundLevel;
          soundControl.value = soundLevel*10;
      } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
      }
    }

    function changeSoundVolume() {
      video.volume = soundControl.value/10;
    }