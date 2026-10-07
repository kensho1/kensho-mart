const fs = require('fs');

const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Admin Kensho Mart (Standalone)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js untuk Grafik Penjualan -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-slate-950 text-white min-h-screen p-4 font-sans pb-12">

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
    <p class="text-xs text-slate-400 mb-4">Sistem kontrol internal khusus admin untuk pengelolaan stok, laporan keuangan, dan grafik penjualan.</p>
    
    <div class="grid grid-cols-2 gap-2">
      <button onclick="openModalEdit()" class="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-lg shadow-indigo-600/30 transition active:scale-95">
        <span>✏️</span> Edit Ringkasan Data
      </button>
      <button onclick="openModalAddProduct()" class="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-lg shadow-emerald-600/30 transition active:scale-95">
        <span>✚</span> Tambah Produk Baru
      </button>
    </div>
  </div>

  <!-- STATS GRID -->
  <div class="grid grid-cols-2 gap-3 mb-4">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-slate-800 rounded-xl text-slate-300">📦</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL ITEM</p>
        <p class="text-xl font-black text-white" id="totalItem">0</p>
      </div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-blue-500/10 text-blue-400 rounded-xl">🎮</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STOK AKUN GAME</p>
        <p class="text-xl font-black text-blue-400" id="stokAkunGame">0</p>
      </div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-purple-500/10 text-purple-400 rounded-xl">👑</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STOK APK PREMIUM</p>
        <p class="text-xl font-black text-purple-400" id="stokApkPremium">0</p>
      </div>
    </div>

    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
      <div class="p-3 bg-rose-500/10 text-rose-400 rounded-xl">🛍️</div>
      <div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ITEM TERJUAL</p>
        <p class="text-xl font-black text-rose-400" id="itemTerjual">0</p>
      </div>
    </div>

    <div class="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 col-span-2">
      <div class="p-3 bg-amber-500/10 text-amber-400 rounded-xl">👛</div>
      <div class="min-w-0">
        <p class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">TOTAL OMSET</p>
        <p class="text-lg font-black text-amber-400 whitespace-nowrap" id="totalOmset">Rp 0</p>
      </div>
    </div>
  </div>

  <!-- GRAFIK PENJUALAN -->
  <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg mb-4">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">📈</span>
        <h3 class="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Grafik Penjualan 7 Hari Terakhir</h3>
      </div>
    </div>
    <div class="relative h-48 w-full">
      <canvas id="salesChart"></canvas>
    </div>
  </div>

  <!-- LAPORAN KEUANGAN (HARIAN & BULANAN) -->
  <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg mb-4">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">💵</span>
        <h3 class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Laporan Keuangan</h3>
      </div>
      <button onclick="openModalTransaction()" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg transition">+ Transaksi Baru</button>
    </div>

    <!-- SUMMARY HARIAN & BULANAN -->
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <p class="text-[10px] font-bold text-slate-400 uppercase">Omset Hari Ini</p>
        <p class="text-sm font-black text-emerald-400" id="omsetHarian">Rp 0</p>
      </div>
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <p class="text-[10px] font-bold text-slate-400 uppercase">Omset Bulan Ini</p>
        <p class="text-sm font-black text-blue-400" id="omsetBulanan">Rp 0</p>
      </div>
    </div>

    <!-- RIWAYAT TRANSAKSI TERAKHIR -->
    <h4 class="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Riwayat Transaksi Terakhir</h4>
    <div class="space-y-2 max-h-48 overflow-y-auto pr-1" id="transactionList">
      <p class="text-xs text-slate-500 text-center py-2">Belum ada transaksi tercatat.</p>
    </div>
  </div>

  <!-- SEARCH BAR -->
  <div class="mb-4">
    <div class="relative">
      <input type="text" id="searchInput" oninput="filterProducts()" placeholder="🔍 Cari nama game atau apk..." class="w-full bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 shadow-lg">
    </div>
  </div>

  <!-- DISPLAY STOK WITH TOGGLE -->
  <div class="space-y-4 mb-6">
    <!-- STOK AKUN GAME -->
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div onclick="toggleSection('game-content', 'arrow-game')" class="flex justify-between items-center cursor-pointer select-none">
        <div class="flex items-center gap-2">
          <span class="text-lg">🎮</span>
          <h3 class="text-xs font-extrabold text-blue-400 uppercase tracking-wider">Stok Akun Game</h3>
        </div>
        <span id="arrow-game" class="text-slate-400 text-xs font-bold transition-transform duration-300">▼</span>
      </div>
      <div class="space-y-2 mt-3" id="game-content"></div>
    </div>

    <!-- STOK APK PREMIUM -->
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div onclick="toggleSection('premium-content', 'arrow-premium')" class="flex justify-between items-center cursor-pointer select-none">
        <div class="flex items-center gap-2">
          <span class="text-lg">👑</span>
          <h3 class="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Stok APK Premium</h3>
        </div>
        <span id="arrow-premium" class="text-slate-400 text-xs font-bold transition-transform duration-300">▼</span>
      </div>
      <div class="space-y-2 mt-3" id="premium-content"></div>
    </div>
  </div>

  <!-- GUDANG DATA AKUN (VAULT/CATATAN ADMIN) -->
  <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg mb-6">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-2">
        <span class="text-lg">🔐</span>
        <h3 class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Gudang Akun / Catatan Siap Jual</h3>
      </div>
    </div>
    <textarea id="adminNotes" onblur="saveNotes()" placeholder="Tulis catatan atau data email:pass akun siap jual di sini..." class="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"></textarea>
    <p class="text-[10px] text-slate-500 mt-1">* Catatan tersimpan otomatis saat Anda selesai mengetik.</p>
  </div>

  <!-- MODAL CATAT TRANSAKSI BARU -->
  <div id="modalTransaction" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-bold text-white">Catat Transaksi Terjual</h2>
        <button onclick="closeModal('modalTransaction')" class="text-slate-400 hover:text-white font-bold text-lg">&times;</button>
      </div>

      <form onsubmit="addTransaction(event)" class="space-y-3">
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1">Nama Item / Produk</label>
          <input type="text" id="txItemName" placeholder="Contoh: Mobile Legends Akun Sultan" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1">Nominal (Rp)</label>
          <input type="number" id="txAmount" placeholder="50000" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>

        <div class="flex gap-2 pt-2">
          <button type="button" onclick="closeModal('modalTransaction')" class="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs">
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL EDIT RINGKASAN & STOK -->
  <div id="modalEdit" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-bold text-white">Edit Ringkasan & Stok</h2>
        <button onclick="closeModal('modalEdit')" class="text-slate-400 hover:text-white font-bold text-lg">&times;</button>
      </div>
      
      <form onsubmit="saveAllStok(event)" class="space-y-4">
        <div>
          <h4 class="text-xs font-bold text-emerald-400 uppercase mb-2">📊 Ringkasan Toko</h4>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">TOTAL ITEM</label>
              <input type="number" id="modalTotalItem" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">STOK AKUN GAME</label>
              <input type="number" id="modalStokAkunGame" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-blue-400 font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">STOK APK PREMIUM</label>
              <input type="number" id="modalStokApkPremium" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-purple-400 font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
            <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">ITEM TERJUAL</label>
              <input type="number" id="modalItemTerjual" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-rose-400 font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
          </div>
          <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <label class="text-[10px] text-slate-400 font-bold block mb-1">TOTAL OMSET (misal: 86.000)</label>
            <input type="text" id="modalTotalOmset" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-amber-400 font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-blue-400 uppercase mb-2">🎮 Detail Stok Game</h4>
          <div class="space-y-2" id="modal-game-inputs"></div>
        </div>
        
        <div>
          <h4 class="text-xs font-bold text-purple-400 uppercase mb-2">👑 Detail Stok APK Premium</h4>
          <div class="space-y-2" id="modal-premium-inputs"></div>
        </div>

        <div class="flex gap-2 pt-3">
          <button type="button" onclick="closeModal('modalEdit')" class="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs">
            Simpan Semua
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL TAMBAH PRODUK BARU -->
  <div id="modalAddProduct" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-bold text-white">Tambah Produk Baru</h2>
        <button onclick="closeModal('modalAddProduct')" class="text-slate-400 hover:text-white font-bold text-lg">&times;</button>
      </div>

      <form onsubmit="addNewProduct(event)" class="space-y-3">
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1">Kategori Produk</label>
          <select id="newProdCategory" class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-indigo-500">
            <option value="game">🎮 Stok Akun Game</option>
            <option value="premium">👑 Stok APK Premium</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1">Nama Produk</label>
          <input type="text" id="newProdName" placeholder="Contoh: Genshin Impact" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1">Jumlah Stok Awal</label>
          <input type="number" id="newProdStok" value="0" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>

        <div class="flex gap-2 pt-2">
          <button type="button" onclick="closeModal('modalAddProduct')" class="w-1/2 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs">
            Tambah Produk
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    let currentData = {};
    let myChart = null;

    function toggleSection(contentId, arrowId) {
      const content = document.getElementById(contentId);
      const arrow = document.getElementById(arrowId);
      
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('hidden');
        arrow.style.transform = 'rotate(-90deg)';
      }
    }

    async function loadData() {
      const res = await fetch('/api/data');
      currentData = await res.json();
      
      if (!currentData.transactions) currentData.transactions = [];
      if (!currentData.salesHistory) {
        currentData.salesHistory = {
          labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
          data: [0, 0, 0, 0, 0, 0, 0]
        };
      }

      const totalGame = currentData.stokAkunGame ?? (currentData.game ? currentData.game.reduce((a, b) => a + Number(b.stok), 0) : 0);
      const totalPremium = currentData.stokApkPremium ?? (currentData.premium ? currentData.premium.reduce((a, b) => a + Number(b.stok), 0) : 0);

      document.getElementById('totalItem').innerText = currentData.totalItem || 0;
      document.getElementById('stokAkunGame').innerText = totalGame;
      document.getElementById('stokApkPremium').innerText = totalPremium;
      document.getElementById('itemTerjual').innerText = currentData.itemTerjual || 0;
      document.getElementById('totalOmset').innerText = 'Rp ' + (currentData.totalOmset || 0);
      document.getElementById('adminNotes').value = currentData.adminNotes || '';

      renderCategoryView('game', currentData.game || [], 'text-blue-400', 'bg-blue-500/10 border-blue-500/20');
      renderCategoryView('premium', currentData.premium || [], 'text-purple-400', 'bg-purple-500/10 border-purple-500/20');
      
      renderFinancialReport();
      renderChart();
    }

    function renderCategoryView(cat, items, textCol, bgCol) {
      const container = document.getElementById(cat + '-content');
      
      container.innerHTML = items.map(item => \`
        <div class="flex justify-between items-center p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl product-item" data-nama="\${item.nama.toLowerCase()}">
          <span class="text-xs font-semibold text-slate-300">\${item.nama}</span>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 \${bgCol} border \${textCol} font-bold text-xs rounded-lg">
              \${item.stok} Stok
            </span>
            <button onclick="deleteProduct('\${cat}', '\${item.id}')" class="text-rose-500 hover:text-rose-400 font-bold text-xs p-1">🗑️</button>
          </div>
        </div>
      \`).join('');
    }

    function renderFinancialReport() {
      const today = new Date().toISOString().split('T')[0];
      const currentMonth = new Date().toISOString().slice(0, 7);

      let harian = 0;
      let bulanan = 0;

      const listContainer = document.getElementById('transactionList');
      const txs = currentData.transactions || [];

      if (txs.length === 0) {
        listContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-2">Belum ada transaksi tercatat.</p>';
      } else {
        listContainer.innerHTML = txs.slice().reverse().map(tx => {
          if (tx.date.startsWith(today)) harian += Number(tx.amount);
          if (tx.date.startsWith(currentMonth)) bulanan += Number(tx.amount);

          return \`
            <div class="flex justify-between items-center bg-slate-950 p-2 rounded-xl border border-slate-800/60 text-xs">
              <div>
                <p class="font-bold text-slate-300">\${tx.item}</p>
                <p class="text-[10px] text-slate-500">\${tx.date}</p>
              </div>
              <span class="font-bold text-emerald-400">+Rp \${Number(tx.amount).toLocaleString('id-ID')}</span>
            </div>
          \`;
        }).join('');
      }

      document.getElementById('omsetHarian').innerText = 'Rp ' + harian.toLocaleString('id-ID');
      document.getElementById('omsetBulanan').innerText = 'Rp ' + bulanan.toLocaleString('id-ID');
    }

    function renderChart() {
      const ctx = document.getElementById('salesChart').getContext('2d');
      if (myChart) myChart.destroy();

      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: currentData.salesHistory.labels,
          datasets: [{
            label: 'Penjualan (Rp)',
            data: currentData.salesHistory.data,
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: '#06b6d4'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: '#1e293b' },
              ticks: { color: '#94a3b8', font: { size: 10 } }
            },
            y: {
              grid: { color: '#1e293b' },
              ticks: { color: '#94a3b8', font: { size: 10 } }
            }
          }
        }
      });
    }

    function openModalTransaction() {
      document.getElementById('modalTransaction').classList.remove('hidden');
    }

    async function addTransaction(e) {
      e.preventDefault();
      const item = document.getElementById('txItemName').value;
      const amount = parseInt(document.getElementById('txAmount').value) || 0;
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

      if (!currentData.transactions) currentData.transactions = [];
      currentData.transactions.push({ item, amount, date: dateStr });

      // Tambahkan ke grafik (posisi hari ini)
      const dayIndex = (now.getDay() + 6) % 7; // Sen = 0
      currentData.salesHistory.data[dayIndex] += amount;

      // Update total item terjual & total omset
      currentData.itemTerjual = (currentData.itemTerjual || 0) + 1;

      await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      closeModal('modalTransaction');
      document.getElementById('txItemName').value = '';
      document.getElementById('txAmount').value = '';
      loadData();
    }

    function filterProducts() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const items = document.querySelectorAll('.product-item');
      
      items.forEach(item => {
        const nama = item.getAttribute('data-nama');
        if (nama.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }

    async function saveNotes() {
      const notes = document.getElementById('adminNotes').value;
      currentData.adminNotes = notes;
      
      await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });
    }

    function openModalEdit() {
      const totalGame = currentData.stokAkunGame ?? (currentData.game ? currentData.game.reduce((a, b) => a + Number(b.stok), 0) : 0);
      const totalPremium = currentData.stokApkPremium ?? (currentData.premium ? currentData.premium.reduce((a, b) => a + Number(b.stok), 0) : 0);

      document.getElementById('modalTotalItem').value = currentData.totalItem || 0;
      document.getElementById('modalStokAkunGame').value = totalGame;
      document.getElementById('modalStokApkPremium').value = totalPremium;
      document.getElementById('modalItemTerjual').value = currentData.itemTerjual || 0;
      document.getElementById('modalTotalOmset').value = currentData.totalOmset || 0;

      document.getElementById('modal-game-inputs').innerHTML = (currentData.game || []).map(item => \`
        <div class="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="game" data-id="\${item.id}" value="\${item.stok}" class="w-16 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>
      \`).join('');

      document.getElementById('modal-premium-inputs').innerHTML = (currentData.premium || []).map(item => \`
        <div class="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="premium" data-id="\${item.id}" value="\${item.stok}" class="w-16 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500">
        </div>
      \`).join('');

      document.getElementById('modalEdit').classList.remove('hidden');
    }

    function openModalAddProduct() {
      document.getElementById('modalAddProduct').classList.remove('hidden');
    }

    function closeModal(id) {
      document.getElementById(id).classList.add('hidden');
    }

    async function addNewProduct(e) {
      e.preventDefault();
      const cat = document.getElementById('newProdCategory').value;
      const nama = document.getElementById('newProdName').value;
      const stok = parseInt(document.getElementById('newProdStok').value) || 0;

      const newId = nama.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (!currentData[cat]) currentData[cat] = [];
      currentData[cat].push({ id: newId, nama: nama, stok: stok });

      await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      closeModal('modalAddProduct');
      document.getElementById('newProdName').value = '';
      document.getElementById('newProdStok').value = '0';
      loadData();
    }

    async function deleteProduct(cat, id) {
      if(!confirm("Yakin ingin menghapus produk ini?")) return;
      
      currentData[cat] = currentData[cat].filter(i => i.id !== id);

      await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      loadData();
    }

    async function saveAllStok(e) {
      e.preventDefault();
      
      currentData.totalItem = parseInt(document.getElementById('modalTotalItem').value) || 0;
      currentData.stokAkunGame = parseInt(document.getElementById('modalStokAkunGame').value) || 0;
      currentData.stokApkPremium = parseInt(document.getElementById('modalStokApkPremium').value) || 0;
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
        closeModal('modalEdit');
        loadData();
      }
    }

    loadData();
  </script>
</body>
</html>
`;

fs.writeFileSync('public/index.html', htmlContent);
console.log("✅ Grafik & Laporan Keuangan Berhasil Ditambahkan!");
