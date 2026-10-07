const fs = require('fs');

// Buat ulang data.json dengan struktur nama key yang cocok
const validData = {
  totalItem: 22,
  stokReady: 20,
  itemTerjual: 2,
  totalOmset: "97.000",
  game: [
    { id: 'ml', nama: 'Mobile Legends (ML)', stok: 8 },
    { id: 'ff', nama: 'Free Fire (FF)', stok: 5 },
    { id: 'roblox', nama: 'Roblox', stok: 3 },
    { id: 'pubg', nama: 'PUBG Mobile', stok: 2 }
  ],
  premium: [
    { id: 'spotify', nama: 'Spotify Premium', stok: 4 },
    { id: 'alight', nama: 'Alight Motion Pro', stok: 3 },
    { id: 'capcut', nama: 'CapCut Pro', stok: 2 }
  ]
};

fs.writeFileSync('data.json', JSON.stringify(validData, null, 2));
console.log("✅ File data.json berhasil diperbaiki!");
