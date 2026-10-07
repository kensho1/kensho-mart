const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const ADMIN_WA = '6285813977768';

const categories = [
  { id: 'all', name: 'Semua', icon: 'fa-border-all' },
  { id: 'mlbb', name: 'MLBB', icon: 'fa-gamepad' },
  { id: 'ff', name: 'Free Fire', icon: 'fa-crosshairs' },
  { id: 'apps', name: 'App Premium', icon: 'fa-crown' },
  { id: 'sosmed', name: 'Suntik Sosmed', icon: 'fa-users' },
  { id: 'rekber', name: 'Jasa Rekber', icon: 'fa-handshake' }
];

const cheatGames = [
  {
    id: 'cheat-mlbb',
    title: 'Cheat MLBB VIP (Maphack & Drone View)',
    badge: 'MLBB VIP',
    badgeBg: 'from-blue-600 via-indigo-600 to-blue-900',
    icon: 'fa-gamepad',
    imgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
    price: 'Rp 50.000 / Bln',
    specs: ['Drone View 2x - 5x', 'Maphack Icon Radar', 'Auto Aim Skill', 'Support Android & iOS']
  },
  {
    id: 'cheat-ff',
    title: 'Cheat Free Fire VIP (Auto Headshot)',
    badge: 'FREE FIRE',
    badgeBg: 'from-orange-600 via-red-600 to-amber-800',
    icon: 'fa-crosshairs',
    imgUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80',
    price: 'Rp 45.000 / Bln',
    specs: ['Auto Headshot 100%', 'Aimbot & Aimlock', 'Antena / ESP Body', 'Safe Main Account']
  }
];

const products = [
  {
    id: 1,
    category: 'mlbb',
    title: 'AKUN MLBB',
    price: 'Rp 150.000',
    sold: 241,
    stock: 2,
    badge: 'MLBB',
    badgeBg: 'from-blue-600 via-indigo-600 to-blue-950',
    icon: 'fa-gamepad',
    imgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
    specs: ['Hero: 110+', 'Skin: 140+ (Collector & Epic)', 'Emblem: Max All', 'Unbind Moonton Sepaket']
  },
  {
    id: 2,
    category: 'ff',
    title: 'AKUN FF OLD - INCUBATOR FULL',
    price: 'Rp 280.000',
    sold: 576,
    stock: 1,
    badge: 'FREE FIRE',
    badgeBg: 'from-orange-600 via-amber-600 to-red-950',
    icon: 'fa-crosshairs',
    imgUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80',
    specs: ['Vault: Baju Old Complete', 'Set Incubator & Bandit', 'Weapon: Titan Scar', 'FB Single Unbind']
  },
  {
    id: 4,
    category: 'apps',
    title: 'SPOTIFY PREMIUM 1 BULAN (INDIVIDUAL)',
    price: 'Rp 15.000',
    sold: 890,
    stock: 20,
    badge: 'APPS',
    badgeBg: 'from-emerald-600 via-teal-600 to-emerald-950',
    icon: 'fa-crown',
    imgUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80',
    specs: ['Garansi Full 30 Hari', 'Akun Private / Email Sendiri', 'Bisa Download Offline', 'No Ads']
  },
  {
    id: 5,
    category: 'sosmed',
    title: 'SUNTIK 1000 FOLLOWERS INSTAGRAM',
    price: 'Rp 25.000',
    sold: 430,
    stock: 50,
    badge: 'SOSMED',
    badgeBg: 'from-pink-600 via-rose-600 to-purple-950',
    icon: 'fa-users',
    imgUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&q=80',
    specs: ['Proses Tanpa Password', 'Hanya Butuh Username', 'Proses 1-12 Jam', 'Drop Max 5% High Quality']
  }
];

const testimonials = [
  { name: 'Rizky MLBB', text: 'Akun sesuai deskripsi, proses rekber cuma 5 menit langsung beres. Mantap Kensho Mart!', rating: 5 },
  { name: 'Dimas FF', text: 'Beli cheat VIP-nya work 100% aman gak kena banned. Recommended seller!', rating: 5 },
  { name: 'Andi Store', text: 'Admin ramah dan cepat respon pas transaksi rekber. Sukses terus Kensho!', rating: 5 }
];

app.get('/', (req, res) => {
  res.render('index', { categories, products, cheatGames, testimonials, adminWa: ADMIN_WA });
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 KENSHO MART STORE ULTIMATE RUNNING!`);
  console.log(`🌐 Akses di Browser: http://localhost:${PORT}`);
  console.log(`=================================`);
});
