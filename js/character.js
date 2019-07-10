class Character {
  constructor(name, heal, weapon, weaponToDeposited, position, y, x, defensiveStance) {
    this.name = name;
    this.heal = heal;
    this.weapon = weapon;
    this.weaponToDeposited = weaponToDeposited;
    this.position = position;
    this.y = y;
    this.x = x;
    this.defensiveStance = defensiveStance;
  }

  describe() {
    let description = this.name + " is on cell number " + this.id().position + " has " +
      this.heal + " points of life, he is equipped with the weapon : \"" +
      this.equipedWeapon() + "\" he can inflict " +
      this.dommageDeal() + " damage per hit to " + this.opponent().name +
      " locate on cell number " + this.opponent().position + ".";
    return description;
  }

  id() {
    let id = this.name;
    switch (this.name) {
      case player1.name:
        id = players[0]
        break;
      case player2.name:
        id = players[1]
        break;
    }
    return id;
  }

  opponent() {
    let opponentIs = this.name;
    switch (this.name) {
      case player1.name:
        opponentIs = players[1]
        break;
      case player2.name:
        opponentIs = players[0]
        break;
    }
    return opponentIs;
  }

  dommageDeal() {
    return this.weapon.power;
  }

  equipedWeapon() {
    return this.weapon.name;
  }

  characterNear() {
    let firstCellNumber = randomList[obstacleCell + chestCell];
    let secondCellNumber = numberToTest;

    let valueToTest = [-rows * 4, -(rows * 3 - 1), -rows * 3, -(rows * 3 + 1), -(rows * 2 - 1),
      -rows * 2, -(rows * 2 + 1), -(rows - 3), -(rows - 2), -(rows - 1), -rows, -(rows * 3 + 1),
      -(rows + 1), -(rows + 2), -(rows + 3), -1, -2, -3, -4, 1, 2, 3, 4, rows * 4, (rows * 3 - 1),
      rows * 3, (rows * 3 + 1), (rows * 2 - 1), rows * 2, (rows * 2 + 1), (rows - 3), (rows - 2),
      (rows - 1), rows, (rows * 3 + 1), (rows + 1), (rows + 2), (rows + 3)
    ]
    for (let i = 0; i < valueToTest.length; i++) {
      let valueToAdd = valueToTest[i];
      if (secondCellNumber != (firstCellNumber + valueToAdd)) {} else if (secondCellNumber = (firstCellNumber + valueToAdd)) {
        return true;
      }
    }
    return false;
  }

  // New player 2 location
  changeDropArea() {
    /* Check here: return not here!!! Issue #1

    Uncaught ReferenceError: cellWhereToDrop is not defined
    at Character.changeDropArea (character.js:89)
    at createPlayer2Cell (index.js:159)
    at containType (index.js:110)
    at boardCreation (map.js:30)
    at HTMLButtonElement.<anonymous> (game.js:15)
    */
   // Fast and dirty fix
    if (totalCells <= 100) {
      let deduceYXandCell = lessThanOneHundredCells();
      let deduceY = deduceYXandCell[0];
      let deduceX = deduceYXandCell[1];
      let cellWhereToDrop = deduceYXandCell[2]
      let cell = new Cell(this, cellWhereToDrop, deduceY, deduceX, false);
      board[deduceY][deduceX] = cell;
      this.position = cell.numberCell;
      this.y = deduceY;
      this.x = deduceX;
      return cell;
    } else if (totalCells > 100) {
      let deduceYXandCell = moreThanOneHundredCells();
      let deduceY = deduceYXandCell[0];
      let deduceX = deduceYXandCell[1];
      let cellWhereToDrop = deduceYXandCell[2]
      let cell = new Cell(this, cellWhereToDrop, deduceY, deduceX, false);
      board[deduceY][deduceX] = cell;
      this.position = cell.numberCell;
      this.y = deduceY;
      this.x = deduceX;
      return cell;
    }
  }

  tripArea() {
    let startingCell = board[this.y][this.x].numberCell
    let leftDirection = [-1, -2, -3]
    let downDirection = [rows, (rows * 2), (rows * 3)]
    let rightDirection = [1, 2, 3]
    let upDirection = [-rows, -(rows * 2), -(rows * 3)]
    let directionToTest = [leftDirection, downDirection, rightDirection, upDirection]

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 3; i++) {
        let valueToAdd = directionToTest[j][i];
        let tryIfFreeCell = (startingCell + valueToAdd);
        if (tryIfFreeCell >= 0 && tryIfFreeCell <= totalCells - 1) {
          let deduceY = cellList[tryIfFreeCell].y
          let deduceX = cellList[tryIfFreeCell].x
          if (board[deduceY][deduceX].freeCell === true) {
            if (j === 0 || j === 2) {
              let line = this.y;
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
  //    let highLightningArray = this.tripArea();
  //}

  changeOfPlayerSTurn() {
    updateStatistics();
    if (this.playersCollision() === false) {
      shakeBottleImage();
      document.getElementById('chat-text').textContent = 'Hey! Listen! No fight this turn!';
      heyListen();
      currentPlayerIs()
      highLightning = [];
      currentPlayer.tripArea(); // Trip Area of current player.
      setTimeout(() => {
        document.getElementById('chat-text').textContent = currentPlayer.describe();
      }, 1000);
    } else {
      changeTrack(fightMusic);
      currentPlayer.duel();
    }
  }

  changeOfPlayerSDuelTurn() {
    currentPlayerIs();
    updateStatistics();
    setTimeout(() => {
      document.getElementById('chat-text').textContent = currentPlayer.name + ' Hey! Listen! No fight this turn!';
    }, 3500);
  }

  playersCollision() {
    if (this.opponent().position === this.position - 1 || this.opponent().position === this.position + 1 ||
      this.opponent().position === this.position - rows || this.opponent().position === this.position + rows) {
      return true; // Vertical or horizontal collision détected
    } else {
      return false;
    }
  }

  duel() {
    shakeBottleImage();
    document.getElementById('chat-text').textContent = 'Hey! Listen! Fight this turn!';
    heyListen();
    document.getElementById('duel').style.display = 'flex';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('restart-game').style.display = 'none';
  }

  isDefensiveStance() {
    currentPlayer = this;
    currentPlayer.defensiveStance = true;
    shakeBottleImage();
    document.getElementById('chat-text').textContent = currentPlayer.name + ' adopt a defensive stance! Half damage on the next attack received.';
    fight();
  }

  isOffensiveStance() {
    currentPlayer.defensiveStance = false;
    shakeBottleImage();
    document.getElementById('chat-text').textContent = currentPlayer.name + ' adopt an offensive stance!';
    fight();
  }

}


// Object Player One
let player1 = new Character("Robin", 100, weapons[0]);

// Object Player two
let player2 = new Character("Batman", 100, weapons[0]);

// Character Array!
let players = [player1, player2];
