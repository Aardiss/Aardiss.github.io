let  player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      player.pauseVideo();
    } else {
      playerContainer.addClass("paused");
      player.playVideo();
    }
  });
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);
  
  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  
  return `${minutes} : ${seconds}`;
 };

 const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  
  $(".player__duration-estimate").text(formatTime(durationSec));
  
  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
  
  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
  
    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
 };

function onYouTubeIframeAPIReady() {
  player = new YT.Player('YT', {
    height: '405',
    width: '940',
    videoId: 'LXb3EKWsInQ',
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    },
      playerVars: {
      controls:0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    }
  });
}

eventsInit();