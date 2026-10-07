const produk = require("./produk.json");
const kontak = require("./kontak.json");

function menuPelanggan() {
  return `🤖 KENSHO BOT

Selamat datang!

Silakan pilih menu:

1. Daftar Produk
2. Cek Harga
3. Cara Pemesanan
4. Hubungi Admin

Ketik angka pilihan kamu.`;
}

function daftarProduk() {
  let hasil = "🛒 DAFTAR PRODUK\n\n";

  for (const game in produk) {
    hasil += `🎮 ${game}\n`;

    produk[game].forEach((item, index) => {
      hasil += `${index + 1}. ${item.nama} - Rp${item.harga.toLocaleString("id-ID")}\n`;
    });

    hasil += "\n";
  }

  return hasil;
}

function balasPelanggan(teks) {
  const pilihan = teks.trim().toLowerCase();

  if (pilihan === "menu") return menuPelanggan();

  if (pilihan === "1" || pilihan === "2") {
    return daftarProduk();
  }

  if (pilihan === "3") {
    return `📦 CARA PEMESANAN

1. Pilih produk.
2. Hubungi admin untuk konfirmasi stok.
3. Lakukan pembayaran setelah mendapat instruksi admin.
4. Kirim bukti pembayaran.
5. Tunggu konfirmasi pesanan.

Jangan mengirim pembayaran sebelum mendapat konfirmasi admin.`;
  }

  if (pilihan === "4") {
    const admin = String(kontak.admin || "").replace(/\D/g, "");

    if (!admin) {
      return "👨‍💻 Nomor admin belum diatur.";
    }

    return `👨‍💻 HUBUNGI ADMIN

WhatsApp Admin:
https://wa.me/${admin}`;
  }

  return "Pilihan tidak tersedia.\nKetik menu untuk melihat pilihan.";
}

module.exports = { balasPelanggan };
