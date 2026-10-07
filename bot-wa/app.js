const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');

const LINK_CHANNEL_RESMI = "https://whatsapp.com/channel/0029VbE5jcL4tRrxNPpi6j1t";

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('session_baru');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        keepAliveIntervalMs: 30000,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        retryRequestDelayMs: 5000
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            console.log(`⚠️ Koneksi terputus (Status Code: ${statusCode}). Reconnecting otomatis...`);

            if (shouldReconnect) {
                setTimeout(() => connectToWhatsApp(), 3000);
            } else {
                console.log('❌ Sesi dikeluarkan (Logged Out). Hapus folder session_baru dan tautkan ulang.');
            }
        } else if (connection === 'open') {
            console.log('\n✅ BOT KENSHO MART BERHASIL TERHUBUNG SEPENUHNYA & READY!\n');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        try {
            if (m.type !== 'notify') return;
            const msg = m.messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const remoteJid = msg.key.remoteJid;
            if (remoteJid.endsWith('@g.us')) return;

            // DETEKSI GAMBAR / BUKTI PEMBAYARAN
            const isImage = msg.message.imageMessage || (msg.message.extendedTextMessage && msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.quotedMessage && msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage);

            if (isImage) {
                const balasanGambar = 
`✅ *BUKTI PEMBAYARAN DITERIMA*

Terima kasih! Bukti pembayaran Anda telah diterima. 
*Admin sedang mengecek transaksi Anda, mohon tunggu sebentar ya!* 🙏

_Pesan Anda akan segera dibalas oleh Admin kami._`;
                await sock.sendMessage(remoteJid, { text: balasanGambar }, { quoted: msg });
                return;
            }

            const text = (
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                msg.message.imageMessage?.caption ||
                ''
            ).trim();

            const lowerText = text.toLowerCase();

            // 0 / MENU UTAMA
            if (lowerText === 'menu' || lowerText === '0' || lowerText === 'p' || lowerText === 'halo' || lowerText === 'hi') {
                const menuUtama = 
`╔════════════════════════════╗
  🏪 *KENSHO MART OFFICIAL STORE*
  _Fast, Trusted & Digital Store_
╚════════════════════════════╝
🟢 *STATUS TOKO:* ONLINE (24 JAM)

✦ *KATEGORI LAYANAN UTAMA* ✦

  [1] 🎮 *AKUN GAME SULTAN*
      └ \`[READY STOK ALL GAME]\`

  [2] 📱 *APK PREMIUM PRIVATE*
      └ \`[GARANSI FULL AKTIFF]\`

  [3] 🚀 *SUNTIK FOLLOWERS SOSMED*
      └ \`[PROSES SERBA OTOMATIS]\`

  [4] ⚡ *VIP CHEAT & MOD GAME*
      └ \`[UNDETECTED & SAFE BYPASS]\`

  [5] 📝 *FORMAT PEMESANAN*
  [6] 💳 *METODE PEMBAYARAN*
  [7] 📞 *HUBUNGI ADMIN (HUMAN)*
  [8] 🛡️ *GARANSI & RULES STORE*
  [9] ⭐ *TESTIMONI & CHANNEL RESMI*
 [12] 🎁 *KLAIM VOUCHER DISKON*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *CARA PEMESANAN:*
_Ketik angkanya saja (Contoh: ketik *1* lalu kirim)._`;
                await sock.sendMessage(remoteJid, { text: menuUtama }, { quoted: msg });
            }

            // MENU 1: AKUN GAME SULTAN (LEBIH KEREN)
            else if (lowerText === '1') {
                const res = 
`╔════════════════════════════╗
  ⚔️ *KATALOG AKUN GAME SULTAN*
╚════════════════════════════╝

_Akun Pilihan, Spek GG, Full Bind Safe & Siap Pakai!_

🔥 *Ketik Nama Game untuk Cek Stok:*
├ 🎮 *ML*   ➔ Mobile Legends (Skin Hero/Collector/Grandprime)
├ 🎯 *FF*   ➔ Free Fire (Old/Vault Rame/Incubator)
├ 🔫 *PUBG* ➔ PUBG Mobile (M416 Glacier/Set High)
├ 🌌 *GENSHIN* ➔ Genshin Impact (Rate On/AR Tinggi/C5-C6)
└ 🌠 *HONKAI*  ➔ Honkai Star Rail (E6/Meta Team)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Contoh:* Ketik *ML* atau *FF* lalu kirim.
_Ketik *0* untuk kembali ke Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // TRIGGER DETAIL GAME
            else if (lowerText === 'ml' || lowerText === 'mobile legends' || lowerText === 'mlbb') {
                const res = 
`⚔️ *AKUN MOBILE LEGENDS (MLBB)*

• *Rentang Harga:* Rp 30.000 - Rp 1.000.000+
• *Kualitas:* Spek Smurf sampai Akun Sultan Top Tier (All Unbind/Safe)

💡 *Ketik 7 untuk konsultasi & cek SS stok ke Admin.*
_Ketik *5* untuk Pemesanan | *0* untuk Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            else if (lowerText === 'ff' || lowerText === 'free fire') {
                const res = 
`🎯 *AKUN FREE FIRE (FF)*

• *Rentang Harga:* Rp 30.000 - Rp 1.000.000+
• *Kualitas:* Akun Old, Skin Season 1, M1887 Lengkap & Bundel Rame.

💡 *Ketik 7 untuk konsultasi & cek SS stok ke Admin.*
_Ketik *5* untuk Pemesanan | *0* untuk Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            else if (lowerText === 'pubg' || lowerText === 'pubg mobile') {
                const res = 
`🔫 *AKUN PUBG MOBILE*

• *Rentang Harga:* Rp 30.000 - Rp 1.000.000+
• *Kualitas:* Senjata Upgradable, M4 Glacier, Set Rare & High Level.

💡 *Ketik 7 untuk konsultasi & cek SS stok ke Admin.*
_Ketik *5* untuk Pemesanan | *0* untuk Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            else if (lowerText === 'genshin' || lowerText === 'genshin impact') {
                const res = 
`🌌 *AKUN GENSHIN IMPACT*

• *Rentang Harga:* Rp 30.000 - Rp 1.000.000+
• *Kualitas:* Starter Char Bintang 5 / Endgame AR Tinggi / Rate On.

💡 *Ketik 7 untuk konsultasi & cek SS stok ke Admin.*
_Ketik *5* untuk Pemesanan | *0* untuk Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            else if (lowerText === 'honkai' || lowerText === 'honkai star rail') {
                const res = 
`🌠 *AKUN HONKAI STAR RAIL*

• *Rentang Harga:* Rp 30.000 - Rp 1.000.000+
• *Kualitas:* Starter Meta / Midgame / Endgame High Build.

💡 *Ketik 7 untuk konsultasi & cek SS stok ke Admin.*
_Ketik *5* untuk Pemesanan | *0* untuk Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 2: APK PREMIUM PRIVATE (LEBIH KEREN)
            else if (lowerText === '2') {
                const res = 
`╔════════════════════════════╗
  👑 *KATALOG APK PREMIUM PRIVATE*
╚════════════════════════════╝

_Solusi Hemat Akses Fitur Sultan Tanpa Iklan!_

🎧 *ENTERTAINMENT & STREAMING*
├ 🎵 *Spotify Premium:* Rp 15.000 / Bln
├ 🎬 *Netflix UHD 4K:* Rp 35.000 / Bln
├ 🔴 *YouTube Premium:* Rp 10.000 / Bln
└ 🍿 *Disney+ / Viu / Prime Video:* Rp 15.000 / Bln

🚀 *CREATIVE & ARTIFICIAL INTELLIGENCE*
├ 🎨 *Canva Pro Lifetime:* Rp 15.000
├ 🤖 *ChatGPT Plus / Claude Pro:* Rp 45.000
└ ✏️ *PicsArt / CapCut Pro:* Rp 15.000 / Bln

📌 *Keunggulan:* Akun Private, Anti-Limit, Full Garansi Store!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 _Ketik *5* untuk Format Pemesanan atau *0* untuk kembali._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 3: SUNTIK FOLLOWERS SOSMED (LEBIH KEREN)
            else if (lowerText === '3') {
                const res = 
`╔════════════════════════════╗
  📈 *BOOSTER SOSMED PRO (SUNTIK)*
╚════════════════════════════╝

_Dongkrak Branding & Popularitas dalam Hitungan Menit!_
🔒 *Aman 100%:* Tanpa Password | Hanya Butuh Username/Link

📸 *INSTAGRAM BOOSTER*
├ 👥 *Followers High Quality:* Rp 10.000 / 1.000 Foll
└ 🔴 *Likes / Views Reels:* Rp 3.000 / 1.000 Item

🎵 *TIKTOK BOOSTER*
├ 👥 *Followers Permanen:* Rp 15.000 / 1.000 Foll
└ 👁️ *Views FYP Instan:* Rp 2.000 / 10.000 Views

🔹 *OTHER PLATFORMS*
└ 🚀 *YouTube / Telegram / Twitter / Shopee:* Ready All Service!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 _Ketik *5* untuk Format Pemesanan atau *0* untuk kembali._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 4: VIP CHEAT & MOD GAME (LENGKAP PB, VALORANT, BLOOD STRIKE & KEREN)
            else if (lowerText === '4') {
                const res = 
`╔════════════════════════════╗
  ⚡ *VIP CHEAT & MOD GAMING*
╚════════════════════════════╝

_Dominasi Permainan dengan Fitur Terbaik!_
🛡️ *Sistem Safe:* Undetected, Anti-Ban & High Security Bypass

🎮 *LIST GAME SUPPORTED:*
├ 📱 *MOBILE LEGENDS MOD MENU*
│   └ 🛠️ Maphack, Drone View 2x-5x, Auto Retri, Unlock Skin
├ 🎯 *FREE FIRE VIP INJECTOR / PANEL*
│   └ 🛠️ Auto Aimbot 100%, Headshot Lock, High Damage, Antenna
├ 🔫 *PUBG MOBILE VIP KEY*
│   └ 🛠️ ESP Player, Bullet Tracking, No Recoil, Memory Hack
├ 🎯 *POINT BLANK (PB) VIP CHEAT*
│   └ 🛠️ Wallhack ESP, Auto Headshot, No Recoil, Fast Reload
├ ⚔️ *VALORANT VIP HACK (PC)*
│   └ 🛠️ ESP/Wallhack, Triggerbot, Aim Assist (Undetected Vanguard)
└ 💥 *BLOOD STRIKE VIP MOD*
    └ 🛠️ Aimbot, ESP Player, High Damage, Speed Hack

📌 *FASILITAS:* Panduan Lengkap + Dibantu Admin Sampai Work!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Tanya Harga / Stok Key:* Ketik *7* untuk chat Admin.
_Ketik *5* untuk Pemesanan | *0* untuk kembali._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 5: FORMAT PEMESANAN
            else if (lowerText === '5') {
                const res = 
`📝 *FORMAT PEMESANAN KENSHO MART*

Silakan isi format di bawah ini lalu kirimkan ke chat ini:

• *Nama Pembeli:*
• *Produk yang Dipesan:*
• *Jumlah / Durasi:*
• *Kode Voucher (Jika ada):*
• *Metode Pembayaran:* (DANA / OVO / GoPay / SeaBank)

_Admin/System akan memproses pesanan Anda sesegera mungkin setelah konfirmasi pembayaran._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 6: METODE PEMBAYARAN
            else if (lowerText === '6') {
                const res = 
`💳 *METODE PEMBAYARAN RESMI KENSHO MART*

Silakan lakukan transfer pembayaran ke salah satu pilihan di bawah ini:

🏦 *BANK TRANSFER:*
└ 💳 *SeaBank:* \`901484429951\`
   └ a/n *RANGGA RAMDANI*

📱 *E-WALLET:*
├ 🔵 *DANA:* \`085813977768\`
├ 🟣 *OVO:* \`085813977768\`
└ 🟢 *GoPay:* \`085813977768\`
   └ Semua a/n *RANGGA RAMDANI*

📲 *QRIS ALL PAYMENT:*
_Minta gambar QRIS langsung ke Admin jika ingin scan otomatis via M-Banking/E-Wallet._

⚠️ *PENTING:*
_Wajib mengirimkan foto/screenshot bukti transfer setelah melakukan pembayaran!_
_Ketik *0* untuk kembali ke Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 7: HUBUNGI ADMIN
            else if (lowerText === '7') {
                const res = 
`📞 *LAYANAN BANTUAN ADMIN (HUMAN)*

Jika mengalami kendala, pertanyaan khusus, atau klaim garansi, silakan tinggalkan pesan Anda di sini secara detail. 

Admin kami akan membalas pesan Anda sesegera mungkin saat berada di jam operasional. Terima kasih!`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 8: GARANSI & RULES
            else if (lowerText === '8') {
                const res = 
`🛡️ *GARANSI & RULES STORE*

1. Garansi berlaku sesuai masa aktif produk yang dibeli.
2. Klaim garansi wajib melampirkan foto/video bukti kendala & resi pembelian.
3. Dilarang mengubah data akun (email/password) pada produk bergaransi sharing/private tanpa instruksi.
4. Segala bentuk kecurangan atau spam akan membatalkan garansi toko.`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 9 & 11: TESTIMONI & CHANNEL
            else if (lowerText === '9' || lowerText === '11') {
                const res = 
`⭐ *TESTIMONI & CHANNEL RESMI*

Bergabunglah dengan saluran resmi kami untuk melihat ribuan bukti transaksi, event diskon harian, dan update stok terbaru:

📢 *Channel Resmi:*
👉 ${LINK_CHANNEL_RESMI}`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // MENU 12: VOUCHER
            else if (lowerText === '12' || lowerText === 'voucher' || lowerText === 'diskon') {
                const res = 
`╔════════════════════════════╗
   🎁 VOUCHER DISKON HARI INI
╚════════════════════════════╝

Selamat! Anda berkesempatan klaim potongan harga spesial hari ini:

🎟️ KODE VOUCHER:
├ ⚡ KMART1K ➔ Diskon Rp 1.000 (Min. Order Rp 20.000)
├ ⚡ SULTAN3K ➔ Diskon Rp 3.000 (Min. Order Rp 100.000)
└ 🚀 FREEONGKIR ➔ Potongan Biaya Admin 100%

📌 CARA MENGGUNAKAN VOUCHER:
Tuliskan kode voucher di bagian "Catatan" pada Format Pemesanan Anda!

Contoh:
• Nama: Andi
• Pesanan: 86 DM MLBB
• Kode Voucher: KMART1K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 _Catatan: Voucher terbatas setiap harinya!_
_Ketik *0* atau *MENU* untuk kembali ke Menu Utama._`;
                await sock.sendMessage(remoteJid, { text: res }, { quoted: msg });
            }

            // DEFAULT AUTO-RESPONSE: SAMBUTAN PERSIS SEPERTI DI TAMPILAN GAMBAR
            else {
                const pesanSambutan = 
`Halo! Selamat datang di *KENSHO MART OFFICIAL STORE* 🏪[span_1](start_span)[span_1](end_span)

Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?[span_2](start_span)[span_2](end_span)

👉 Ketik *MENU* untuk melihat daftar produk & katalog layanan lengkap kami[span_3](start_span)[span_3](end_span)!`;
                await sock.sendMessage(remoteJid, { text: pesanSambutan }, { quoted: msg });
            }

        } catch (err) {
            console.error('Error handling message:', err);
        }
    });
}

connectToWhatsApp();
