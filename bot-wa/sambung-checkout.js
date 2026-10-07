const fs = require("fs");

const file = "jb.js";
const kode = fs.readFileSync(file, "utf8");
const awal = '  } else if (pilih === "7") {';
const akhir = '  } else if (pilih === "8") {';

const a = kode.indexOf(awal);
const b = kode.indexOf(akhir, a + awal.length);

if (a < 0 || b < 0) {
  console.log("Bagian checkout tidak ditemukan. File tidak diubah.");
  process.exit(1);
}

const baru = [
  '  } else if (pilih === "7") {',
  '    const id = (await tanya("Masukkan ID akun yang ingin dipesan: ")).trim();',
  '    const akun = bacaAkun().find(a => a.id === id && a.status === "Tersedia");',
  '    if (!akun) {',
  '      console.log("Akun tidak ditemukan atau sudah terjual.");',
  '    } else {',
  '      console.log("=== DETAIL PESANAN ===");',
  '      console.log("Nama:", akun.nama);',
  '      console.log("Rank:", akun.rank);',
  '      console.log("Skin:", akun.skin);',
  '      console.log("Harga: Rp" + akun.harga.toLocaleString("id-ID"));',
  '      const namaPemesan = await tanya("Nama pemesan: ");',
  '      const hasil = require("./pesanan-service").buatPesanan(id, namaPemesan);',
  '      if (!hasil.ok) {',
  '        console.log(hasil.pesan);',
  '      } else {',
  '        console.log(hasil.pesan);',
  '        console.log("Nomor pesanan:", hasil.pesanan.nomor);',
  '        console.log("Status: Menunggu konfirmasi admin");',
  '      }',
  '    }',
  ''
].join("\n");

fs.writeFileSync(file, kode.slice(0, a) + baru + kode.slice(b));
console.log("Checkout berhasil disambungkan.");
