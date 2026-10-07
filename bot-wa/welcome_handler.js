const fs = require('fs');

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

function shouldSendWelcome(senderId) {
    const now = Date.now();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 jam

    if (!welcomeStore[senderId] || (now - welcomeStore[senderId] > ONE_DAY_MS)) {
        welcomeStore[senderId] = now;
        saveStore();
        return true;
    }
    return false;
}

module.exports = { shouldSendWelcome };
