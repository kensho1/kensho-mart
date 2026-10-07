const fs = require('fs');

// 1. Buat data.json jika belum ada
const initialData = {
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
  ],
  totalItem: 22,
  stokReady: 20,
  itemTerjual: 2,
  totalOmset: "97.000"
};

if (!fs.existsSync('data.json')) {
  fs.writeFileSync('data.json', JSON.stringify(initialData, null, 2));
}

// 2. Buat app.js dengan API Update Stok
const appJsContent = `
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Endpoint Ambil Data
app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

// Endpoint Update Stok
app.post('/api/update-stok', (req, res) => {
  const { category, id, newStok } = req.body;
  let data = JSON.parse(fs.readFileSync('data.json'));
  
  const item = data[category].find(i => i.id === id);
  if (item) {
    item.stok = parseInt(newStok) || 0;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    return res.json({ success: true, message: 'Stok berhasil diperbarui!' });
  }
  res.status(400).json({ success: false, message: 'Item tidak ditemukan' });
});

app.listen(PORT, () => {
  console.log(\` Server berjalan di http://localhost:\${PORT}\`);
});
`;

fs.writeFileSync('app.js', appJsContent);

// 3. Buat public/index.html yang terinteraktif
const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Admin Kensho Mart</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen p-4 font-sans">

  <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-4 shadow-xl">
    <div class="flex items-center gap-3 mb-2">
      <div class="p-2 bg-blue-600/20 text-blue-500 rounded-xl">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      </div>
      <div>
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">KENSHO MART MANAGEMENT SYSTEM</span>
        <h1 class="text-xl font-extrabold text-blue-400">Panel Admin Kensho Mart</h1>
      </div>
    </div>
    <p class="text-xs text-slate-400">Sistem kontrol terpusat untuk kelola stok akun, layanan digital, dan omset toko.</p>
  </div>

  <div class="grid grid-cols-2 gap-3 mb-6">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-slate-800 rounded-xl text-slate-300">📦</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL ITEM</p>
        <p class="text-xl font-black text-white" id="totalItem">0</p>
      </div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">✓</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STOK READY</p>
        <p class="text-xl font-black text-emerald-400" id="stokReady">0</p>
      </div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-rose-500/10 text-rose-400 rounded-xl">🛍️</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ITEM TERJUAL</p>
        <p class="text-xl font-black text-rose-400" id="itemTerjual">0</p>
      </div>
    </div>
    <div class="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-amber-500/10 text-amber-400 rounded-xl">👛</div>
      <div class="min-w-0">
        <p class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">TOTAL OMSET</p>
        <p class="text-base font-black text-amber-400 whitespace-nowrap" id="totalOmset">Rp 0</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <!-- GAME -->
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">🎮</span>
        <h3 class="text-xs font-extrabold text-blue-400 uppercase tracking-wider">Stok Akun Game</h3>
      </div>
      <div class="space-y-2" id="list-game"></div>
    </div>

    <!-- PREMIUM -->
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">👑</span>
        <h3 class="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Stok APK Premium</h3>
      </div>
      <div class="space-y-2" id="list-premium"></div>
    </div>
  </div>

  <script>
    async function loadData() {
      const res = await fetch('/api/data');
      const data = await res.json();
      
      document.getElementById('totalItem').innerText = data.totalItem;
      document.getElementById('stokReady').innerText = data.stokReady;
      document.getElementById('itemTerjual').innerText = data.itemTerjual;
      document.getElementById('totalOmset').innerText = 'Rp ' + data.totalOmset;

      renderCategory('game', data.game, 'text-blue-400', 'bg-blue-500/10 border-blue-500/20');
      renderCategory('premium', data.premium, 'text-purple-400', 'bg-purple-500/10 border-purple-500/20');
    }

    function renderCategory(cat, items, textCol, bgCol) {
      const container = document.getElementById('list-' + cat);
      container.innerHTML = items.map(item => \`
        <div class="flex justify-between items-center p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <span class="text-xs font-semibold text-slate-300">\${item.nama}</span>
          <div class="flex items-center gap-2">
            <input type="number" id="input-\${item.id}" value="\${item.stok}" class="w-14 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1 rounded-lg focus:outline-none focus:border-indigo-500">
            <button onclick="editStok('\${cat}', '\${item.id}')" class="px-2.5 py-1 \${bgCol} border \${textCol} font-bold text-xs rounded-lg hover:opacity-80 transition">
              Simpan
            </button>
          </div>
        </div>
      \`).join('');
    }

    async function editStok(category, id) {
      const newStok = document.getElementById('input-' + id).value;
      const res = await fetch('/api/update-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, id, newStok })
      });
      const result = await res.json();
      if(result.success) {
        alert('✅ Stok berhasil diubah!');
        loadData();
      }
    }

    loadData();
  </script>
</body>
</html>
`;

if (!fs.existsSync('public')) fs.mkdirSync('public');
fs.writeFileSync('public/index.html', htmlContent);

console.log("✅ Fitur edit stok dinamis berhasil dipasang!");
