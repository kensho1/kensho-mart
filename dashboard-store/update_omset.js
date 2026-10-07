const fs = require('fs');

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

  <!-- HEADER -->
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
    <p class="text-xs text-slate-400 mb-4">Sistem kontrol terpusat untuk kelola stok akun, layanan digital, dan omset toko.</p>
    <button onclick="openModal()" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95">
      <span>✚</span> Input / Edit Data Kategori
    </button>
  </div>

  <!-- STATS GRID -->
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

  <!-- DISPLAY STOK -->
  <div class="space-y-4">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">🎮</span>
        <h3 class="text-xs font-extrabold text-blue-400 uppercase tracking-wider">Stok Akun Game</h3>
      </div>
      <div class="space-y-2" id="list-game"></div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">👑</span>
        <h3 class="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Stok APK Premium</h3>
      </div>
      <div class="space-y-2" id="list-premium"></div>
    </div>
  </div>

  <!-- MODAL POPUP EDIT DATA -->
  <div id="modalEdit" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-bold text-white">Edit Data & Stok</h2>
        <button onclick="closeModal()" class="text-slate-400 hover:text-white font-bold text-lg">&times;</button>
      </div>
      
      <form id="formEditStok" onsubmit="saveAllStok(event)" class="space-y-4">
        
        <!-- EDIT RINGKASAN TOKO -->
        <div>
          <h4 class="text-xs font-bold text-emerald-400 uppercase mb-2">📊 Ringkasan Toko</h4>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">STOK READY</label>
              <input type="number" id="modalStokReady" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">ITEM TERJUAL</label>
              <input type="number" id="modalItemTerjual" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
          </div>
          <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <label class="text-[10px] text-slate-400 font-bold block mb-1">TOTAL OMSET (misal: 97.000)</label>
            <input type="text" id="modalTotalOmset" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-amber-400 font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-blue-400 uppercase mb-2">🎮 Akun Game</h4>
          <div class="space-y-2" id="modal-game-inputs"></div>
        </div>
        
        <div>
          <h4 class="text-xs font-bold text-purple-400 uppercase mb-2">👑 APK Premium</h4>
          <div class="space-y-2" id="modal-premium-inputs"></div>
        </div>

        <div class="flex gap-2 pt-3">
          <button type="button" onclick="closeModal()" class="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs">
            Simpan Semua
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    let currentData = {};

    async function loadData() {
      const res = await fetch('/api/data');
      currentData = await res.json();
      
      document.getElementById('totalItem').innerText = currentData.totalItem;
      document.getElementById('stokReady').innerText = currentData.stokReady;
      document.getElementById('itemTerjual').innerText = currentData.itemTerjual;
      document.getElementById('totalOmset').innerText = 'Rp ' + currentData.totalOmset;

      renderCategoryView('game', currentData.game, 'text-blue-400', 'bg-blue-500/10 border-blue-500/20');
      renderCategoryView('premium', currentData.premium, 'text-purple-400', 'bg-purple-500/10 border-purple-500/20');
    }

    function renderCategoryView(cat, items, textCol, bgCol) {
      const container = document.getElementById('list-' + cat);
      container.innerHTML = items.map(item => \`
        <div class="flex justify-between items-center p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <span class="text-xs font-semibold text-slate-300">\${item.nama}</span>
          <span class="px-2.5 py-1 \${bgCol} border \${textCol} font-bold text-xs rounded-lg">
            \${item.stok} Stok
          </span>
        </div>
      \`).join('');
    }

    function openModal() {
      // Masukkan data Ringkasan Toko ke input modal
      document.getElementById('modalStokReady').value = currentData.stokReady;
      document.getElementById('modalItemTerjual').value = currentData.itemTerjual;
      document.getElementById('modalTotalOmset').value = currentData.totalOmset;

      document.getElementById('modal-game-inputs').innerHTML = currentData.game.map(item => \`
        <div class="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="game" data-id="\${item.id}" value="\${item.stok}" class="w-16 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>
      \`).join('');

      document.getElementById('modal-premium-inputs').innerHTML = currentData.premium.map(item => \`
        <div class="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="premium" data-id="\${item.id}" value="\${item.stok}" class="w-16 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>
      \`).join('');

      document.getElementById('modalEdit').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('modalEdit').classList.add('hidden');
    }

    async function saveAllStok(e) {
      e.preventDefault();
      
      // Simpan input nilai Ringkasan Toko
      currentData.stokReady = parseInt(document.getElementById('modalStokReady').value) || 0;
      currentData.itemTerjual = parseInt(document.getElementById('modalItemTerjual').value) || 0;
      currentData.totalOmset = document.getElementById('modalTotalOmset').value;

      const inputs = document.querySelectorAll('#modalEdit input[data-cat]');
      
      inputs.forEach(input => {
        const cat = input.getAttribute('data-cat');
        const id = input.getAttribute('data-id');
        const val = parseInt(input.value) || 0;
        
        const target = currentData[cat].find(i => i.id === id);
        if(target) target.stok = val;
      });

      const res = await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      const result = await res.json();
      if(result.success) {
        closeModal();
        loadData();
      }
    }

    loadData();
  </script>
</body>
</html>
`;

fs.writeFileSync('public/index.html', htmlContent);
console.log("✅ Fitur edit Total Omset berhasil ditambahkan!");
