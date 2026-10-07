const fs = require("fs");
const path = require("path");

const ADMIN_WA = process.env.ADMIN_WA || "";
const prosesPelanggan = new Map();

function bacaAkun() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "akun.json"), "utf8")
  );
}

async function tanganiMenu(sock, nomor, teks) {
  const pilihan = teks.trim();
  let proses = prosesPelanggan.get(nomor);

  if (pilihan.toLowerCase() === "menu") {
    prosesPelanggan.delete(nomor);
    await sock.sendMessage(nomor, {
      text: "╭━━━━━━━━━━━━━━━━━━╮\n       🤖 BOT JUAL BELI\n╰━━━━━━━━━━━━━━━━━━╯\n\n       🛒 MENU UTAMA\n\n  1. 📋 Daftar Akun\n  2. 💰 Cek Harga\n  3. 📦 Cara Pemesanan\n  4. 👨‍💻 Hubungi Admin\n  5. 🛍️ Pesan Akun\n\n━━━━━━━━━━━━━━━━━━\n✨ Pilih menu dengan angka\nKetik MENU untuk kembali\n━━━━━━━━━━━━━━━━━━"
    });
    return;
  }

  if (proses?.tahap === "id") {
    console.log("DEBUG PEMESANAN:", JSON.stringify({nomor,pilihan,tahap:proses.tahap,akun:bacaAkun().map(a=>({id:a.id,status:a.status}))}));
    const akun = bacaAkun().find(a => String(a.id) === pilihan && a.status === "Tersedia");

    if (!akun) {
      await sock.sendMessage(nomor, {
        text: "ID tidak ditemukan atau akun sudah tidak tersedia. Ketik MENU untuk mulai lagi."
      });
      return;
    }

    prosesPelanggan.set(nomor, { tahap: "nama", id: akun.id });

    await sock.sendMessage(nomor, {
      text: `╭━━━━━━━━━━━━━━━━━━╮\n       🎮 DETAIL AKUN\n╰━━━━━━━━━━━━━━━━━━╯\n\n🆔 ID       : ${akun.id}\n👤 Nama     : ${akun.nama}\n🏆 Rank     : ${akun.rank}\n🎨 Skin     : ${akun.skin}\n💰 Harga    : Rp${akun.harga.toLocaleString("id-ID")}\n🟢 Status   : ${akun.status}\n\n━━━━━━━━━━━━━━━━━━\n📝 Masukkan nama lengkap pemesan untuk melanjutkan.\nKetik MENU untuk membatalkan.`
    });
    return;
  }

  if (proses?.tahap === "nama") {
    const hasil = require("./pesanan-service").buatPesanan(proses.id, pilihan);

    if (!hasil.ok) {
      prosesPelanggan.delete(nomor);
      await sock.sendMessage(nomor, {
        text: hasil.pesan + "\nKetik MENU untuk kembali."
      });
      return;
    }

    prosesPelanggan.delete(nomor);
    const p = hasil.pesanan;

    await sock.sendMessage(nomor, {
      text: `✅ PESANAN BERHASIL DIBUAT\n\nNomor: ${p.nomor}\nAkun: ${p.namaAkun}\nHarga: Rp${p.harga.toLocaleString("id-ID")}\nStatus: Menunggu konfirmasi admin\nPembayaran: Belum dibayar\n\nTunggu konfirmasi admin sebelum melakukan pembayaran.`
    });

    try {
      if (/^[0-9]{10,15}$/.test(ADMIN_WA)) {
        await sock.sendMessage(ADMIN_WA + "@s.whatsapp.net", {
          text: `🔔 PESANAN BARU\n\nNomor: ${p.nomor}\nPemesan: ${p.namaPemesan}\nID Akun: ${p.idAkun}\nNama Akun: ${p.namaAkun}\nHarga: Rp${p.harga.toLocaleString("id-ID")}\nStatus: Menunggu konfirmasi admin`
        });
      }
    } catch (err) {
      console.error("Pemberitahuan admin gagal dikirim.");
    }
    return;
  }

  if (pilihan === "1") {
    const akun = bacaAkun().filter(a => a.status === "Tersedia");

    if (akun.length === 0) {
      await sock.sendMessage(nomor, { text: "Belum ada akun tersedia." });
      return;
    }

    const daftar = akun.map(a =>
      `╭──「 AKUN ${a.id} 」──\n│ 🎮 Nama  : ${a.nama}\n│ 🏆 Rank  : ${a.rank}\n│ 🎨 Skin  : ${a.skin}\n│ 💰 Harga : Rp${a.harga.toLocaleString("id-ID")}\n│ 🟢 Status: ${a.status}\n╰━━━━━━━━━━━━━━━━━━╯`
    ).join("\n\n");

    await sock.sendMessage(nomor, {
      text: "╭━━━━━━━━━━━━━━━━━━╮\n       🛒 DAFTAR AKUN JB\n╰━━━━━━━━━━━━━━━━━━╯\n\n" + daftar + "\n\n📌 Ketik 2 untuk cek harga.\n🛍️ Ketik 5 untuk pesan akun.\n↩️ Ketik MENU untuk kembali."
    });
    return;
  }

  if (pilihan === "2") {
    await sock.sendMessage(nomor, {
      text: "Ketik ID akun yang ingin dicek.\nContoh: 001"
    });
    return;
  }

  if (/^\d{3}$/.test(pilihan)) {
    const akun = bacaAkun().find(a => String(a.id) === pilihan);

    if (!akun) {
      await sock.sendMessage(nomor, { text: "ID akun tidak ditemukan." });
    } else if (akun.status !== "Tersedia") {
      await sock.sendMessage(nomor, { text: "Maaf, akun tersebut sudah terjual." });
    } else {
      await sock.sendMessage(nomor, {
        text: `💰 INFORMASI AKUN\n\nNama: ${akun.nama}\nRank: ${akun.rank}\nHarga: Rp${akun.harga.toLocaleString("id-ID")}\nStatus: ${akun.status}\n\nKetik 5 untuk memesan akun.`
      });
    }
    return;
  }

  if (pilihan === "3") {
    await sock.sendMessage(nomor, {
      text: "📦 CARA PEMESANAN\n\n1. Pilih akun yang tersedia.\n2. Gunakan menu 5 untuk membuat pesanan.\n3. Tunggu konfirmasi admin.\n4. Lakukan pembayaran setelah mendapat instruksi resmi.\n5. Tunggu proses penyerahan akun.\n\nKetik MENU untuk kembali."
    });
    return;
  }

  if (pilihan === "4") {
    await sock.sendMessage(nomor, {
      text: "👨‍💻 HUBUNGI ADMIN\nhttps://wa.me/" + ADMIN_WA
    });
    return;
  }

  if (pilihan === "5") {
    prosesPelanggan.set(nomor, { tahap: "id" });
    await sock.sendMessage(nomor, {
      text: "📝 PEMESANAN AKUN\n\nKetik ID akun yang ingin dipesan.\nContoh: 001\n\nKetik MENU untuk membatalkan."
    });
    return;
  }

  await sock.sendMessage(nomor, {
    text: "Pilihan tidak dikenali. Ketik MENU untuk melihat pilihan."
  });
}

module.exports = tanganiMenu;
