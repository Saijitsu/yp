// Game settings
let numbersOfPlayers = 2,
    obstacleCell = null;
    chestCell = null,
    highLightning = [],
    boardSize = null,
    rows = boardSize,
    columns = boardSize,
    width = columns * 50,
    height = rows * 50,
    totalCells = rows * columns,
    cellList = [],
    tilePixelCut = 50,
    currentPlayer = null,
    opponentPlayer = null,
    yOnClick = null,
    xOnClick = null,
    oneHundredDeduceY = null,
    oneHundredDeduceX = null,
    currentCellPosition = 0,
    randomList = [];

const sliderMapValue = document.getElementById("slider-map"),
      outputMap = document.getElementById("slider-map-value");
outputMap.innerHTML = sliderMapValue.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderMapValue.oninput = function () {
  outputMap.innerHTML = this.value;
};
const sliderObstacleValue = document.getElementById("slider-obstacle"),
      outputObstacle = document.getElementById("slider-obstacle-value");
outputObstacle.innerHTML = sliderObstacleValue.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderObstacleValue.oninput = function () {
  outputObstacle.innerHTML = this.value;
};
const sliderChestValue = document.getElementById("slider-chest"),
      outputChest = document.getElementById("slider-chest-value");
outputChest.innerHTML = sliderChestValue.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderChestValue.oninput = function () {
  outputChest.innerHTML = this.value;
};

// User-defined settings
function userDefinedSettings() {
  obstacleCell = parseInt(document.getElementById("slider-obstacle").value);
  chestCell = parseInt(document.getElementById("slider-chest").value);
  boardSize = parseInt(document.getElementById("slider-map").value);
  rows = boardSize;
  columns = boardSize;
  width = columns * 50;
  height = rows * 50;
  totalCells = columns * rows;
}


function getGradiantBackground() {
  const valuesOfHex = ["#9dc183", "#708238", "#00A86B", "#00A572", "#66FF66",
    "#B4D7BF", "#66CDAA", "#36DBCA", "#0AC92B", "#BCED91", "#8CDD81", "#90FEFB"
  ];
  const firstColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
  const secondColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
  const angle = Math.round(Math.random() * 360);

  return "linear-gradient(" + angle + "deg, " + firstColor + ", " + secondColor + ")"
}

function randomInt(mini, maxi) {
  const nb = mini + (maxi + 1 - mini) * Math.random();
  return Math.floor(nb);
}


function createRandomCellList() { // Array of random list of total cells.
  Array.prototype.shuffle = function (n) {
    if (!n)
      n = this.length;
    if (n > 1) {
      const i = randomInt(0, n - 1);
      const tmp = this[i];
      this[i] = this[n - 1];
      this[n - 1] = tmp;
      this.shuffle(n - 1);
    }
  }
  randomList = [];
  for (let i = 0; i < totalCells; i++) {
    randomList[i] = i;
  }

  randomList.shuffle();
}


function containType() { // Contain of the board!
  for (let i = 0; i < obstacleCell; i++) {
    if (currentCellPosition === randomList[i]) {
      return createObstacleCell()
    }
  }
  for (let j = obstacleCell; j < obstacleCell + chestCell; j++) {
    if (currentCellPosition === randomList[j]) {
      return createChestCell()
    }
  }
  if (currentCellPosition === randomList[obstacleCell + chestCell]) {
    return createPlayer1Cell()
  } else if (currentCellPosition === randomList[obstacleCell + chestCell + 1]) {
    return createPlayer2Cell()
  } else {
    return createEmptyCell()
  }
}

function createEmptyCell() {
  if (board[y][x] !== undefined) {
    const cell = new Cell(players[1], currentCellPosition, y, x, false);
    players[1].position = cell.numberCell;
    players[1].y = y;
    players[1].x = x;
    return cell; // player 2 confirmed
  }
  const designIs = getRandomIntInclusive(1, 3);
  return new Cell(0, currentCellPosition, y, x, true, designIs); // Empty Cells by default.
}

function createObstacleCell() {
  const designIs = getRandomIntInclusive(1, 3);
  return new Cell(1, currentCellPosition, y, x, false, designIs); // obstacle cell
}

function createChestCell() {
  const selectEntry = Math.floor(Math.random() * weaponsEntry.length);
  weaponsId = weaponsEntry[selectEntry];
  const cell = new Cell(weapons[weaponsId], currentCellPosition, y, x, true);
  weaponsEntry.splice(selectEntry, 1);
  return cell; // Chest cell
}

