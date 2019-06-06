function Character(name, heal, weapon, weaponToDeposited, position, y, x, defensiveStance) {
  this.name = name;
  this.heal = heal;
  this.weapon = weapon;
  this.weaponToDeposited = weaponToDeposited;
  this.position = position;
  this.y = y;
  this.x = x;
  this.defensiveStance = defensiveStance;
};

Character.prototype.describe = function () {
  var description = this.name + " is on cell number " + this.id().position + " has " +
    this.heal + " points of life, he is equipped with the weapon : \"" +
    this.equipedWeapon() + "\" he can inflict " +
    this.dommageDeal() + " damage per hit to " + this.opponent().name +
    " locate on cell number " + this.opponent().position + ".";
  return description;
}

Character.prototype.id = function () {
  var id = this.name;
  switch (this.name) {
    case player1.name:
      id = players[0]
      break;
    case player2.name:
      id = players[1]
      break;
  }
  return id;
};

Character.prototype.opponent = function () {
  var opponentIs = this.name;
  switch (this.name) {
    case player1.name:
      opponentIs = players[1]
      break;
    case player2.name:
      opponentIs = players[0]
      break;
  }
  return opponentIs;
};

Character.prototype.dommageDeal = function () {
  return this.weapon.power;
};

Character.prototype.equipedWeapon = function () {
  return this.weapon.name;
};

Character.prototype.characterNear = function () {
  var firstCellNumber = randomList[obstacleCell + chestCell];
  var secondCellNumber = numberToTest;

  var valueToTest = [-rows * 4, -(rows * 3 - 1), -rows * 3, -(rows * 3 + 1), -(rows * 2 - 1),
    -rows * 2, -(rows * 2 + 1), -(rows - 3), -(rows - 2), -(rows - 1), -rows, -(rows * 3 + 1),
    -(rows + 1), -(rows + 2), -(rows + 3), -1, -2, -3, -4, 1, 2, 3, 4, rows * 4, (rows * 3 - 1),
    rows * 3, (rows * 3 + 1), (rows * 2 - 1), rows * 2, (rows * 2 + 1), (rows - 3), (rows - 2),
    (rows - 1), rows, (rows * 3 + 1), (rows + 1), (rows + 2), (rows + 3)
  ]
  for (var i = 0; i < valueToTest.length; i++) {
    var valueToAdd = valueToTest[i];
    if (secondCellNumber != (firstCellNumber + valueToAdd)) {} else if (secondCellNumber = (firstCellNumber + valueToAdd)) {
      return true;
    }
  }
  return false;
}

// New player 2 location
Character.prototype.changeDropArea = function () {
  if (totalCells <= 100) {
    var deduceYXandCell = lessThanOneHundredCells();
    var deduceY = deduceYXandCell[0];
    var deduceX = deduceYXandCell[1];
    var cellWhereToDrop = deduceYXandCell[2]
  } else if (totalCells > 100) {
    var deduceYXandCell = moreThanOneHundredCells();
    var deduceY = deduceYXandCell[0];
    var deduceX = deduceYXandCell[1];
    var cellWhereToDrop = deduceYXandCell[2]
  }
  var cell = new Cell(this, cellWhereToDrop, deduceY, deduceX, false);
  board[deduceY][deduceX] = cell;
  this.position = cell.numberCell;
  this.y = deduceY;
  this.x = deduceX;
  return cell;
}

Character.prototype.tripArea = function () {
  var startingCell = board[this.y][this.x].numberCell
  var leftDirection = [-1, -2, -3]
  var downDirection = [rows, (rows * 2), (rows * 3)]
  var rightDirection = [1, 2, 3]
  var upDirection = [-rows, -(rows * 2), -(rows * 3)]
  var directionToTest = [leftDirection, downDirection, rightDirection, upDirection]

  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 3; i++) {
      var valueToAdd = directionToTest[j][i];
      var tryIfFreeCell = (startingCell + valueToAdd);
      if (tryIfFreeCell >= 0 && tryIfFreeCell <= totalCells - 1) {
        var deduceY = cellList[tryIfFreeCell].y
        var deduceX = cellList[tryIfFreeCell].x
        if (board[deduceY][deduceX].freeCell === true) {
          if (j === 0 || j === 2) {
            var line = this.y;
            if (deduceY === line) {
              highLightning.push(tryIfFreeCell);
              board[deduceY][deduceX].highLightning = true;
            } else {
              i = 3
            }
          }
          if (j === 1 || j === 3) {
            highLightning.push(tryIfFreeCell);
            board[deduceY][deduceX].highLightning = true;
          }
        } else {
          i = 3
        }
      }
    }
  }
  draw();
}

// changement de position du joueur sur la carte
//Character.prototype.changeOfPosition = function () {
//    var highLightningArray = this.tripArea();
//}

Character.prototype.changeOfPlayerSTurn = function () {
  updateStatistics()
  if (this.playersCollision() === false) {
    shakeBottleImage()
    $("#chat-text").text("Hey! Listen! No fight this turn!");
    heyListen()
    currentPlayerIs()
    highLightning = [];
    currentPlayer.tripArea(); // Trip Area of current player.
    setTimeout(function () {
      $("#chat-text").text(currentPlayer.describe());
    }, 1000);
  } else {
    changeTrack(fightMusic)
    currentPlayer.duel()
  }
}

Character.prototype.changeOfPlayerSDuelTurn = function () {
  currentPlayerIs()
  updateStatistics()
  setTimeout(function () {
    $("#chat-text").text(currentPlayer.name + " enters the fight.");
  }, 3500);
}

Character.prototype.playersCollision = function () {
  if (this.opponent().position === this.position - 1 || this.opponent().position === this.position + 1 ||
    this.opponent().position === this.position - rows || this.opponent().position === this.position + rows) {
    return true; // Vertical or horizontal collision détected
  } else {
    return false;
  }
}

Character.prototype.duel = function () {
  shakeBottleImage()
  $("#chat-text").text("Hey! Listen! Fight this turn!");
  heyListen()
  $("#duel").show();
  $("#canvas").hide();
  $("#restart-game").hide();
}

Character.prototype.isDefensiveStance = function () {
  currentPlayer = this;
  currentPlayer.defensiveStance = true;
  shakeBottleImage()
  $("#chat-text").text(currentPlayer.name + " adopt a defensive stance! Half damage on the next attack received.");
  fight()
}

Character.prototype.isOffensiveStance = function () {
  currentPlayer.defensiveStance = false;
  shakeBottleImage()
  $("#chat-text").text(currentPlayer.name + " adopt an offensive stance!");
  fight()
}

// Object Player One
var player1 = new Character("Robin", 100, weapons[0]);

// Object Player two
var player2 = new Character("Batman", 100, weapons[0]);

// Character Array!
var players = [player1, player2];
