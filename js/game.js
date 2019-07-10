// Start the game:
document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('start-button').addEventListener('click', () => {
        document.querySelector('.board-and-players-info').style.display = 'flex';
        document.querySelector('.game-option-rules').style.display = 'none';
        document.querySelector('#duel').style.display = 'none';
        document.querySelector('#victory').style.display = 'none';
        userDefinedSettings();
        // Who starting the game? Select the player Number
        let playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
        currentPlayer = players[playerNumber]; //Selected starting Player
        currentPlayerIs();
        createRandomCellList();
        boardCreation(); //create the board
        // Modify CSS elements
        let elmt = document.getElementById("canvas");
        // Modify style
        elmt.style.background = getGradiantBackground();
        elmt.style.border = "1px solid #EEC965";
        elmt.width = width;
        elmt.height = height;
        draw();
        currentPlayer.tripArea();
        updateStatistics();
        changeTrack(adventureMusic);
    });
});