function createPlayer1Cell() {
  const cell = new Cell(players[0], currentCellPosition, y, x, false);
  players[0].position = cell.numberCell;
  players[0].y = y;
  players[0].x = x;
  return cell; // player 1 confirmed
}

function createPlayer2Cell() {
  if (players[1].characterNear(x, y, board.length, board,
      numberToTest = randomList[obstacleCell + chestCell + 1]) === false) {
    const cell = new Cell(players[1], currentCellPosition, y, x, false);
    players[1].position = cell.numberCell;
    players[1].y = y;
    players[1].x = x;
    return cell; // Safe zone: player 2 confirmed
  } else if (players[1].characterNear(x, y, board.length, board,
      numberToTest = randomList[obstacleCell + chestCell + 1]) === true) {
    players[1].changeDropArea() // Unsafe zone: Player 2 need new location.
    return new Cell(0, currentCellPosition, y, x, true); // Player 1 near, Empty cell dropped.
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Return where user click on canvas:
method which returns the mouse coordinates based on the position
 of the client mouse and the position of the canvas obtained from
 the getBoundingClientRect() method of the window object:
 The Element.getBoundingClientRect() method returns
 the size of an element and its position relative to the viewport*/
canvas.addEventListener("click", (e) => {
  const getMousePositionYX = getMousePosition(canvas, e);
  const getMousePositionY = getMousePositionYX[0];
  const getMousePositionX = getMousePositionYX[1];
  yOnClick = (Math.floor(getMousePositionY / tilePixelCut));
  xOnClick = (Math.floor(getMousePositionX / tilePixelCut));
  if (board[yOnClick][xOnClick].highLightning === true) {
    if (board[yOnClick][xOnClick].contain === 0) { // Empty Cell
      clickEmptyCell(yOnClick, xOnClick)
    } else { // Chest Cell
      clickChestCell(yOnClick, xOnClick)
    }
    currentPlayer.position = xOnClick + yOnClick * board.length;
    currentPlayer.y = yOnClick;
    currentPlayer.x = xOnClick;

    clearCurrentPlayerHighLightning(); // Clear High Lightning Cell

    draw(); // Update canvas

    currentPlayer.changeOfPlayerSTurn();
  }
}, false);

function getMousePosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return [y, x]
}

function clickEmptyCell() {
  board[yOnClick][xOnClick].contain = currentPlayer;
  board[yOnClick][xOnClick].freeCell = false;

  if (currentPlayer.weaponToDeposited === undefined) { // If no weapon to drop
    board[currentPlayer.y][currentPlayer.x].contain = 0;
    board[currentPlayer.y][currentPlayer.x].freeCell = true;
  } else { // If weapon to drop
    board[currentPlayer.y][currentPlayer.x].contain = currentPlayer.weaponToDeposited;
    currentPlayer.weaponToDeposited = undefined;
    board[currentPlayer.y][currentPlayer.x].freeCell = true;
  }
  board[currentPlayer.y][currentPlayer.x].contain === 0;
  board[currentPlayer.y][currentPlayer.x].freeCell = true;
}

function clickChestCell() {
  for (let weaponId = 0; weaponId < weapons.length; weaponId++) {
    if (board[yOnClick][xOnClick].contain === weapons[weaponId]) {
      board[yOnClick][xOnClick].contain = currentPlayer;
      board[yOnClick][xOnClick].freeCell = false;

      if (currentPlayer.weaponToDeposited === undefined) { // If no weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = 0;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
        currentPlayer.weaponToDeposited = currentPlayer.weapon;
      } else { // If already a weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = currentPlayer.weaponToDeposited;
        currentPlayer.weaponToDeposited = currentPlayer.weapon;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
      }
      currentPlayer.weapon = weapons[weaponId]; // New weapon equipped
      currentPlayer.weapon.worn = true;
    }
  }
}

function clearCurrentPlayerHighLightning() {
  for (let checkElement = 0; checkElement < highLightning.length; checkElement++) {
    deduceYX = highLightning[checkElement];
    const deduceY = cellList[deduceYX].y;
    const deduceX = cellList[deduceYX].x;
    board[deduceY][deduceX].highLightning = false;
  }
}

function moreThanOneHundredCells() { // New Player 2 drop location
  const min = obstacleCell + chestCell + 1;
  const oneHundredY = getRandomIntInclusive(0, boardSize - 1);
  const oneHundredX = getRandomIntInclusive(0, boardSize - 1);
  oneHundredDeduceY = oneHundredY;
  oneHundredDeduceX = oneHundredX;

  const cellWhereToDrop = oneHundredDeduceX + oneHundredDeduceY * board.length;
  for (let i = 0; i < min; i++) {
    if (randomList[i] === randomList[cellWhereToDrop]) {
      return moreThanOneHundredCells();
    }
  }
  if (players[1].characterNear(oneHundredDeduceX, oneHundredDeduceY, board.length, board, numberToTest = randomList[cellWhereToDrop]) === false) {
    return [oneHundredDeduceY, oneHundredDeduceX, cellWhereToDrop]
  } else {
    return moreThanOneHundredCells();
  }
}

function lessThanOneHundredCells() { // New Player 2 drop location
  const min = obstacleCell + chestCell + numbersOfPlayers;
  const max = totalCells - 1;
  const numberDropTry = getRandomIntInclusive(min, max);
  if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[numberDropTry]) === false) {
    const cellWhereToDrop = randomList[numberDropTry];
    chaineTransform = cellWhereToDrop.toString();
    /*chn.substr(early[, length])
               The substr() method extracts parts of a string, beginning at the character
               at the specified position, and returns the specified number of characters.*/
    if (cellWhereToDrop < 10) {
      deduceY = 0;
      deduceX = cellWhereToDrop;
    } else if (cellWhereToDrop >= 10) {
      deduceY = parseInt(chaineTransform.substr(0, 1));
      deduceX = parseInt(chaineTransform.substr(1, 1));
    }
    return [deduceY, deduceX, cellWhereToDrop]
  } else {
    return lessThanOneHundredCells()
  }
}

