/**
 * Kensho Mart WhatsApp Bot - Welcome Message 1 Hari Sekali (24 Jam)
 * Disimpan dengan sistem penyimpanan JSON sederhana agar tetap aman saat PM2 restart.
 */

const fs = require('fs');
const path = require('./welcome_store.json'); // File untuk menyimpan state waktu sambutan

// Load atau buat file penyimpanan data waktu sambutan
let welcomeStore = {};
try {
    if (fs.existsSync('./welcome_store.json')) {
        const data = fs.readFileSync('./welcome_store.json', 'utf8');
        welcomeStore = JSON.parse(data);
    }
} catch (error) {
    console.error("Gagal membaca file storage welcome:", error);
}

function saveStore() {
    try {
        fs.writeFileSync('./welcome_store.json', JSON.stringify(welcomeStore, null, 2));
    } catch (error) {
        console.error("Gagal menyimpan file storage welcome:", error);
    }
}

// Fungsi cek cooldown 24 jam (1 hari)
function shouldSendWelcome(senderId) {
    const now = Date.now();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

    if (!welcomeStore[senderId] || (now - welcomeStore[senderId] > ONE_DAY_MS)) {
        welcomeStore[senderId] = now;
        saveStore();
        return true;
    }
    return false;
}

module.exports = { shouldSendWelcome };
