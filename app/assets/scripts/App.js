import $ from "jquery";
import {
  Howler
} from 'howler';

// TODO: fix tempFix
const GAMEDATA = {
  on: false,
  maxTurns: 6,
  turns: 0,
  state: 0,
  won: false,
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
  console.log(GAMEDATA.state);
  if (GAMEDATA.on) {
    if (GAMEDATA.state === 0) {
      if (GAMEDATA.won) {
        gameReset();
        setCountDisply();
        GAMEDATA.won = false;
      }
      GAMEDATA.turns++;
      setCountDisply();
      GAMEDATA.state = 2;
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
      GAMEDATA.state = 0;
      incorrectSequence();
    } else if (GAMEDATA.playerSequence.length === GAMEDATA.sequence.length) {
      if (GAMEDATA.sequence.length === GAMEDATA.maxTurns) {
        GAMEDATA.state = 0;
        win();
      } else {
        GAMEDATA.state = 0;
        game();
      }
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
    $("#count").text("!!");
    setTimeout(function() {
      gameReset();
      setCountDisply();
      game();
    }, 1000);
  } else {
    GAMEDATA.playerSequence = ["tempFix"];
    $("#count").text("!!");
    setTimeout(function() {
      setCountDisply();
      playSequence();
    }, 1000);
    GAMEDATA.state = 1;
  }
}

function gameReset() {
  GAMEDATA.sequence = ["tempFix"];
  GAMEDATA.turns = 0;
  GAMEDATA.state = 0;
}

function setCountDisply() {
  let countDisplay = GAMEDATA.turns;
  if (GAMEDATA.turns < 10) {
    countDisplay = "0" + GAMEDATA.turns;
  }
  $("#count").text(countDisplay);
}

function win() {
  $("#count").text("**");
  let len = GAMEDATA.sequence.length - 1;
  let lastOfSeq = GAMEDATA.sequence[len];
  for (let i = 0; i < 5; i++) {
    if (i > 1) {
      setTimeout(function() {
        let className = "btn_play-" + lastOfSeq + "-light";
        $(COLORDATA[lastOfSeq].name).toggleClass(className);
        COLORDATA[lastOfSeq].sound.play();

        setTimeout(function() {
          $(COLORDATA[lastOfSeq].name).toggleClass(className);
        }, 100 * i + 1);
      }, 500 * i + 1);
    }
  }
  GAMEDATA.won = true;
}

function powerOnOff() {
  if (!(GAMEDATA.on)) {
    setCountDisply();
    GAMEDATA.on = true;

  } else {
    $("#count").text("--");
    GAMEDATA.on = false;
    gameReset();
  }
}