// refactoring this!
function currentPlayerIs() {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
    const element = document.querySelector('#player-2');
    element.classList.add('current-player-is-2');

    const element2 = document.querySelector('#player-1');
    element2.classList.remove('current-player-is-1');

    const element3 = document.querySelector('#avatar-player-1');
    element3.classList.add('image-spin');

    const element4 = document.querySelector('#avatar-player-0');
    element4.classList.remove('image-spin');

    const element5 = document.querySelector('.navi-gif');
    while (element5.firstChild) element5.removeChild(element5.firstChild);

    const image = document.createElement('img');
    image.src = './image/batmanhelp.png';
    element5.appendChild(image);

    let element6 = document.querySelector('#duel');
    element6.style.background = "linear-gradient(180deg, rgb(106, 47, 243) 20%, rgb(180, 49, 241) 30%," +
      " rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('./image/duelBackground.png') no-repeat bottom";
    return currentPlayer;
  } else {
    currentPlayer = players[0]
    const element7 = document.querySelector('#player-1');
    element7.classList.add('current-player-is-1');

    const element8 = document.querySelector('#player-2');
    element8.classList.remove('current-player-is-2');

    const element9 = document.querySelector('#avatar-player-0');
    element9.classList.add('image-spin');

    const element10 = document.querySelector('#avatar-player-1');
    element10.classList.remove('image-spin');

    const element11 = document.querySelector('.navi-gif');
    while (element11.firstChild) element11.removeChild(element11.firstChild);

    const image = document.createElement('img');
    image.src = './image/robinhelp.png';
    element11.appendChild(image);

    const element12 = document.querySelector('#duel');
    element12.style.background = "linear-gradient(180deg, rgb(61, 189, 248) 20%, rgb(66, 212, 248) 30%," +
      "rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('./image/duelBackground.png') no-repeat bottom";
    return currentPlayer;
  }
}

function fight() {
  opponentPlayer = currentPlayer.opponent();
  if (currentPlayer.defensiveStance === true) {
    return currentPlayer.changeOfPlayerSDuelTurn()
  }
  let duelIsEnd = false;
  while (duelIsEnd === false) {
    if (opponentPlayer.heal > 0) {
      livingOpponent();
    }
    if (opponentPlayer.heal <= 0) {
      deadOpponent();
      duelIsEnd = true;
      victory();
      break;
    }
    opponentPlayer.defensiveStance === false;
    currentPlayer.changeOfPlayerSDuelTurn();
    break;
  }
}

function livingOpponent() {
  if (opponentPlayer.defensiveStance === true) {
    opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal() / 2;
    opponentPlayer.defensiveStance === false;
    updateStatistics()
  } else if (opponentPlayer.defensiveStance === undefined || opponentPlayer.defensiveStance === false) {
    opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal();
    updateStatistics();
  }
  if (opponentPlayer.heal > 0) {
    setTimeout(function () {
      shakeBottleImage();
      const element1 = document.querySelector('#chat-text');
      element1.textContent = opponentPlayer.name + " has " + opponentPlayer.heal + " heal points!";
    }, 1200);
  } else if (opponentPlayer.heal < 0) {
    setTimeout(function () {
      shakeBottleImage();
      let element2 = document.querySelector('#chat-text');
      element2.textContent = opponentPlayer.name + " was overhit!";
    }, 1000);
  }
}

