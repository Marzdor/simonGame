import $ from "jquery";
const GAMEDATA = {
  on: false,
  turns: 0,
  state: 0,
  sequence: []
};

$(document).ready(function() {
  $(".btn_menu-onOff-slider").on("click", powerOnOff);
  $("#startBtn").on("click", gameLoop);
});

function gameLoop() {
  if (GAMEDATA.on) {
    for (let i = 1; i <= 5; i++) {
      updateSequence();
      playSequence();
      console.log(i);
    }
  }
}

function updateSequence() {
  let btnProperties = [];
  let newBtn = getRandomBtn();

  btnProperties.push(newBtn);

  let btnColor = newBtn.slice(10, newBtn.length);

  btnProperties.push(btnColor);

  let btnHighlight = "";

  if (btnColor === "green") {
    btnHighlight = "#08c95e";
    const greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    btnProperties.push(btnHighlight);
    btnProperties.push(greenAudio);
  } else if (btnColor === "red") {
    btnHighlight = "#e01e29";
    const redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    btnProperties.push(btnHighlight);
    btnProperties.push(redAudio);
  } else if (btnColor === "yellow") {
    btnHighlight = "#ffe154";
    const yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    btnProperties.push(btnHighlight);
    btnProperties.push(yellowAudio);
  } else if (btnColor === "blue") {
    btnHighlight = "#0c5db3";
    const blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    btnProperties.push(btnHighlight);
    btnProperties.push(blueAudio);
  }
  GAMEDATA.sequence.push(btnProperties);
}

function playSequence() {
  console.log(GAMEDATA.sequence);
  GAMEDATA.sequence.forEach((seq, index) => {
    setTimeout(function() {
      $(seq[0]).css("background", seq[2]);
      seq[3].play();
    }, 1000 * index);
  });
}

function getRandomBtn() {
  let randNum = Math.floor(Math.random() * 4);
  let btn = ".btn_play-";
  switch (randNum) {
    case 0:
      btn += "green";
      break;
    case 1:
      btn += "red";
      break;
    case 2:
      btn += "yellow";
      break;
    case 3:
      btn += "blue";
      break;
  }
  return btn;
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