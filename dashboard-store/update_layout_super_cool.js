const fs = require('fs');

const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Admin Kensho Mart (Standalone)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <!-- Chart.js untuk Grafik Penjualan -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .font-mono-code {
      font-family: 'JetBrains Mono', monospace;
    }
    .glow-blue {
      box-shadow: 0 0 30px -5px rgba(59, 130, 246, 0.2);
    }
    .glow-emerald {
      box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.2);
    }
    .glow-amber {
      box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.2);
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.6);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(51, 65, 85, 0.8);
      border-radius: 9999px;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-6 pb-20 relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">

  <!-- BACKGROUND DECORATION -->
  <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none -z-10 rounded-full"></div>
  <div class="fixed bottom-10 right-0 w-[400px] h-[300px] bg-purple-600/10 blur-[130px] pointer-events-none -z-10 rounded-full"></div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toastContainer" class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <div class="max-w-xl mx-auto space-y-5">

    <!-- HEADER -->
    <div class="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl overflow-hidden glow-blue">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-500/30">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-extrabold tracking-widest uppercase bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">KENSHO MART ULTIMATE</span>
              <span class="px-2 py-0.5 text-[9px] font-black bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">v2.5</span>
            </div>
            <h1 class="text-xl font-black text-white tracking-tight">Panel Admin Control</h1>
          </div>
        </div>
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> ONLINE
        </span>
      </div>
      
      <p class="text-xs text-slate-400 mb-5 leading-relaxed">Sistem manajemen stok, analitik penjualan harian, serta tempat penyimpanan data akun siap jual.</p>
      
      <div class="grid grid-cols-2 gap-3">
        <button onclick="openModalEdit()" class="group py-3 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
          <span class="text-indigo-400 group-hover:rotate-12 transition-transform">✏️</span>
          <span>Edit Ringkasan</span>
        </button>
        <button onclick="openModalAddProduct()" class="group py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-95">
          <span class="group-hover:scale-125 transition-transform">✚</span>
          <span>Tambah Produk</span>
        </button>
      </div>
    </div>

    <!-- STATS GRID -->
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 flex items-center gap-3.5 transition-all">
        <div class="p-3 bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-300">📦</div>
        <div>
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">TOTAL ITEM</p>
          <p class="text-xl font-black text-white font-mono-code" id="totalItem">0</p>
        </div>
      </div>

      <div class="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-blue-500/30 rounded-2xl p-4 flex items-center gap-3.5 transition-all">
        <div class="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">🎮</div>
        <div>
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">AKUN GAME</p>
          <p class="text-xl font-black text-blue-400 font-mono-code" id="stokAkunGame">0</p>
        </div>
      </div>

      <div class="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-purple-500/30 rounded-2xl p-4 flex items-center gap-3.5 transition-all">
        <div class="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">👑</div>
        <div>
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">APK PREMIUM</p>
          <p class="text-xl font-black text-purple-400 font-mono-code" id="stokApkPremium">0</p>
        </div>
      </div>

      <div class="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-rose-500/30 rounded-2xl p-4 flex items-center gap-3.5 transition-all">
        <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">🛍️</div>
        <div>
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">TERJUAL</p>
          <p class="text-xl font-black text-rose-400 font-mono-code" id="itemTerjual">0</p>
        </div>
      </div>

      <div class="bg-slate-900/60 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3.5 col-span-2 glow-amber">
        <div class="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">👛</div>
        <div class="min-w-0">
          <p class="text-[10px] font-extrabold text-amber-400/80 uppercase tracking-wider">TOTAL OMSET KESELURUHAN</p>
          <p class="text-xl font-black text-amber-400 font-mono-code whitespace-nowrap" id="totalOmset">Rp 0</p>
        </div>
      </div>
    </div>

    <!-- SEARCH BAR -->
    <div class="relative">
      <input type="text" id="searchInput" oninput="filterProducts()" placeholder="🔍 Cari item akun game atau apk..." class="w-full bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 py-3.5 px-4 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all shadow-lg">
    </div>

    <!-- DISPLAY STOK WITH TOGGLE & STATUS BADGES -->
    <div class="space-y-4">
      <!-- STOK AKUN GAME -->
      <div class="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <div onclick="toggleSection('game-content', 'arrow-game')" class="flex justify-between items-center cursor-pointer select-none">
          <div class="flex items-center gap-2.5">
            <span class="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs">🎮</span>
            <h3 class="text-xs font-black text-blue-400 uppercase tracking-wider">Stok Akun Game</h3>
          </div>
          <span id="arrow-game" class="text-slate-500 text-xs font-bold transition-transform duration-300">▼</span>
        </div>
        <div class="space-y-2 mt-3.5" id="game-content"></div>
      </div>

      <!-- STOK APK PREMIUM -->
      <div class="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl">
        <div onclick="toggleSection('premium-content', 'arrow-premium')" class="flex justify-between items-center cursor-pointer select-none">
          <div class="flex items-center gap-2.5">
            <span class="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl text-xs">👑</span>
            <h3 class="text-xs font-black text-purple-400 uppercase tracking-wider">Stok APK Premium</h3>
          </div>
          <span id="arrow-premium" class="text-slate-500 text-xs font-bold transition-transform duration-300">▼</span>
        </div>
        <div class="space-y-2 mt-3.5" id="premium-content"></div>
      </div>
    </div>

    <!-- LAPORAN KEUANGAN & GRAFIK PENJUALAN -->
    <div class="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl glow-blue">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2.5">
          <span class="p-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl text-xs">📊</span>
          <h3 class="text-xs font-black text-cyan-400 uppercase tracking-wider">Laporan Keuangan & Grafik</h3>
        </div>
        <button onclick="openModalTransaction()" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-95">
          + Transaksi Baru
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Omset Hari Ini</p>
          <p class="text-base font-black text-emerald-400 font-mono-code" id="omsetHarian">Rp 0</p>
        </div>
        <div class="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
          <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Omset Bulan Ini</p>
          <p class="text-base font-black text-blue-400 font-mono-code" id="omsetBulanan">Rp 0</p>
        </div>
      </div>

      <div class="mb-4 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
        <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">Tren Penjualan (7 Hari Terakhir)</p>
        <div class="relative h-36 w-full">
          <canvas id="salesChart"></canvas>
        </div>
      </div>

      <h4 class="text-[11px] font-extrabold text-slate-400 mb-2 uppercase tracking-wider">Riwayat Transaksi Terakhir</h4>
      <div class="space-y-2 max-h-44 overflow-y-auto pr-1" id="transactionList">
        <p class="text-xs text-slate-500 text-center py-4">Belum ada transaksi tercatat.</p>
      </div>
    </div>

    <!-- GUDANG DATA AKUN (VAULT) WITH QUICK COPY -->
    <div class="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-xl glow-emerald">
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2.5">
          <span class="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs">🔐</span>
          <h3 class="text-xs font-black text-emerald-400 uppercase tracking-wider">Gudang Akun / Catatan</h3>
        </div>
        <button onclick="copyNotes()" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition border border-slate-700">
          📋 Salin Semua
        </button>
      </div>
      <textarea id="adminNotes" onblur="saveNotes()" placeholder="Simpan data email:pass akun siap jual di sini..." class="w-full h-36 bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 font-mono-code focus:outline-none focus:border-emerald-500 transition-all"></textarea>
      <p class="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
        <span>⚡</span> Tersimpan otomatis setelah selesai mengetik.
      </p>
    </div>

  </div>

  <!-- MODAL TRANSAKSI -->
  <div id="modalTransaction" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-base font-extrabold text-white">Catat Transaksi Terjual</h2>
        <button onclick="closeModal('modalTransaction')" class="text-slate-400 hover:text-white font-bold text-xl">&times;</button>
      </div>

      <form onsubmit="addTransaction(event)" class="space-y-4">
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1.5">Nama Item / Produk</label>
          <input type="text" id="txItemName" placeholder="Contoh: Mobile Legends Akun Sultan" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-emerald-500">
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1.5">Nominal Harga (Rp)</label>
          <input type="number" id="txAmount" placeholder="50000" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-emerald-500">
        </div>

        <div class="flex gap-2.5 pt-2">
          <button type="button" onclick="closeModal('modalTransaction')" class="w-1/2 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30">
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL EDIT -->
  <div id="modalEdit" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-base font-extrabold text-white">Edit Ringkasan & Detail Stok</h2>
        <button onclick="closeModal('modalEdit')" class="text-slate-400 hover:text-white font-bold text-xl">&times;</button>
      </div>
      
      <form onsubmit="saveAllStok(event)" class="space-y-4">
        <div>
          <h4 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">📊 Ringkasan Statistik Toko</h4>
          <div class="grid grid-cols-2 gap-2.5 mb-2.5">
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">TOTAL ITEM</label>
              <input type="number" id="modalTotalItem" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-2 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">AKUN GAME</label>
              <input type="number" id="modalStokAkunGame" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-blue-400 font-bold py-2 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2.5 mb-2.5">
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">APK PREMIUM</label>
              <input type="number" id="modalStokApkPremium" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-purple-400 font-bold py-2 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label class="text-[10px] text-slate-400 font-bold block mb-1">TERJUAL</label>
              <input type="number" id="modalItemTerjual" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-rose-400 font-bold py-2 rounded-lg focus:outline-none focus:border-indigo-500">
            </div>
          </div>
          <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <label class="text-[10px] text-slate-400 font-bold block mb-1">TOTAL OMSET (Format: 86.000)</label>
            <input type="text" id="modalTotalOmset" class="w-full bg-slate-900 border border-slate-700 text-center text-xs text-amber-400 font-bold py-2 rounded-lg focus:outline-none focus:border-indigo-500">
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">🎮 Detail Stok Game</h4>
          <div class="space-y-2" id="modal-game-inputs"></div>
        </div>
        
        <div>
          <h4 class="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">👑 Detail Stok APK Premium</h4>
          <div class="space-y-2" id="modal-premium-inputs"></div>
        </div>

        <div class="flex gap-2.5 pt-3">
          <button type="button" onclick="closeModal('modalEdit')" class="w-1/2 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30">
            Simpan Semua
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL TAMBAH PRODUK -->
  <div id="modalAddProduct" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md hidden flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-base font-extrabold text-white">Tambah Produk Baru</h2>
        <button onclick="closeModal('modalAddProduct')" class="text-slate-400 hover:text-white font-bold text-xl">&times;</button>
      </div>

      <form onsubmit="addNewProduct(event)" class="space-y-4">
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1.5">Kategori Produk</label>
          <select id="newProdCategory" class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500">
            <option value="game">🎮 Stok Akun Game</option>
            <option value="premium">👑 Stok APK Premium</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1.5">Nama Produk / Game</label>
          <input type="text" id="newProdName" placeholder="Contoh: Genshin Impact" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>
        <div>
          <label class="text-xs text-slate-400 font-bold block mb-1.5">Jumlah Stok Awal</label>
          <input type="number" id="newProdStok" value="0" required class="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-indigo-500">
        </div>

        <div class="flex gap-2.5 pt-2">
          <button type="button" onclick="closeModal('modalAddProduct')" class="w-1/2 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">
            Batal
          </button>
          <button type="submit" class="w-1/2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30">
            Tambah Produk
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    let currentData = {};
    let myChart = null;

    function showToast(msg, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      const bg = type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border-rose-500/40 text-rose-300';
      toast.className = \`px-4 py-2.5 rounded-xl border backdrop-blur-md text-xs font-bold shadow-2xl transition-all duration-300 pointer-events-auto transform translate-y-2 opacity-0 \${bg}\`;
      toast.innerText = msg;
      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
      }, 10);

      setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

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
      if(items.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-500 py-2 text-center">Tidak ada item.</p>';
        return;
      }

      container.innerHTML = items.map(item => {
        let badgeStyle = \`\${bgCol} \${textCol}\`;
        let statusTag = '';
        
        if (item.stok === 0) {
          badgeStyle = 'bg-rose-500/10 border-rose-500/20 text-rose-400';
          statusTag = '<span class="text-[9px] text-rose-500 font-bold uppercase ml-1.5">[Habis]</span>';
        } else if (item.stok <= 2) {
          badgeStyle = 'bg-amber-500/10 border-amber-500/20 text-amber-400';
          statusTag = '<span class="text-[9px] text-amber-500 font-bold uppercase ml-1.5">[Kritis]</span>';
        }

        return \`
          <div class="flex justify-between items-center p-3.5 bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 rounded-xl product-item transition-all" data-nama="\${item.nama.toLowerCase()}">
            <div class="flex items-center">
              <span class="text-xs font-semibold text-slate-200">\${item.nama}</span>
              \${statusTag}
            </div>
            <div class="flex items-center gap-2.5">
              <span class="px-3 py-1 \${badgeStyle} border font-black text-xs rounded-lg font-mono-code">
                \${item.stok} Stok
              </span>
              <button onclick="deleteProduct('\${cat}', '\${item.id}')" class="text-slate-500 hover:text-rose-400 font-bold text-xs p-1 transition-colors">🗑️</button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function renderFinancialReport() {
      const today = new Date().toISOString().split('T')[0];
      const currentMonth = new Date().toISOString().slice(0, 7);

      let harian = 0;
      let bulanan = 0;

      const listContainer = document.getElementById('transactionList');
      const txs = currentData.transactions || [];

      if (txs.length === 0) {
        listContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-4">Belum ada transaksi tercatat.</p>';
      } else {
        listContainer.innerHTML = txs.slice().reverse().map(tx => {
          if (tx.date.startsWith(today)) harian += Number(tx.amount);
          if (tx.date.startsWith(currentMonth)) bulanan += Number(tx.amount);

          return \`
            <div class="flex justify-between items-center bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-xs">
              <div>
                <p class="font-bold text-slate-200">\${tx.item}</p>
                <p class="text-[10px] font-mono-code text-slate-500">\${tx.date}</p>
              </div>
              <span class="font-extrabold text-emerald-400 font-mono-code">+Rp \${Number(tx.amount).toLocaleString('id-ID')}</span>
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

      const gradient = ctx.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: currentData.salesHistory.labels,
          datasets: [{
            label: 'Penjualan (Rp)',
            data: currentData.salesHistory.data,
            borderColor: '#06b6d4',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointBackgroundColor: '#06b6d4',
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: '#1e293b' },
              ticks: { color: '#64748b', font: { size: 9, family: 'JetBrains Mono' } }
            },
            y: {
              grid: { color: '#1e293b' },
              ticks: { color: '#64748b', font: { size: 9, family: 'JetBrains Mono' } }
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

      const dayIndex = (now.getDay() + 6) % 7;
      currentData.salesHistory.data[dayIndex] += amount;
      currentData.itemTerjual = (currentData.itemTerjual || 0) + 1;

      await fetch('/api/update-all-stok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });

      closeModal('modalTransaction');
      document.getElementById('txItemName').value = '';
      document.getElementById('txAmount').value = '';
      showToast("✅ Transaksi berhasil dicatat!");
      loadData();
    }

    function filterProducts() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const items = document.querySelectorAll('.product-item');
      items.forEach(item => {
        const nama = item.getAttribute('data-nama');
        item.classList.toggle('hidden', !nama.includes(query));
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
      showToast("💾 Catatan rahasia tersimpan!");
    }

    function copyNotes() {
      const textarea = document.getElementById('adminNotes');
      textarea.select();
      navigator.clipboard.writeText(textarea.value);
      showToast("📋 Catatan disalin ke clipboard!");
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
        <div class="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="game" data-id="\${item.id}" value="\${item.stok}" class="w-20 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono-code">
        </div>
      \`).join('');

      document.getElementById('modal-premium-inputs').innerHTML = (currentData.premium || []).map(item => \`
        <div class="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
          <label class="text-xs text-slate-300 font-medium">\${item.nama}</label>
          <input type="number" data-cat="premium" data-id="\${item.id}" value="\${item.stok}" class="w-20 bg-slate-900 border border-slate-700 text-center text-xs text-white font-bold py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono-code">
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
      showToast("✨ Produk baru berhasil ditambahkan!");
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

      showToast("🗑️ Produk telah dihapus!");
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
        showToast("✅ Ringkasan & stok berhasil diperbarui!");
        loadData();
      }
    }

    loadData();
  </script>
</body>
</html>
`;

fs.writeFileSync('public/index.html', htmlContent);
console.log("✅ Tampilan Super Cool & Fitur Baru Berhasil Diterapkan!");