function deadOpponent() {
  updateStatistics();
  changeTrack(victoryMusic);
  setTimeout(function () {
    shakeBottleImage();
    let element2 = document.querySelector('#chat-text');
    element2.textContent = opponentPlayer.name + " is unconscious! " + currentPlayer.name + " is the winner!";
  }, 2000);
}

function victory() {
  document.getElementById('duel').style.display = 'none'; // hide
  document.getElementById('victory').style.display = 'block'; // show
  if (currentPlayer === players[1]) {
    document.getElementById('victory').style.background = "linear-gradient(180deg, rgb(106, 47, 243) 20%, rgb(180, 49, 241) 30%, rgb(255, 255, 255) 100%)";
    document.getElementById('victory').innerHTML += "<h1>Batman</h1> <h1>is the WINNER!</h1><img src='./image/batvictory.png'>";
  } else {
    document.getElementById('victory').style.background = "linear-gradient(180deg, rgb(61, 189, 248) 20%, rgb(66, 212, 248) 30%, rgb(255, 255, 255) 100%)";
    document.getElementById('victory').innerHTML += "<h1>Robin</h1> <h1>is the WINNER!</h1><img src='./image/robvictory.png'>";
  }
}

function updateStatistics() {
  for (let i = 0; i < 2; i++) {
    const valueToTransform = players[i].weapon.name.toLowerCase();
    const regex = /[' ]/gi;
    const weaponIcon = (valueToTransform.replace(regex, "-"));
    const heart = "#";
    const emptyHeart = "*";
    const nbHeart = Math.max(0, Math.round(players[i].heal / 10));
    // if value < 0, return 0 as the max value of this method.
    const nbEmptyHeart = 10 - nbHeart;

    document.getElementById("player-" + i + "-heal").innerHTML = '';
    document.getElementById("player-" + i + "-heal-stat-2").innerHTML = '';
    document.getElementById("player-" + i + "-weapon-power").innerHTML = '';
    document.getElementById("player-" + i + "-heal").append(heart.repeat(nbHeart) + emptyHeart.repeat(nbEmptyHeart))
    document.getElementById("player-" + i + "-heal-stat-2").append(Math.max(0, players[i].heal) + "/100");
    document.getElementById("player-" + i + "-weapon").innerHTML = players[i].weapon.name;
    document.getElementById("player-" + i + "-img-weapon").innerHTML = "<div class=\"" + weaponIcon + " image-rotate\"></div>";
    document.getElementById("player-" + i + "-weapon-power").append(players[i].weapon.power);
  }
};

function shakeBottleImage() {
  const shakeNavi = document.querySelector(".navi-gif");
  shakeNavi.parentNode.classList.add("vibrate");
  setTimeout(function () {
    shakeNavi.parentNode.classList.remove("vibrate");
  }, 1600); //animation time, waiting to remove.
}

//Game music
const audio = document.getElementById("my-audio");

[].forEach.call(document.querySelectorAll("#menu-music-button"), function (el) {
  el.addEventListener('click', function () {
    changeTrack(menuMusic);
    audio.volume = 0.1;
  })
});

[].forEach.call(document.querySelectorAll("#mute-music-button"), function (el) {
  el.addEventListener('click', function () {
    audio.volume = 0.0;

  })
});

(function () {
  //Low audio volume by default
  audio.volume = 0.1;
})();

function heyListen() {
  const naviSound = new Audio("https://www.myinstants.com/media/sounds/hey_listen.mp3");
  naviSound.play();
  naviSound.volume = 0.1;
};

const menuMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/onwohiey/05%20-%20House.mp3"
// menuMusic create because autoplay doesn't work on Google Chrome since version 66: changeTrack(adventureMusic)
const adventureMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/nuyjimms/06%20-%20Kokiri%20Forest.mp3"
const fightMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/hlcsbajc/79%20-%20Last%20Battle.mp3"
const victoryMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/ikoatnrm/49%20-%20Medal%20Get%20Fanfare.mp3"

function changeTrack(sourceUrl) {
  const audioPlayer = document.querySelector("#my-audio")
  document.querySelector('#mp3-src').setAttribute("src", sourceUrl);
  audioPlayer.pause();
  audioPlayer.load(); //suspends and restores all audio element
  audioPlayer.oncanplaythrough = audioPlayer.play();
};
