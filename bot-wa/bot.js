const readline = require("readline");
const { spawnSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function jalankanFile(file) {
  const hasil = spawnSync(process.execPath, [file], {
    stdio: "inherit"
  });

  if (hasil.error) {
    console.log("Gagal membuka file:", hasil.error.message);
  }
}

function menuUtama() {
  console.clear();

  console.log("================================");
  console.log("        🤖 KENSHO BOT");
  console.log("================================");
  console.log("1. 🐞 Bug Tools");
  console.log("2. 👑 Owner");
  console.log("3. 🛠️ Tools");
  console.log("4. 🛒 JB Akun");
  console.log("5. 🎮 Game");
  console.log("6. 🤖 AI Chat");
  console.log("7. 🖼️ Buat Stiker");
  console.log("0. Keluar");
  console.log("================================");

  rl.question("Pilih menu: ", (pilihan) => {
    if (pilihan === "1") {
      jalankanFile("cek.js");
    } else if (pilihan === "2") {
      jalankanFile("owner.js");
    } else if (pilihan === "3") {
      jalankanFile("tools.js");
    } else if (pilihan === "4") {
      jalankanFile("jb.js");
    } else if (pilihan === "0") {
      console.log("Kensho Bot ditutup.");
      rl.close();
      return;
    } else if (["5", "6", "7"].includes(pilihan)) {
      console.log("Fitur ini akan dibuat nanti.");
    } else {
      console.log("Pilihan tidak tersedia.");
    }

    rl.question("\nTekan Enter untuk kembali ke menu utama...", () => {
      menuUtama();
    });
  });
}

menuUtama();
