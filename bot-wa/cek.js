const fs = require("fs");
const { execFileSync } = require("child_process");

console.log("================================");
console.log("     🐞 KENSHO BUG CHECKER");
console.log("================================");

const file = process.argv[2];

if (!file) {
  console.log("Cara pakai:");
  console.log("node cek.js bot.js");
  process.exit(0);
}

if (!fs.existsSync(file)) {
  console.log("File tidak ditemukan:", file);
  process.exit(1);
}

try {
  execFileSync(process.execPath, ["--check", file], {
    stdio: "pipe"
  });

  console.log("✅ File:", file);
  console.log("Tidak ditemukan kesalahan sintaks!");
} catch (error) {
  console.log("❌ Ditemukan kesalahan pada:", file);
  console.log(error.stderr?.toString() || error.message);
}

console.log("================================");
