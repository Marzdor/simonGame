import $ from "jquery";
import {
  Howler
} from 'howler';

// TODO: fix tempFix
const GAMEDATA = {
  on: false,
  turns: 0,
  state: 0,
  sequence: ["tempFix"],
  playerSequence: ["tempFix"]
};

const COLORDATA = {
  green: {
    name: "#green",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound1.mp3"]
    })
  },
  red: {
    name: "#red",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound2.mp3"]
    })
  },
  yellow: {
    name: "#yellow",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound3.mp3"]
    })
  },
  blue: {
    name: "#blue",
    sound: new Howl({
      src: ["../../assets/sounds/simonSound4.mp3"]
    })
  }
};


$(document).ready(function() {
  $(".btn_menu-onOff-slider").on("click", powerOnOff);
  $("#startBtn").on("click", game);
  $(".btn_play").on("click", getPlayerInput);

});

function game() {
  if (GAMEDATA.on) {
    if (GAMEDATA.state === 0) {
      GAMEDATA.turns++;
      let countDisplay = GAMEDATA.turns;
      if (GAMEDATA.turns < 10) {
        countDisplay = "0" + GAMEDATA.turns;
      }
      $("#count").text(countDisplay);

      GAMEDATA.playerSequence = ["tempFix"];
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

      setTimeout(function() {
        GAMEDATA.state = 1;
      }, 1000 * GAMEDATA.sequence.length + 1);
    }
  }
}

function getPlayerInput() {
  if (GAMEDATA.state === 1) {

    let $btnPressed = $(this);
    let btnColor = $(this).attr("id");
    GAMEDATA.playerSequence.push(btnColor);

    let className = "btn_play-" + btnColor + "-light";
    $btnPressed.toggleClass(className);
    COLORDATA[btnColor].sound.play();

    setTimeout(function() {
      $btnPressed.toggleClass(className);
    }, 100);

    if (compareSequences()) {
      incorrectSequence();
    } else if (GAMEDATA.playerSequence.length === GAMEDATA.sequence.length) {
      GAMEDATA.state = 0;
      game();
    }
  }
}

function playSequence() {
  GAMEDATA.sequence.forEach((seq, index) => {
    setTimeout(function() {
      let className = "btn_play-" + seq + "-light";
      $(COLORDATA[seq].name).toggleClass(className);
      COLORDATA[seq].sound.play();

      setTimeout(function() {
        $(COLORDATA[seq].name).toggleClass(className);
      }, 100 * index + 1);
    }, 1000 * index + 1);
  });
}

function compareSequences() {
  let len = GAMEDATA.playerSequence.length - 1;
  let seq = GAMEDATA.sequence[len];
  let pSeq = GAMEDATA.playerSequence[len];

  return seq !== pSeq;
}

function incorrectSequence() {
  let strict = $(".btn_menu-strict-slider").prop("checked");
  if (strict) {
    $("#count").text("00");
    gameReset();
    GAMEDATA.state = 0;
    game();
  } else {
    GAMEDATA.playerSequence = ["tempFix"];
    playSequence();
  }
}

function gameReset() {
  GAMEDATA.sequence = ["tempFix"];
  GAMEDATA.turns = 0;
  GAMEDATA.state = 0;
}

function powerOnOff() {
  if (!(GAMEDATA.on)) {
    let countDisplay = GAMEDATA.turns;
    if (GAMEDATA.turns < 10) {
      countDisplay = "0" + GAMEDATA.turns;
    }

    $("#count").text(countDisplay);
    GAMEDATA.on = true;
  } else if (GAMEDATA.state === 1) {
    $("#count").text("--");
    gameReset();
    GAMEDATA.on = false;
  }
}