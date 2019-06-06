// Start the game:
$("#start-button").click(function () {
    $(".board-and-players-info").css("display", "flex");
});
$("#start-button").click(function () {
    $(".game-option-rules").hide();
    $("#duel").hide();
    $("#victory").hide()
    userDefinedSettings()
    // Who starting the game? Select the player Number
    var playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
    currentPlayer = players[playerNumber]; //Selected starting Player
    currentPlayerIs()
    createRandomCellList()
    boardCreation() //create the board
    // Modify CSS elements
    var elmt = document.getElementById("canvas");
    // Modify style
    elmt.style.background = getGradiantBackground();
    elmt.style.border = "1px solid #EEC965";
    elmt.width = width;
    elmt.height = height;
    draw()
    currentPlayer.tripArea();
    updateStatistics()
    changeTrack(adventureMusic)
});
