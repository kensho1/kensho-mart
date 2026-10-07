async function dapatkanMenuKensho() {
  return `*KENSHO MART & JB AKUN*

*Status Bot:* 🟢 Online (24 Hours)
*Admin JB:* Ready Transaksi
*Layanan:* JB Akun Game & Rekber

*DAFTAR MENU UTAMA:*
1. Stok Akun Game Ready
2. List Fee Rekber JB
3. Format Transaksi Rekber
4. Panduan Secured / Amankan Akun
5. Contact Admin / Owner JB
6. Metode Pembayaran / Payment
7. Format Titip Jual Akun
8. Testimoni & Group Resmi

💡 *Ketik angka pilihan (Contoh: 1) untuk melihat detail.*`;
}

async function dapatkanStokAkun() {
  return `*KATALOG STOK AKUN READY*

1. 🎮 *MOBILE LEGENDS (MLBB)*
   Ketik *1.1* atau *ML* untuk detail.

2. 🎯 *FREE FIRE (FF)*
   Ketik *1.2* atau *FF* untuk detail.

3. 🔫 *PUBG MOBILE*
   Ketik *1.3* atau *PUBG* untuk detail.

4. ⚔️️ *GENSHIN IMPACT / HSR*
   Ketik *1.4* atau *GI* untuk detail.

5. 📺 *AKUN PREMIUM*
   Ketik *1.5* atau *VIP* untuk detail.

💡 *Ketik MENU untuk kembali ke menu utama.*`;
}

async function dapatkanDetailGame(kode) {
  if (kode === '1.1' || kode === 'ML') {
    return `🎮 *STOK MOBILE LEGENDS (MLBB)*\n\n• *Status:* Ready Monsep All Unbind\n• *Range Harga:* Rp 50.000 - Rp 1.500.000\n\n💡 Ketik *5* untuk hubungi Admin jika berminat!`;
  } else if (kode === '1.2' || kode === 'FF') {
    return `🎯 *STOK FREE FIRE (FF)*\n\n• *Status:* Ready Akun Old / S1-S5\n• *Range Harga:* Rp 30.000 - Rp 800.000\n\n💡 Ketik *5* untuk hubungi Admin jika berminat!`;
  } else if (kode === '1.3' || kode === 'PUBG') {
    return `🔫 *STOK PUBG MOBILE*\n\n• *Status:* Ready Vault / Set Rare\n• *Range Harga:* Rp 100.000 - Rp 2.000.000\n\n💡 Ketik *5* untuk hubungi Admin jika berminat!`;
  } else if (kode === '1.4' || kode === 'GI') {
    return `⚔️ *STOK GENSHIN / HSR*\n\n• *Status:* Ready Starter & End-Game\n• *Range Harga:* Rp 25.000 - Rp 500.000\n\n💡 Ketik *5* untuk hubungi Admin jika berminat!`;
  } else if (kode === '1.5' || kode === 'VIP') {
    return `📺 *STOK AKUN PREMIUM*\n\n• Netflix / Spotify / Canva Pro Ready\n• *Range Harga:* Rp 15.000 - Rp 50.000\n\n💡 Ketik *5* untuk hubungi Admin jika berminat!`;
  }
}

async function dapatkanFeeKensho() {
  return `*DAFTAR FEE REKBER JB - KENSHO MART*

*Nominal Transaksi & Fee:*
• Rp 10.000 - Rp 50.000    : Fee Rp 2.000
• Rp 50.001 - Rp 100.000  : Fee Rp 3.000
• Rp 100.001 - Rp 250.000 : Fee Rp 5.000
• Rp 250.001 - Rp 500.000 : Fee Rp 8.000
• > Rp 500.000            : Fee 2% dari nominal

*Pembayaran / Transfer:*
DANA • OVO • GOPAY • SHOPEEPAY • QRIS • ALL BANK

💡 *Ketik 3 untuk mengambil Format Transaksi Rekber.*`;
}

async function dapatkanFormatKensho() {
  return `*FORMAT TRANSAKSI REKBER - KENSHO MART*

Silakan salin & isi data transaksi:

• Penjual : 
• Pembeli : 
• Jenis Game/Akun : (Contoh: MLBB Monsep)
• Login Via : (Moonton / VK / Gmail / FB)
• Nominal Harga : Rp 
• Fee Rekber Oleh : (Penjual / Pembeli)

💡 *Kirim format yang sudah diisi ke grup rekber atau chat Admin.*`;
}

async function dapatkanPanduanSecured() {
  return `*PANDUAN AMANKAN AKUN (SECURED) - KENSHO MART*

1. Pembeli wajib cek kelengkapan data akun saat dikirim.
2. Ganti password & ubah ke email pribadi pembeli.
3. Unbind / lepaskan semua kaitan akun 3rd party penjual.
4. Wajib rekam screen recording (video tanpa jeda/cut) saat pengecekan.
5. Jika akun sudah aman, konfirmasi ke Admin untuk pencairan dana.

💡 *Keamanan & transparansi transaksi adalah prioritas utama!*`;
}

async function dapatkanPayment() {
  return `*METODE PEMBAYARAN RESMI - KENSHO MART*

💳 *E-Wallet & Bank Resmi:*
• DANA  : 085813977768 (A/N RANGGA RAMDANI)
• GoPay : 085813977768 (A/N RANGGA RAMDANI)
• OVO   : 085813977768 (A/N RANGGA RAMDANI)
• Bank seabank : 901484429951 (A/N RANGGA RAMDANI)

📱 *QRIS All Payment:*
Dapat dipindai menggunakan seluruh aplikasi M-Banking & E-Wallet.

⚠️ *CATATAN PENTING:*
1. Selalu periksa nama pemilik rekening sebelum mentransfer.
2. Kirimkan bukti transfer/pembayaran yang sah ke Admin.
3. Transaksi di luar rekening/e-wallet resmi di atas bukan tanggung jawab Kensho Mart.`;
}

async function dapatkanFormatTitip() {
  return `*FORMULIR TITIP JUAL AKUN - KENSHO MART*

Silakan salin & isi data akun yang ingin dijual:

• Jenis Game : (MLBB / FF / PUBG / dll)
• Spesifikasi Singkat : 
• Login Via : 
• Harga NETT : Rp 
• Kontak Penjual : 

💡 *Kirim format ini beserta foto/screenshot akun ke Admin (5).*`;
}

async function dapatkanTestimoni() {
  return `*INFORMASI & TESTIMONI - KENSHO MART*

🌟 *Bukti Transaksi / Testimoni:*
• Channel WhatsApp / Telegram: (Isi Link Channel)

📢 *Group Rekber Resmi:*
• Group Rekber #1: (Isi Link Group)

💡 *Pastikan selalu bertransaksi di dalam grup resmi Kensho Mart untuk menghindari penipuan!*`;
}

module.exports = {
  dapatkanMenuKensho,
  dapatkanStokAkun,
  dapatkanDetailGame,
  dapatkanFeeKensho,
  dapatkanFormatKensho,
  dapatkanPanduanSecured,
  dapatkanPayment,
  dapatkanFormatTitip,
  dapatkanTestimoni
};
