const os = require("os");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("================================");
console.log("       🛠️ KENSHO TOOLS");
console.log("================================");
console.log("1. Cek Tanggal dan Waktu");
console.log("2. Cek Versi Node.js");
console.log("3. Cek Informasi Sistem");
console.log("0. Keluar");
console.log("================================");

rl.question("Pilih tools: ", (pilihan) => {
  if (pilihan === "1") {
    console.log("Tanggal dan Waktu:", new Date().toLocaleString("id-ID"));
  } else if (pilihan === "2") {
    console.log("Node.js:", process.version);
  } else if (pilihan === "3") {
    console.log("Sistem:", os.platform());
    console.log("Arsitektur:", os.arch());
    console.log("Memori Total:", Math.round(os.totalmem() / 1024 / 1024), "MB");
    console.log("Memori Bebas:", Math.round(os.freemem() / 1024 / 1024), "MB");
  } else if (pilihan === "0") {
    console.log("Kensho Tools ditutup.");
  } else {
    console.log("Pilihan tidak tersedia.");
  }

  rl.close();
});
