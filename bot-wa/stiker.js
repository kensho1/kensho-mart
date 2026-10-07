const sharp = require("sharp");

async function buatStiker(buffer) {
  return await sharp(buffer)
    .resize(512, 512, {
      fit: "contain",
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0
      }
    })
    .webp({ quality: 80 })
    .toBuffer();
}

module.exports = buatStiker;
