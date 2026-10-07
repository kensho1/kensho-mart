const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");
const P = require("pino");

const NOMOR_BOT = process.env.BOT_WA || "";
let kodeMinta = false;

async function mulaiBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "fatal" }),
    browser: Browsers.ubuntu("Chrome"),
    connectTimeoutMs: 120000, // Diperpanjang untuk koneksi HP Tecno
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    printQRInTerminal: false,
    syncFullHistory: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", ({ messages, type }) => {
    console.log("DEBUG: EVENT MASUK TERDETEKSI");
    console.log("\n🔎 DEBUG EVENT:", type);
    for (const m of messages) {
      console.log("Dari:", m.key.remoteJid);
      console.log("Dari sendiri:", m.key.fromMe);
      console.log("Jenis pesan:", Object.keys(m.message || {}));
    }
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (!state.creds.registered && !kodeMinta && (connection === "connecting" || connection === "open")) {
      kodeMinta = true;
      setTimeout(async () => {
        try {
          const kode = await sock.requestPairingCode(NOMOR_BOT);
          console.log("\n=================================");
          console.log(" KODE PAIRING ANDA:", kode);
          console.log("=================================\n");
          console.log("-> SEGERA MASUKKAN KODE DI ATAS!");
        } catch (err) {
          console.log("\nGagal meminta kode pairing:", err.message);
          kodeMinta = false;
        }
      }, 4000);
    }

    if (connection === "open") {
      console.log("\n=================================");
      console.log(" ✅ WHATSAPP BERHASIL TERHUBUNG!");
      console.log(" BOT SIAP DIGUNAKAN!");
      console.log("=================================\n");
      kodeMinta = false;
    }

    if (connection === "close") {
      const status = lastDisconnect?.error?.output?.statusCode;
      console.log("Detail error:", lastDisconnect?.error?.message || "Tidak tersedia");
      console.log("Status koneksi:", connection);
      console.log("Kode status:", status);
      console.log("Penyebab:", lastDisconnect?.error?.output?.payload?.message || "Tidak tersedia");
      console.log(`\nKoneksi terputus (Status: ${status ?? "unknown"})`);

      if (status === DisconnectReason.loggedOut || status === 401) {
        console.log("Sesi ditolak/keluar. Silakan jalankan ulang skrip.");
        process.exit(1);
      } else {
        console.log("Menghubungkan ulang otomatis...");
        setTimeout(() => mulaiBot(), 3000);
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    console.log("📩 EVENT PESAN:", type, "Jumlah:", messages.length);
    const pesan = messages[0];
    if (!pesan?.message || pesan.key.fromMe) return;

    const nomor = pesan.key.remoteJid;
    const teks = pesan.message.conversation ||
      pesan.message.extendedTextMessage?.text || "";

    try {
      const tanganiMenu = require("./menu-wa");
      await tanganiMenu(sock, nomor, teks);
    } catch (err) {
      console.error("Gagal memproses pesan:", err.message);
    }
  });
}

mulaiBot();
