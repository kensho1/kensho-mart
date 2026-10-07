function responsPelanggan(pilihan) {
  switch (pilihan.trim()) {
    case "1":
      return `📦 DAFTAR PRODUK

Daftar produk sedang disiapkan.
Silakan hubungi admin untuk informasi produk yang tersedia.`;

    case "2":
      return `💰 CEK HARGA

Untuk melihat harga terbaru, silakan hubungi admin.`;

    case "3":
      return `🛒 CARA PEMESANAN

1. Pilih produk.
2. Tanyakan ketersediaan kepada admin.
3. Konfirmasi pesanan.
4. Lakukan pembayaran setelah mendapat instruksi admin.
5. Tunggu konfirmasi pesanan.`;

    case "4":
      return `👨‍💻 HUBUNGI ADMIN

Silakan hubungi admin melalui kontak resmi toko.`;

    case "menu":
      return require("./menu-pelanggan")();

    default:
      return `Pilihan tidak tersedia.

Ketik *menu* untuk melihat pilihan yang tersedia.`;
  }
}

module.exports = responsPelanggan;
