    specs: ['Vault: Rame Baju Old', 'Set Incubator & Bandit', 'Weapon: Titan Scar & AK Dragon', 'Login: FB Single Unbind']
  },
  {
    id: 3,
    category: 'pubg',
    title: 'AKUN PUBG - M4 GLACIER LEVEL 6',
    price: 'Rp 350.000',
    sold: 263,
    stock: 3,
    badge: 'PUBG',
    badgeBg: 'from-amber-500 via-orange-600 to-yellow-950',
    icon: 'fa-shield-halved',
    imgUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80',
    isBest: false,
    specs: ['M416 Glacier Max / Lv 6', 'Level Akun: 68 Global', 'RP: Max S20-S30', 'Login: Twitter + Email FB Off']
  },
  {
    id: 4,
    category: 'mlbb',
    title: 'AKUN MLBB - ALL HERO SKIN RAME',
    price: 'Rp 220.000',
    sold: 346,
    stock: 1,
    badge: 'MLBB',
    badgeBg: 'from-blue-600 via-indigo-600 to-blue-950',
    icon: 'fa-gamepad',
    imgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
    isBest: false,
    specs: ['Hero: Full 120+', 'Skin: Lightborn + Venom + SABER', 'Winrate: 62% Overall', 'Status: Clean No Minus']
  }
];

app.get('/', (req, res) => {
  res.render('index', { categories, products, cheatGames, adminWa: ADMIN_WA });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 KENSHO MART STORE RUNNING!`);
  console.log(`🌐 Akses di Browser: http://localhost:${PORT}`);
  console.log(`📱 Admin WA Registered: ${ADMIN_WA}`);
  console.log(`=================================`);
});
EOF

cat << 'EOF' > views/index.ejs
<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kensho Mart Pro - JB & Rekber Game</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body {
      background-color: #030712;
      color: #f3f4f6;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .neon-border {
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
      border: 1px solid rgba(6, 182, 212, 0.4);
    }
    .neon-border:hover {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
      border-color: #22d3ee;
    }
    .shimmer {
      position: relative;
      overflow: hidden;
    }
    .shimmer::after {
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0));
      animation: shimmer 3s infinite;
      content: '';
    }
    @keyframes shimmer { 100% { transform: translateX(100%); } }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    .animate-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 18s linear infinite;
    }
  </style>
