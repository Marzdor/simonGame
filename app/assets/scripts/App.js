import $ from "jquery";
import {
  Howler
} from 'howler';
const GAMEDATA = {
  on: false,
  turns: 0,
  state: 0,
  sequence: []
};

const COLORDATA = {
  green: {
    name: ".btn_play-green",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound1.mp3"]
    }),
    normal: "#00a74a",
    highlight: "#08c95e",
  },
  red: {
    name: ".btn_play-red",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound2.mp3"]
    }),
    normal: "#9f0f17",
    highlight: "#e01e29"
  },
  yellow: {
    name: ".btn_play-yellow",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound3.mp3"]
    }),
    normal: "#fcd000",
    highlight: "#ffe154"
  },
  blue: {
    name: ".btn_play-blue",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound4.mp3"]
    }),
    normal: "#094a8f",
    highlight: "#0c5db3"
  }
};


$(document).ready(function() {
  $(".btn_menu-onOff-slider").on("click", powerOnOff);
  $("#startBtn").on("click", gameLoop);
});

function gameLoop() {
  if (GAMEDATA.on) {
    for (let i = 1; i <= 5; i++) {
      let randomNum = Math.floor(Math.random() * 4);

      switch (randomNum) {
        case 0:
          GAMEDATA.sequence.push("green");
          break;
        case 1:
          GAMEDATA.sequence.push("red");
          break;
        case 2:
          GAMEDATA.sequence.push("yellow");
          break;
        case 3:
          GAMEDATA.sequence.push("blue");
          break;
      }

      playSequence();
      console.log(i);
    }
  }
}

function playSequence() {
  console.log(GAMEDATA.sequence);
  GAMEDATA.sequence.forEach((seq, index) => {
    setTimeout(function() {
      console.log(COLORDATA[seq].name);
      $(COLORDATA[seq].name).css("background", COLORDATA[seq].highlight);
      COLORDATA[seq].sound.play();

      setTimeout(function() {
        $(COLORDATA[seq].name).css("background", COLORDATA[seq].normal);
      }, 100 * index + 1);
    }, 1000 * index + 1);
  });
}

function powerOnOff() {
  if (!(GAMEDATA.on)) {
    let countDisplay = GAMEDATA.turns;
    if (GAMEDATA.turns < 10) {
      countDisplay = "0" + GAMEDATA.turns;
    }

    $("#count").text(countDisplay);
    GAMEDATA.on = true;
  } else {
    $("#count").text("--");
    GAMEDATA.on = false;
  }
}