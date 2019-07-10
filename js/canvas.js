let Tilewidth = 50;
let ts = new Tileset("https://zupimages.net/up/18/42/szax.png");

function draw() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let dx = j * Tilewidth;
            let dy = i * Tilewidth;

            if (board[i][j].contain === 0 || board[i][j].contain === 1) {//Empty & Obstacle Cell
                switch (board[i][j].contain) {
                    case 0: // Empty Cell
                        if (board[i][j].design === 1) {
                            ts.drawTile(1, ctx, dx, dy);
                        } else if (board[i][j].design === 2) {
                            ts.drawTile(15, ctx, dx, dy);
                        } else if (board[i][j].design === 3) {
                            ts.drawTile(16, ctx, dx, dy);
                        }
                        if (board[i][j].highLightning === true) {
                            ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                            ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                        } else {}
                        break;
                    case 1: // Obstacle Cell
                        if (board[i][j].design === 1) {
                            ts.drawTile(2, ctx, dx, dy);
                        } else if (board[i][j].design === 2) {
                            ts.drawTile(17, ctx, dx, dy);
                        } else if (board[i][j].design === 3) {
                            ts.drawTile(18, ctx, dx, dy);
                        }
                        break;
                }
            } else if (board[i][j].contain === players[0] || board[i][j].contain === players[1]) { // Players Cell
                switch (board[i][j].contain) {
                    case players[0]: // Player 1
                        ts.drawTile(4, ctx, dx, dy);
                        break;
                    case players[1]: // Player 2
                        ts.drawTile(5, ctx, dx, dy);
                        break;
                }
            } else { // Tresure Chest Cell
                for (let itemNumber = 0; itemNumber < weapons.length; itemNumber++) {
                    if (board[i][j].contain === weapons[itemNumber]) {
                        if (weapons[itemNumber].worn === false) {
                            ts.drawTile(3, ctx, dx, dy);
                        } else if (weapons[itemNumber].worn === true) {
                            ts.drawTile((6 + itemNumber), ctx, dx, dy);
                        }
                        if (board[i][j].highLightning === true) {
                            ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                            ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                        }
                    }
                }
            }
        }
    }
};