</head>
<body class="pb-28">

  <!-- Header / Navbar -->
  <header class="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
        <i class="fa-solid fa-gamepad"></i>
      </div>
      <div>
        <span class="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 text-base block leading-none">
          KENSHO MART
        </span>
        <span class="text-[9px] text-cyan-400 font-bold flex items-center gap-1 mt-1">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Official Verified Store
        </span>
      </div>
    </div>
    
    <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin%20Kensho%20Mart,%20saya%20ingin%20bertanya" target="_blank" class="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition">
      <i class="fa-brands fa-whatsapp text-sm"></i> Admin WA
    </a>
  </header>

  <!-- Running Text / Live Activity -->
  <div class="bg-[#0b1329] border-b border-cyan-500/20 py-1 px-3 overflow-hidden flex items-center text-[10px] text-cyan-300 font-semibold">
    <i class="fa-solid fa-bullhorn text-amber-400 mr-2 z-10 bg-[#0b1329] pr-1"></i>
    <div class="overflow-hidden relative w-full">
      <div class="animate-marquee font-bold">
        ⚡ [LIVE TRANSAKSI] - User #392 berhasil membeli Akun MLBB S30 • User #102 menggunakan Jasa Rekber • Garansi Akun 100% Anti-HB!
      </div>
    </div>
  </div>

  <main class="px-3.5 pt-3 max-w-lg mx-auto">

    <!-- Payment Badges Bar -->
    <div class="bg-[#0b1329] border border-cyan-500/20 rounded-xl p-2.5 mb-4 flex items-center justify-between shadow-inner">
      <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Metode Bayar:</span>
      <div class="flex items-center gap-2 text-xs text-cyan-300 font-bold">
        <span class="bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">QRIS</span>
        <span class="bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/50">DANA</span>
        <span class="bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/50">OVO</span>
        <span class="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">BANK</span>
      </div>
    </div>

    <!-- Search Bar Interaktif -->
    <div class="relative mb-4">
      <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 text-xs font-bold"></i>
      <input type="text" id="search-input" onkeyup="searchProduct()" placeholder="Cari akun MLBB, FF, PUBG, Valorant..." 
             class="w-full pl-9 pr-4 py-2.5 bg-[#0b1329] border border-cyan-500/30 rounded-xl text-xs text-white font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition shadow-inner">
    </div>

    <!-- Banner Hero Neon Pro -->
    <div class="relative overflow-hidden bg-gradient-to-br from-cyan-950 via-[#0b192e] to-slate-950 border border-cyan-400/40 rounded-2xl p-4 mb-4 shadow-xl shimmer">
      <div class="flex items-center justify-between mb-2">
        <span class="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow">
          <i class="fa-solid fa-shield-halved mr-1"></i> Garansi Anti-HB 100%
        </span>
        <span class="text-[10px] text-cyan-300 font-bold">VERIFIED JB</span>
      </div>
      <h2 class="text-base font-black text-white tracking-wide mb-1">MARKETPLACE AKUN GAME & REKBER</h2>
      <p class="text-[10px] text-slate-300 mb-3 font-medium">Proses Instan, Transaksi Amanah, & Layanan Cheat VIP.</p>
      
      <div class="flex gap-2">
        <button onclick="openRekberModal()" class="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl text-[10px] font-black shadow-lg shadow-cyan-500/20 active:scale-95 transition">
          <i class="fa-solid fa-handshake mr-1"></i> Jasa Rekber
        </button>
        <button onclick="openCheatModal()" class="px-4 py-2 bg-red-600/30 border border-red-500 text-red-300 rounded-xl text-[10px] font-black active:scale-95 transition">
          <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Cheat VIP
        </button>
      </div>
    </div>

    <!-- Quick Menu Grid -->
    <div class="grid grid-cols-4 gap-2 mb-5">
      <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin,%20saya%20mau%20titip%20jual%20akun" target="_blank" class="bg-[#0b1329] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col items-center text-center active:scale-95 transition">
        <i class="fa-solid fa-store text-cyan-400 text-lg mb-1"></i>
        <span class="text-[10px] font-bold text-white">Titip Jual</span>
      </a>
      <button onclick="openRekberModal()" class="bg-[#0b1329] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col items-center text-center active:scale-95 transition">
        <i class="fa-solid fa-handshake text-emerald-400 text-lg mb-1"></i>
        <span class="text-[10px] font-bold text-white">Rekber</span>
      </button>
      <button onclick="openCheatModal()" class="bg-gradient-to-b from-red-950/80 to-[#0b1329] border border-red-500/60 rounded-xl p-2.5 flex flex-col items-center text-center active:scale-95 transition">
        <i class="fa-solid fa-wand-magic-sparkles text-red-400 text-lg mb-1 animate-pulse"></i>
        <span class="text-[10px] font-black text-red-300">Cheat Game</span>
      </button>
      <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin,%20saya%20mau%20lihat%20testimoni" target="_blank" class="bg-[#0b1329] border border-cyan-500/20 rounded-xl p-2.5 flex flex-col items-center text-center active:scale-95 transition">
        <i class="fa-solid fa-star text-amber-400 text-lg mb-1"></i>
        <span class="text-[10px] font-bold text-white">Testimoni</span>
      </a>
    </div>

    <!-- Categories Horizontal Filter -->
    <div class="flex gap-2.5 overflow-x-auto no-scrollbar py-1 mb-4">
      <% categories.forEach(cat => { %>
        <button onclick="filterCategory('<%= cat.id %>', this)" class="category-btn flex-none px-3.5 py-2 rounded-xl border border-cyan-500/20 bg-[#0b1329] text-cyan-300 text-[11px] font-extrabold flex items-center gap-2 active:scale-95 transition">
          <i class="fa-solid <%= cat.icon %>"></i>
          <span><%= cat.name %></span>
        </button>
      <% }) %>
    </div>

    <!-- Section Title -->
    <div id="katalog-section" class="flex justify-between items-center mb-3 scroll-mt-20">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-fire-flame-curved text-amber-400 text-base"></i>
        <h2 id="section-title" class="font-black text-sm tracking-wide text-white">KATALOG AKUN READY</h2>
      </div>
      <span class="text-[9px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800 font-bold">Terupdate</span>
    </div>

    <!-- Product Grid Neon -->
    <div id="product-grid" class="grid grid-cols-2 gap-3 mb-6">
      <% products.forEach(p => { %>
        <div onclick="openProductModal(<%= JSON.stringify(p) %>)" 
             class="product-item neon-border bg-[#0b1329] rounded-2xl p-2.5 flex flex-col justify-between cursor-pointer active:scale-95 transition relative"
             data-category="<%= p.category %>"
             data-title="<%= p.title.toLowerCase() %>">
          
          <span class="absolute top-2 right-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[8px] font-black px-2 py-0.5 rounded-md z-10">
            STOK READY (<%= p.stock %>)
          </span>

          <div>
            <!-- Banner Logo Solid -->
            <div class="relative w-full h-28 rounded-xl overflow-hidden mb-2 bg-gradient-to-br <%= p.badgeBg %> flex flex-col items-center justify-center p-3 border border-white/20 shadow-inner">
              <img src="<%= p.imgUrl %>" class="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay" alt="<%= p.badge %>">
              <i class="fa-solid <%= p.icon %> text-4xl text-white drop-shadow-md z-10 mb-1"></i>
              <span class="z-10 text-[9px] font-black text-white tracking-widest uppercase bg-slate-950/80 px-2 py-0.5 rounded border border-white/20">
                <%= p.badge %>
              </span>
            </div>

            <h3 class="text-[11px] font-extrabold leading-tight line-clamp-2 text-white mb-1">
              <%= p.title %>
            </h3>
          </div>

          <div>
            <div class="text-xs font-black text-amber-400 mb-1">
              <%= p.price %>
            </div>
            <button class="w-full py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 rounded-lg text-[10px] font-black shadow transition">
              Beli Sekarang
            </button>
          </div>
        </div>
      <% }) %>
    </div>

  </main>

  <!-- POP-UP MODAL CHEAT GAME -->
  <div id="cheat-modal" class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#0b1329] border border-red-500/50 w-full max-w-md rounded-2xl p-4 relative text-left shadow-2xl max-h-[85vh] overflow-y-auto">
      <button onclick="closeCheatModal()" class="absolute top-3 right-3 text-white w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
        <i class="fa-solid fa-xmark text-base"></i>
      </button>

      <div class="flex items-center gap-2.5 mb-4">
        <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg border border-red-400 shadow-md">
          <i class="fa-solid fa-skull-crossbones"></i>
        </div>
        <div>
          <h3 class="font-black text-base text-white">MENU CHEAT GAME VIP</h3>
          <p class="text-[10px] text-slate-300 font-semibold">Pilihan Cheat Game Paling Stabil & Safe Anti-Ban</p>
        </div>
      </div>

      <div class="space-y-3 mb-4">
        <% cheatGames.forEach(cg => { %>
          <div class="bg-[#030712] p-3 rounded-xl border border-cyan-500/20 flex flex-col justify-between shadow-md">
            
            <div class="relative w-full h-20 rounded-lg overflow-hidden mb-2 bg-gradient-to-r <%= cg.badgeBg %> flex items-center justify-between px-4 border border-white/20">
              <img src="<%= cg.imgUrl %>" class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" alt="<%= cg.badge %>">
              <div class="z-10 flex items-center gap-2">
                <i class="fa-solid <%= cg.icon %> text-2xl text-white drop-shadow"></i>
                <span class="text-xs font-black text-white bg-slate-950/80 px-2 py-0.5 rounded border border-white/20">
                  <%= cg.badge %>
                </span>
              </div>
              <span class="z-10 text-xs font-black text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-400/30"><%= cg.price %></span>
            </div>

            <h4 class="text-xs font-extrabold text-white mb-1.5"><%= cg.title %></h4>
            
            <ul class="text-[10px] text-slate-300 space-y-1 mb-3 bg-[#0b1329] p-2 rounded-lg border border-cyan-500/10 font-medium">
              <% cg.specs.forEach(spec => { %>
                <li class="flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-red-400 text-[10px]"></i> <%= spec %></li>
              <% }) %>
            </ul>

            <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin,%20saya%20ingin%20membeli%20<%= encodeURIComponent(cg.title) %>%20seharga%20<%= encodeURIComponent(cg.price) %>" target="_blank" 
               class="w-full text-center py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black rounded-lg text-xs shadow-md hover:brightness-110">
              <i class="fa-brands fa-whatsapp mr-1 text-sm"></i> Order Cheat via WhatsApp
            </a>
          </div>
        <% }) %>
      </div>

      <button onclick="closeCheatModal()" class="w-full py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-600">
        Tutup Menu Cheat
      </button>
    </div>
  </div>

  <!-- POP-UP MODAL DETAIL PRODUK AKUN -->
  <div id="product-modal" class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#0b1329] border border-cyan-500/40 w-full max-w-sm rounded-2xl p-4 relative text-left shadow-2xl">
      <button onclick="closeProductModal()" class="absolute top-3 right-3 text-white w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
        <i class="fa-solid fa-xmark text-base"></i>
      </button>

      <div id="modal-banner" class="relative w-full h-32 rounded-xl mb-3 border border-white/20 flex flex-col items-center justify-center p-4 shadow-md overflow-hidden">
        <img id="modal-img" src="" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Game Logo">
        <i id="modal-icon" class="fa-solid text-4xl text-white mb-1 z-10 drop-shadow-lg"></i>
        <span id="modal-badge" class="z-10 text-xs font-black text-white tracking-widest bg-slate-950/80 px-2.5 py-0.5 rounded border border-white/20"></span>
      </div>
      
      <h3 id="modal-title" class="font-extrabold text-sm text-white mb-2"></h3>
      
      <div class="mb-3">
        <p class="text-[10px] text-cyan-300 mb-1 font-bold">Spesifikasi Lengkap Akun:</p>
        <ul id="modal-specs" class="text-[11px] text-slate-200 space-y-1 bg-[#030712] p-2.5 rounded-lg border border-cyan-500/20 font-medium">
        </ul>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-[9px] text-slate-400">Harga Akun</p>
          <p id="modal-price" class="text-base font-black text-amber-400"></p>
        </div>
        <span class="text-[10px] text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-2 py-1 rounded-md font-bold">
          <i class="fa-solid fa-shield-check"></i> Stock Verified
        </span>
      </div>

      <a id="modal-buy-btn" href="#" target="_blank" class="block w-full text-center py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl text-xs shadow-lg hover:brightness-110">
        <i class="fa-brands fa-whatsapp mr-1 text-sm"></i> Beli Akun via Admin WA
      </a>
    </div>
  </div>

  <!-- POP-UP MODAL JASA REKBER -->
  <div id="rekber-modal" class="fixed inset-0 bg-black/85 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#0b1329] border border-cyan-500/40 w-full max-w-sm rounded-2xl p-4 relative text-left shadow-2xl">
      <button onclick="closeRekberModal()" class="absolute top-3 right-3 text-white w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
        <i class="fa-solid fa-xmark text-base"></i>
      </button>

      <div class="flex items-center gap-2.5 mb-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg border border-emerald-400 shadow-md">
          <i class="fa-solid fa-handshake"></i>
        </div>
        <div>
          <h3 class="font-black text-sm text-white">Layanan Rekber Official</h3>
          <p class="text-[10px] text-slate-300">Rekening Bersama Amanah & Terpercaya</p>
        </div>
      </div>

      <div class="space-y-2 mb-4">
        <div class="bg-[#030712] p-3 rounded-xl border border-cyan-500/20">
          <p class="text-[10px] font-bold text-cyan-300 mb-1"><i class="fa-solid fa-check-circle mr-1"></i> Alur Kerja Rekber Kensho Mart:</p>
          <ul class="text-[10px] text-slate-200 space-y-1 list-disc list-inside font-medium">
            <li>Penjual & Pembeli sepakat harga transaksi.</li>
            <li>Pembeli mentransfer dana ke Rekening Admin Rekber.</li>
            <li>Penjual menyerahkan & amankan data akun ke pembeli.</li>
            <li>Dana dicairkan ke penjual jika akun aman.</li>
          </ul>
        </div>

        <div class="bg-[#030712] p-2.5 rounded-xl border border-cyan-500/20 flex justify-between items-center">
          <div>
            <p class="text-[10px] font-bold text-amber-400">Biaya Admin Rekber</p>
            <p class="text-[9px] text-slate-300">Sangat terjangkau mulai Rp 5.000</p>
          </div>
          <span class="text-[10px] font-black text-emerald-300 bg-emerald-950 border border-emerald-500/40 px-2 py-1 rounded-md">Low Fee</span>
        </div>
      </div>

      <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin,%20saya%20ingin%20menggunakan%20Jasa%20Rekber" target="_blank" class="block w-full text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-xl text-xs shadow-lg">
        <i class="fa-brands fa-whatsapp mr-1 text-sm"></i> Hubungi Admin Rekber
      </a>
    </div>
  </div>

  <!-- Bottom Floating Navbar -->
  <nav class="fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-[#0b1329]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-1.5 z-40 shadow-2xl">
    <div class="grid grid-cols-5 items-center text-center">
      <a href="#" class="flex flex-col items-center py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-extrabold shadow">
        <i class="fa-solid fa-house text-xs"></i>
        <span class="text-[8px] mt-0.5">Home</span>
      </a>

      <button onclick="scrollToKatalog()" class="flex flex-col items-center py-1 text-slate-300 hover:text-cyan-300">
        <i class="fa-solid fa-layer-group text-xs"></i>
        <span class="text-[8px] font-bold mt-0.5">Katalog</span>
      </button>

      <button onclick="openCheatModal()" class="flex flex-col items-center py-1 text-red-400 hover:text-red-300">
        <i class="fa-solid fa-skull-crossbones text-xs"></i>
        <span class="text-[8px] font-black mt-0.5">Cheat</span>
      </button>

      <button onclick="openRekberModal()" class="flex flex-col items-center py-1 text-emerald-400 hover:text-emerald-300">
        <i class="fa-solid fa-handshake text-xs"></i>
        <span class="text-[8px] font-bold mt-0.5">Rekber</span>
      </button>

      <a href="https://wa.me/<%= adminWa %>?text=Halo%20Admin,%20saya%20butuh%20bantuan" target="_blank" class="flex flex-col items-center py-1 text-slate-300 hover:text-cyan-300">
        <i class="fa-brands fa-whatsapp text-xs"></i>
        <span class="text-[8px] font-bold mt-0.5">WhatsApp</span>
      </a>
    </div>
  </nav>

  <!-- JavaScript Interaktif -->
  <script>
    const adminWa = "<%= adminWa %>";

    function filterCategory(catId, btn) {
      document.querySelectorAll('.category-btn').forEach(b => b.className = "category-btn flex-none px-3.5 py-2 rounded-xl border border-cyan-500/20 bg-[#0b1329] text-cyan-300 text-[11px] font-extrabold flex items-center gap-2 active:scale-95 transition");
      btn.className = "category-btn flex-none px-3.5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-black text-[11px] flex items-center gap-2 shadow-lg shadow-cyan-400/30 transition";

      const items = document.querySelectorAll('.product-item');
      items.forEach(item => {
        if (catId === 'all' || item.getAttribute('data-category') === catId) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function searchProduct() {
      const input = document.getElementById('search-input').value.toLowerCase();
      const items = document.querySelectorAll('.product-item');
      
      items.forEach(item => {
        const title = item.getAttribute('data-title');
        if (title.includes(input)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function scrollToKatalog() {
      document.getElementById('katalog-section').scrollIntoView({ behavior: 'smooth' });
    }

    function openCheatModal() {
      document.getElementById('cheat-modal').classList.remove('hidden');
    }

    function closeCheatModal() {
      document.getElementById('cheat-modal').classList.add('hidden');
    }

    function openProductModal(product) {
      const banner = document.getElementById('modal-banner');
      banner.className = `relative w-full h-32 rounded-xl mb-3 border border-white/20 flex flex-col items-center justify-center p-4 shadow-md overflow-hidden bg-gradient-to-br ${product.badgeBg}`;
      
      document.getElementById('modal-img').src = product.imgUrl;
      document.getElementById('modal-icon').className = `fa-solid ${product.icon} text-4xl text-white mb-1 z-10 drop-shadow-lg`;
      document.getElementById('modal-badge').innerText = product.badge;
      document.getElementById('modal-title').innerText = product.title;
      document.getElementById('modal-price').innerText = product.price;

      const specsList = document.getElementById('modal-specs');
      specsList.innerHTML = '';
      if(product.specs && product.specs.length > 0) {
        product.specs.forEach(spec => {
          specsList.innerHTML += `<li class="flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-cyan-400 text-[10px]"></i> ${spec}</li>`;
        });
      } else {
        specsList.innerHTML = `<li><i class="fa-solid fa-circle-check text-cyan-400"></i> Garansi Akun Sepaket</li>`;
      }

      const waText = encodeURIComponent(`Halo Admin Kensho Mart, saya ingin membeli ${product.title} seharga ${product.price}`);
      document.getElementById('modal-buy-btn').href = `https://wa.me/${adminWa}?text=${waText}`;

      document.getElementById('product-modal').classList.remove('hidden');
    }

    function closeProductModal() {
      document.getElementById('product-modal').classList.add('hidden');
    }

    function openRekberModal() {
      document.getElementById('rekber-modal').classList.remove('hidden');
    }

    function closeRekberModal() {
      document.getElementById('rekber-modal').classList.add('hidden');
    }
  </script>

</body>
</html>
EOF

node server.js
