const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");
const P = require("pino");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function mulaiBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    browser: Browsers.ubuntu("Chrome"),
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 10000,
    markOnlineOnConnect: true,
    printQRInTerminal: false
  });

  // Pemicu Pairing Code jika belum login
  if (!sock.authState.creds.registered) {
    console.log("\n==========================================");
    const phoneNumber = await question("📱 Masukkan Nomor WA Bot (contoh: 628123456789): ");
    console.log("==========================================\n");
    
    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ""));
        console.log(`🔑 KODE PAIRING KAMU: \x1b[32m${code}\x1b[0m\n`);
        console.log("👉 Buka WA -> Perangkat Tertaut -> Tautkan Perangkat -> Masukkan Kode di Atas.\n");
      } catch (err) {
        console.error("Gagal mendapatkan kode pairing:", err.message);
      }
    }, 3000);
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log("\n✅ WHATSAPP BERHASIL TERHUBUNG & STABIL!\n");
    }

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode === DisconnectReason.loggedOut) {
        console.log("❌ Sesi keluar. Silakan hapus folder session & jalankan ulang.");
      } else {
        console.log(`⚠️ Koneksi terputus (Status Code: ${statusCode ?? "Unknown"}). Menghubungkan ulang...`);
        setTimeout(() => mulaiBot(), 3000);
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const pesan of messages) {
      if (!pesan?.message || pesan.key.fromMe) continue;

      const nomor = pesan.key.remoteJid;
      const teks = pesan.message.conversation ||
        pesan.message.extendedTextMessage?.text || "";

      if (!teks) continue;

      try {
        const tanganiMenu = require("./menu-wa");
        await tanganiMenu(sock, nomor, teks);
      } catch (err) {
        console.error("Gagal memproses pesan:", err.message);
      }
    }
  });
}

mulaiBot();
