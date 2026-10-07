const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const categories = [
  { id: 'all', name: 'Semua', icon: 'fa-border-all', active: true },
  { id: 'mlbb', name: 'MLBB', icon: 'fa-gamepad' },
  { id: 'ff', name: 'Free Fire', icon: 'fa-crosshairs' },
  { id: 'pubg', name: 'PUBG', icon: 'fa-shield-halved' },
  { id: 'codm', name: 'CODM', icon: 'fa-gun' },
  { id: 'genshin', name: 'Genshin', icon: 'fa-wand-magic-sparkles' },
  { id: 'rekber', name: 'Jasa Rekber', icon: 'fa-handshake' },
];

const products = [
  {
    id: 1,
    category: 'mlbb',
    title: 'AKUN MLBB - S30 MYTHIC GLORY',
    price: 'Rp 150.000',
    sold: 241,
    badge: 'MLBB',
    badgeBg: 'from-blue-600 to-indigo-900',
    icon: 'fa-gamepad',
    isBest: true,
    specs: ['Hero: 110+', 'Skin: 140+ (Collector & Epic)', 'Emblem: Max All', 'Status: All Unbind (Moonton Sepaket)']
  },
  {
    id: 2,
    category: 'ff',
    title: 'AKUN FF OLD - INCUBATOR FULL',
    price: 'Rp 280.000',
    sold: 576,
    badge: 'FREE FIRE',
    badgeBg: 'from-orange-600 to-amber-800',
    icon: 'fa-crosshairs',
    isBest: true,
    specs: ['Vault: Rame Baju Old', 'Set Incubator & Bandit', 'Weapon: Titan Scar & AK Dragon', 'Login: FB Single Unbind']
  },
  {
    id: 3,
    category: 'pubg',
    title: 'AKUN PUBG - M4 GLACIER LEVEL 6',
    price: 'Rp 350.000',
    sold: 263,
    badge: 'PUBG',
    badgeBg: 'from-amber-500 to-yellow-800',
    icon: 'fa-shield-halved',
    isBest: false,
    specs: ['M416 Glacier Max / Lv 6', 'Level Akun: 68 Global', 'RP: Max S20-S30', 'Login: Twitter + Email FB Off']
  },
  {
    id: 4,
    category: 'mlbb',
    title: 'AKUN MLBB - ALL HERO SKIN RAME',
    price: 'Rp 220.000',
    sold: 346,
    badge: 'MLBB',
    badgeBg: 'from-blue-600 to-indigo-900',
    icon: 'fa-gamepad',
    isBest: false,
    specs: ['Hero: Full 120+', 'Skin: Lightborn + Venom + SABER', 'Winrate: 62% Overall', 'Status: Clean No Minus']
  },
  {
    id: 5,
    category: 'ff',
    title: 'AKUN FF - TITAN SCAR & BUNNY',
    price: 'Rp 190.000',
    sold: 345,
    badge: 'FREE FIRE',
    badgeBg: 'from-orange-600 to-amber-800',
    icon: 'fa-crosshairs',
    isBest: false,
    specs: ['Baju Bunny Old', 'Weapon Skin Rame', 'Emote Full 6 Slot', 'Login: Google Single (Garansi)']
  },
  {
    id: 6,
    category: 'codm',
    title: 'AKUN CODM - CP RAME & LEGENDARY',
    price: 'Rp 310.000',
    sold: 480,
    badge: 'CODM',
    badgeBg: 'from-emerald-600 to-teal-900',
    icon: 'fa-gun',
    isBest: true,
    specs: ['Weapon Legendary: 3 Gun', 'CP Sisa: 1.200 CP', 'Battle Pass Season Unlocked', 'Login: Garena Clean']
  }
];

const updates = [
  { time: '10 Menit lalu', title: 'Stok Akun MLBB Mythic Glory telah ditambahkan!' },
  { time: '1 Jam lalu', title: 'Promo Rekber Bebas Biaya Admin khusus transaksi pertama.' },
  { time: '3 Jam lalu', title: 'Update Akun FF Titan Scar + Bunny siap diproses.' }
];

const ADMIN_WA = '6281234567890'; // Ganti dengan nomor WA Anda

app.get('/', (req, res) => {
  res.render('index', { categories, products, updates, adminWa: ADMIN_WA });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 KENSHO MART STORE RUNNING!`);
  console.log(`🌐 Akses di Browser: http://localhost:${PORT}`);
  console.log(`=================================`);
});
