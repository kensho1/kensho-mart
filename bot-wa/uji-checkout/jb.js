const fs = require("fs");
const readline = require("readline");
const crypto = require("crypto");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tanya = (teks) => new Promise(resolve => rl.question(teks, resolve));

function bacaAkun() {
  try {
    return JSON.parse(fs.readFileSync("akun.json", "utf8"));
  } catch {
    console.log("Gagal membaca akun.json");
    return [];
  }
}

function simpanAkun(data) {
  fs.writeFileSync("akun.json", JSON.stringify(data, null, 2));
}


async function loginAdmin() {
  const file = "admin-auth.json";

  if (!fs.existsSync(file)) {
    console.log("\n=== BUAT PASSWORD ADMIN ===");
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

async function menuAdmin() {
  console.log("\n=== ADMIN JB ===");
  console.log("1. Lihat daftar akun");
  console.log("2. Tambah akun");
  console.log("3. Ubah harga");
  console.log("4. Ubah status");
  console.log("0. Kembali");

  const pilih = await tanya("Pilih: ");
  let data = bacaAkun();

  if (pilih === "1") {
    console.table(data);
  } else if (pilih === "2") {
    const id = await tanya("ID akun: ");
    if (data.some(a => a.id === id)) {
      console.log("ID sudah digunakan.");
    } else {
      const nama = await tanya("Nama akun: ");
      const rank = await tanya("Rank: ");
      const skin = Number(await tanya("Jumlah skin: "));
      const harga = Number(await tanya("Harga (angka saja): "));

      if (!nama || !rank || !Number.isInteger(skin) || skin < 0 ||
          !Number.isFinite(harga) || harga < 0) {
        console.log("Data tidak valid.");
      } else {
        data.push({ id, nama, rank, skin, harga, status: "Tersedia" });
        simpanAkun(data);
        console.log("Akun berhasil ditambahkan.");
      }
    }
  } else if (pilih === "3") {
    const id = await tanya("ID akun: ");
    const akun = data.find(a => a.id === id);
    if (!akun) {
      console.log("Akun tidak ditemukan.");
    } else {
      const harga = Number(await tanya("Harga baru (angka saja): "));
      if (!Number.isFinite(harga) || harga < 0) {
        console.log("Harga tidak valid.");
      } else {
        akun.harga = harga;
        simpanAkun(data);
        console.log("Harga berhasil diubah.");
      }
    }
  } else if (pilih === "4") {
    const id = await tanya("ID akun: ");
    const akun = data.find(a => a.id === id);
    if (!akun) {
      console.log("Akun tidak ditemukan.");
    } else {
      const status = await tanya("Ketik Tersedia atau Terjual: ");
      if (!["Tersedia", "Terjual"].includes(status)) {
        console.log("Status tidak valid.");
      } else {
        akun.status = status;
        simpanAkun(data);
        console.log("Status berhasil diubah.");
      }
    }
  } else if (pilih !== "0") {
    console.log("Pilihan tidak tersedia.");
  }

  if (pilih !== "0") await menuAdmin();
}

async function menuUtama() {
  console.log("\n=== JB AKUN ===");
  console.log("1. Daftar Akun");
  console.log("2. Cek Harga");
  console.log("3. Cari Akun");
  console.log("4. Cara Pemesanan");
  console.log("5. Hubungi Admin");
  console.log("6. Admin JB");
  console.log("7. Checkout Pesanan");
  console.log("8. Admin Pesanan");
  console.log("9. Ubah Status Pesanan");
  console.log("10. Catat Pembayaran");
  console.log("11. Laporan Penjualan");
  console.log("0. Kembali");

  const pilih = await tanya("Pilih menu: ");

  if (["6", "8", "9", "10", "11"].includes(pilih)) {
    if (!(await loginAdmin())) {
      console.log("Akses admin ditolak.");
      await menuUtama();
      return;
    }
  }

  const data = bacaAkun();

  if (pilih === "1") {
    console.table(data.filter(a => a.status === "Tersedia"));
  } else if (pilih === "2") {
    data.filter(a => a.status === "Tersedia").forEach(a => console.log(
      `${a.id} | ${a.nama} | Rp${a.harga.toLocaleString("id-ID")} | ${a.status}`
    ));
  } else if (pilih === "3") {
    const id = await tanya("Masukkan ID akun (contoh 001): ");
    const akun = data.find(a => a.id === id);
    if (akun) console.table([akun]);
    else console.log("Akun tidak ditemukan.");
  } else if (pilih === "4") {
    console.log("Hubungi admin untuk konfirmasi akun dan pembayaran.");
  } else if (pilih === "5") {
    console.log("Kontak admin akan ditambahkan nanti.");
  } else if (pilih === "6") {
    await menuAdmin();
  } else if (pilih === "7") {
    const id = (await tanya("Masukkan ID akun yang ingin dipesan: ")).trim();
    const akun = bacaAkun().find(a => a.id === id && a.status === "Tersedia");

    if (!akun) {
      console.log("Akun tidak ditemukan atau sudah terjual.");
    } else {
      const pesanan = JSON.parse(fs.readFileSync("pesanan.json", "utf8"));
      const aktif = pesanan.some(p =>
        p.idAkun === akun.id &&
        !["Selesai", "Dibatalkan"].includes(p.status)
      );

      if (aktif) {
        console.log("Akun sedang memiliki pesanan aktif.");
      } else {
        console.log("=== DETAIL PESANAN ===");
        console.log("Nama:", akun.nama);
        console.log("Rank:", akun.rank);
        console.log("Skin:", akun.skin);
        console.log("Harga: Rp" + akun.harga.toLocaleString("id-ID"));

        const namaPemesan = await tanya("Nama pemesan: ");

        if (!namaPemesan.trim()) {
          console.log("Nama pemesan tidak boleh kosong.");
        } else {
          const nomor = "ORD-" + Date.now();

          pesanan.push({
            nomor,
            namaPemesan: namaPemesan.trim(),
            idAkun: akun.id,
            namaAkun: akun.nama,
            harga: akun.harga,
            status: "Menunggu konfirmasi admin",
            metodePembayaran: "",
            jumlahDibayar: 0,
            statusPembayaran: "Belum dibayar",
            pembayaranTerverifikasi: false
          });

          fs.writeFileSync("pesanan.json", JSON.stringify(pesanan, null, 2));
          console.log("Pesanan berhasil dibuat!");
          console.log("Nomor pesanan:", nomor);
          console.log("Status: Menunggu konfirmasi admin");
        }
      }
    }
  } else if (pilih === "8") {
    const pesanan = JSON.parse(fs.readFileSync("pesanan.json", "utf8"));
    console.log("=== DAFTAR PESANAN MASUK ===");

    if (pesanan.length === 0) {
      console.log("Belum ada pesanan.");
    } else {
      console.table(pesanan);
    }
  } else if (pilih === "9") {
    const pesanan = JSON.parse(fs.readFileSync("pesanan.json", "utf8"));

    if (pesanan.length === 0) {
      console.log("Belum ada pesanan.");
    } else {
      console.table(pesanan);

      const nomor = await tanya("Masukkan nomor pesanan: ");
      const item = pesanan.find(p => p.nomor === nomor.trim());

      if (!item) {
        console.log("Nomor pesanan tidak ditemukan.");
      } else {
        console.log("1. Menunggu konfirmasi admin");
        console.log("2. Pembayaran dikonfirmasi");
        console.log("3. Selesai");
        console.log("4. Dibatalkan");

        const statusPilih = await tanya("Pilih status baru: ");
        const status = {
          "1": "Menunggu konfirmasi admin",
          "2": "Pembayaran dikonfirmasi",
          "3": "Selesai",
          "4": "Dibatalkan"
        }[statusPilih];

        if (!status) {
          console.log("Pilihan status tidak valid.");
        } else if (status === "Selesai") {
          if (Number(item.jumlahDibayar || 0) < Number(item.harga) || item.pembayaranTerverifikasi !== true) {
            console.log("Belum bisa diselesaikan. Pembayaran belum penuh.");
          } else {
            const akun = bacaAkun();
            const produk = akun.find(a => a.id === item.idAkun);

            if (!produk) {
              console.log("Akun terkait tidak ditemukan.");
            } else if (produk.status === "Terjual" && item.status !== "Selesai") {
              console.log("Akun sudah terjual. Periksa pesanan sebelum melanjutkan.");
            } else {
              produk.status = "Terjual";
              item.status = status;
              fs.writeFileSync("akun.json", JSON.stringify(akun, null, 2));
              fs.writeFileSync("pesanan.json", JSON.stringify(pesanan, null, 2));
              console.log("Pesanan selesai. Status akun berubah menjadi Terjual.");
            }
          }
        } else {
          item.status = status;
          fs.writeFileSync("pesanan.json", JSON.stringify(pesanan, null, 2));
          console.log("Status pesanan berhasil diperbarui:", status);
        }
      }
    }
  } else if (pilih === "10") {
    const pesanan = JSON.parse(fs.readFileSync("pesanan.json", "utf8"));

    if (pesanan.length === 0) {
      console.log("Belum ada pesanan.");
    } else {
      console.table(pesanan);
      const nomor = (await tanya("Nomor pesanan: ")).trim();
      const item = pesanan.find(p => p.nomor === nomor);

      if (!item) {
        console.log("Pesanan tidak ditemukan.");
      } else if (["Selesai", "Dibatalkan"].includes(item.status)) {
        console.log("Pesanan sudah selesai atau dibatalkan.");
      } else {
        const metode = (await tanya("Metode pembayaran: ")).trim();
        const jumlah = Number(await tanya("Jumlah pembayaran yang diterima (angka): "));

        if (!metode || !Number.isFinite(jumlah) || jumlah <= 0) {
          console.log("Metode atau jumlah pembayaran tidak valid.");
        } else {
          const total = Number(item.jumlahDibayar || 0) + jumlah;

          item.metodePembayaran = metode;
          item.jumlahDibayar = total;

          console.log("Total pembayaran tercatat: Rp" + total.toLocaleString("id-ID"));
          const verifikasi = (await tanya("Apakah dana benar-benar sudah diterima dan diverifikasi? (ya/tidak): ")).trim().toLowerCase();

          item.pembayaranTerverifikasi = verifikasi === "ya" && total >= Number(item.harga);
          item.statusPembayaran = total >= Number(item.harga)
            ? (item.pembayaranTerverifikasi ? "Lunas dan terverifikasi admin" : "Lunas - menunggu verifikasi admin")
            : "Pembayaran belum penuh";

          fs.writeFileSync("pesanan.json", JSON.stringify(pesanan, null, 2));
          console.log("Catatan pembayaran berhasil disimpan.");
          console.log("Status pembayaran:", item.statusPembayaran);
        }
      }
    }
  } else if (pilih === "11") {
    const pesanan = JSON.parse(fs.readFileSync("pesanan.json", "utf8"));

    const selesai = pesanan.filter(p => p.status === "Selesai");
    const menunggu = pesanan.filter(p =>
      p.status === "Menunggu konfirmasi admin"
    );
    const dibatalkan = pesanan.filter(p => p.status === "Dibatalkan");

    const omzet = selesai.reduce((total, p) =>
      total + Number(p.harga || 0), 0
    );

    console.log("=== LAPORAN PENJUALAN ===");
    console.log("Total pesanan:", pesanan.length);
    console.log("Pesanan selesai:", selesai.length);
    console.log("Pesanan menunggu:", menunggu.length);
    console.log("Pesanan dibatalkan:", dibatalkan.length);
    console.log("Total omzet selesai: Rp" + omzet.toLocaleString("id-ID"));
  } else if (pilih === "0") {
    rl.close();
    return;
  } else {
    console.log("Pilihan tidak tersedia.");
  }

  await menuUtama();
}

menuUtama();
