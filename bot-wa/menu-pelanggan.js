

const ADMIN_WA = "6285813977768";
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function bacaAkun() {
  return JSON.parse(fs.readFileSync("akun.json", "utf8"));
}

function daftarAkun() {
  const akun = bacaAkun();
  const tersedia = akun.filter(a => a.status === "Tersedia");

  console.log("\n=== DAFTAR AKUN TERSEDIA ===");

  if (tersedia.length === 0) {
    console.log("Belum ada akun tersedia.");
    return;
  }

  tersedia.forEach(a => {
    console.log("----------------------------");
    console.log("ID    :", a.id);
    console.log("Nama  :", a.nama);
    console.log("Rank  :", a.rank);
    console.log("Skin  :", a.skin);
    console.log("Harga : Rp" + a.harga.toLocaleString("id-ID"));
    console.log("Status:", a.status);
  });

  console.log("----------------------------");
}

function cekHarga(callback) {
  rl.question("\nMasukkan ID akun: ", (id) => {
    const akun = bacaAkun().find(a => a.id === id.trim());

    if (!akun) {
      console.log("ID akun tidak ditemukan.");
    } else if (akun.status !== "Tersedia") {
      console.log("Maaf, akun ini sudah terjual.");
    } else {
      console.log("\n=== INFORMASI HARGA ===");
      console.log("Nama  :", akun.nama);
      console.log("Rank  :", akun.rank);
      console.log("Harga : Rp" + akun.harga.toLocaleString("id-ID"));
      console.log("Status:", akun.status);
    }

rl.question("\nTekan Enter untuk kembali...", () => callback());  });
}

function menuPelanggan() {
  console.clear();

  console.log("================================");
  console.log("       🤖 MENU PELANGGAN");
  console.log("================================");
  console.log("1. 🛒 Daftar Akun");
  console.log("2. 💰 Cek Harga");
  console.log("3. 📦 Cara Pemesanan");
  console.log("4. 👨‍💻 Hubungi Admin");
  console.log("0. Kembali");
  console.log("================================");

  rl.question("Pilih menu: ", (pilihan) => {
    if (pilihan === "1") {
      daftarAkun();
    } else if (pilihan === "2") {
      return cekHarga(() => menuPelanggan());
    } else if (pilihan === "3") {
      console.log("\n=== CARA PEMESANAN ===");
      console.log("1. Pilih akun yang tersedia.");
      console.log("2. Hubungi admin.");
      console.log("3. Konfirmasi pembayaran.");
      console.log("4. Tunggu proses penyerahan akun.");
    } else if (pilihan === "4") {
if (ADMIN_WA && /^[0-9]{10,15}$/.test(ADMIN_WA)) {
      console.log("\nWhatsApp Admin: +" + ADMIN_WA);
      console.log("Link: https://wa.me/" + ADMIN_WA);
    } else {
      console.log("\nNomor admin belum diatur. Isi ADMIN_WA di file menu-pelanggan.js.");
    }
    } else if (pilihan === "0") {
      rl.close();
      return;
    } else {
      console.log("\nPilihan tidak tersedia.");
    }

    rl.question("\nTekan Enter untuk kembali...", () => {
      menuPelanggan();
    });
  });
}

menuPelanggan();
