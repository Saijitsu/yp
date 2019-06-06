function Tileset(url) {
    // Loading the image in the image attribute
    this.image = new Image();

    this.image.referenceOfTileset = this;
    //we apply referenceOfTileset on this.image

    this.image.onload = function () {

        if (!this.complete)
            throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
        // Width of tileset tiles
        this.referenceOfTileset.width = this.width / Tilewidth;
    }
    this.image.src = "./image/tilesets/basicImage.png"
}

// Drawing method of tile number in 2D context at x and y location
Tileset.prototype.drawTile = function (number, context, xDestination, yDestination) {
    // x and y
    var xSourceTiles = number % this.width;

    if (xSourceTiles == 0) xSourceTiles = this.width;
    var ySourceTiles = Math.ceil(number / this.width);

    var xSource = (xSourceTiles - 1) * Tilewidth;
    var ySource = (ySourceTiles - 1) * Tilewidth;
    // why the -1: tile number 1 is located at coordinates (0, 0), not (50, 50).
    context.drawImage(this.image, xSource, ySource, Tilewidth, Tilewidth, xDestination, yDestination, Tilewidth, Tilewidth);
}
