const fs = require("fs");
const path = require("path");

const fileAkun = path.join(__dirname, "akun.json");
const filePesanan = path.join(__dirname, "pesanan.json");

function buatPesanan(id, namaPemesan) {
  if (!fs.existsSync(fileAkun) || !fs.existsSync(filePesanan)) {
    return { ok: false, pesan: "File data akun atau pesanan tidak ditemukan." };
  }

  const nama = String(namaPemesan || "").trim();
  if (!nama) {
    return { ok: false, pesan: "Nama pemesan tidak boleh kosong." };
  }

  let akunList;
  let pesananList;

  try {
    akunList = JSON.parse(fs.readFileSync(fileAkun, "utf8"));
    pesananList = JSON.parse(fs.readFileSync(filePesanan, "utf8"));
  } catch {
    return { ok: false, pesan: "Data JSON tidak valid. Data tidak diubah." };
  }

  if (!Array.isArray(akunList) || !Array.isArray(pesananList)) {
    return { ok: false, pesan: "Format data tidak sesuai. Data tidak diubah." };
  }

  const akun = akunList.find(a => String(a.id) === String(id));

  if (!akun || akun.status !== "Tersedia") {
    return { ok: false, pesan: "Akun tidak ditemukan atau sudah terjual." };
  }

  const aktif = pesananList.some(p =>
    p.idAkun === akun.id &&
    !["Selesai", "Dibatalkan"].includes(p.status)
  );

  if (aktif) {
    return { ok: false, pesan: "Akun sedang memiliki pesanan aktif." };
  }

  const pesanan = {
    nomor: "ORD-" + Date.now(),
    namaPemesan: nama,
    idAkun: akun.id,
    namaAkun: akun.nama,
    harga: akun.harga,
    status: "Menunggu konfirmasi admin",
    metodePembayaran: "",
    jumlahDibayar: 0,
    statusPembayaran: "Belum dibayar",
    pembayaranTerverifikasi: false
  };

  pesananList.push(pesanan);

  try {
    fs.writeFileSync(filePesanan, JSON.stringify(pesananList, null, 2));
  } catch {
    return { ok: false, pesan: "Pesanan gagal disimpan." };
  }

  return { ok: true, pesan: "Pesanan berhasil dibuat.", pesanan };
}

module.exports = { buatPesanan };
