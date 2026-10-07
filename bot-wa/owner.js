const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menuOwner() {
  console.clear();

  console.log("================================");
  console.log("       👑 KENSHO OWNER");
  console.log("================================");
  console.log("1. Informasi Owner");
  console.log("2. Status Bot");
  console.log("3. Pengaturan Bot");
  console.log("0. Keluar");
  console.log("================================");

  rl.question("Pilih menu: ", (pilihan) => {
    if (pilihan === "1") {
      console.log("👑 OWNER: KENSHO");
    } else if (pilihan === "2") {
      console.log("🤖 STATUS: Bot berjalan di Termux");
    } else if (pilihan === "3") {
      console.log("🛠️ Pengaturan Kensho Bot");
    } else if (pilihan === "0") {
      console.log("Menu Owner ditutup.");
    } else {
      console.log("Pilihan tidak tersedia.");
    }

    rl.close();
  });
}

menuOwner();
