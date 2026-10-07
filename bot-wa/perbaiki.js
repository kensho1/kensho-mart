const fs = require("fs");
const p = "jb.js";
let s = fs.readFileSync(p, "utf8");

if (!s.includes('const fs = require("fs");')) {
  console.log("Deklarasi fs tidak ditemukan.");
  process.exit(1);
}

if (s.includes("async function loginAdmin()")) {
  console.log("Fungsi login sudah ada.");
  process.exit(0);
}

fs.copyFileSync(p, "jb-backup-sebelum-login.js");

if (!s.includes('const crypto = require("crypto");')) {
  s = s.replace(
    'const readline = require("readline");',
    'const readline = require("readline");\nconst crypto = require("crypto");'
  );
}

const fungsi = `
async function loginAdmin() {
  const file = "admin-auth.json";

  if (!fs.existsSync(file)) {
    console.log("\\n=== BUAT PASSWORD ADMIN ===");
    const p1 = await tanya("Buat password admin: ");
    const p2 = await tanya("Ulangi password: ");

    if (p1.length < 8 || p1 !== p2) {
      console.log("Password minimal 8 karakter dan harus sama.");
      return false;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(p1, salt, 64).toString("hex");
    fs.writeFileSync(file, JSON.stringify({ salt, hash }, null, 2), { mode: 0o600 });
    console.log("Password admin berhasil dibuat.");
    return true;
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const password = await tanya("Password admin: ");
  const hash = crypto.scryptSync(password, data.salt, 64);
  const tersimpan = Buffer.from(data.hash, "hex");

  if (hash.length === tersimpan.length && crypto.timingSafeEqual(hash, tersimpan)) {
    console.log("Login admin berhasil.");
    return true;
  }

  console.log("Password salah. Akses ditolak.");
  return false;
}

`;

s = s.replace("async function menuAdmin() {", fungsi + "async function menuAdmin() {");

const lama = '  const pilih = await tanya("Pilih menu: ");\n  const data = bacaAkun();';
const baru = `  const pilih = await tanya("Pilih menu: ");

  if (["6", "8", "9", "10", "11"].includes(pilih)) {
    if (!(await loginAdmin())) {
      console.log("Akses admin ditolak.");
      await menuUtama();
      return;
    }
  }

  const data = bacaAkun();`;

const awal = s.indexOf("async function menuUtama()");
const bagian = s.slice(awal);

if (awal < 0 || !bagian.includes(lama)) {
  console.log("Pola menu tidak cocok. Backup tersedia; file utama tidak diubah.");
  process.exit(1);
}

s = s.slice(0, awal) + bagian.replace(lama, baru);
fs.writeFileSync(p, s);
console.log("Perbaikan selesai. Backup: jb-backup-sebelum-login.js");
