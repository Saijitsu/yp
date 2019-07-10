class Tileset {
  constructor(url) {
    // Loading the image in the image attribute
    this.image = new Image();
    this.image.referenceOfTileset = this;
    //we apply referenceOfTileset on this.image
    this.image.src = url;
    this.image.onload = function() {
      if (!this.complete)
        throw new Error("Erreur de chargement du tileset nommé \"" + this.image.src + "\".");
      // Width of tileset tiles
      this.referenceOfTileset.width = this.width / Tilewidth;
    }   
  }

  // Drawing method of tile number in 2D context at x and y location
  drawTile(number, context, xDestination, yDestination) {
    // x and y
  let xSourceTiles = number % this.width;

  if (xSourceTiles == 0) xSourceTiles = this.width;
  let ySourceTiles = Math.ceil(number / this.width);

  let xSource = (xSourceTiles - 1) * Tilewidth;
  let ySource = (ySourceTiles - 1) * Tilewidth;
  // why the -1: tile number 1 is located at coordinates (0, 0), not (50, 50).
  context.drawImage(this.image, xSource, ySource, Tilewidth, Tilewidth, xDestination, yDestination, Tilewidth, Tilewidth);
  }
}

