const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");
const P = require("pino");

const NOMOR_BOT = "6285813977768";
let kodeMinta = false;

async function mulaiBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "fatal" }),
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 30000,
    printQRInTerminal: false,
    syncFullHistory: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    // Minta kode pairing HANYA SETELAH koneksi socket terhubung stabil ke server
    if (!state.creds.registered && !kodeMinta && (connection === "connecting" || connection === "open")) {
      kodeMinta = true;
      setTimeout(async () => {
        try {
          const kode = await sock.requestPairingCode(NOMOR_BOT);
          console.log("\n=================================");
          console.log(" KODE PAIRING ANDA:", kode);
          console.log("=================================\n");
          console.log("-> Buka WhatsApp di HP > Perangkat Tertaut > Tautkan dengan nomor telepon.");
        } catch (err) {
          console.log("\nGagal meminta kode pairing:", err.message);
          kodeMinta = false;
        }
      }, 5000);
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

  sock.ev.on("messages.upsert", async ({ messages }) => {
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
