const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'akun.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper: Baca data dari akun.json
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Gagal membaca data:', err);
    return [];
  }
}

// Helper: Tulis data ke akun.json
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Gagal menyimpan data:', err);
    return false;
  }
}

// === API ROUTES (KHUSUS ADMIN) ===

// 1. Get semua akun
app.get('/api/akun', (req, res) => {
  const data = readData();
  res.json({ success: true, data });
});

// 2. Tambah akun baru
app.post('/api/akun', (req, res) => {
  const { nama, id_game, rank, skin, harga, status } = req.body;
  if (!nama || !harga) {
    return res.status(400).json({ success: false, message: 'Nama & Harga wajib diisi!' });
  }

  const listAkun = readData();
  const newAccount = {
    id: Date.now().toString(),
    nama,
    id_game: id_game || '-',
    rank: rank || '-',
    skin: Number(skin) || 0,
    harga: Number(harga) || 0,
    status: status || 'Tersedia'
  };

  listAkun.push(newAccount);
  if (saveData(listAkun)) {
    res.json({ success: true, message: 'Akun berhasil ditambahkan', data: newAccount });
  } else {
    res.status(500).json({ success: false, message: 'Gagal menyimpan ke file' });
  }
});

// 3. Edit / Update akun
app.put('/api/akun/:id', (req, res) => {
  const { id } = req.params;
  const { nama, id_game, rank, skin, harga, status } = req.body;

  let listAkun = readData();
  const index = listAkun.findIndex(item => item.id === id || item.id_game === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Akun tidak ditemukan' });
  }

  listAkun[index] = {
    ...listAkun[index],
    nama: nama || listAkun[index].nama,
    id_game: id_game || listAkun[index].id_game,
    rank: rank || listAkun[index].rank,
    skin: skin !== undefined ? Number(skin) : listAkun[index].skin,
    harga: harga !== undefined ? Number(harga) : listAkun[index].harga,
    status: status || listAkun[index].status
  };

  if (saveData(listAkun)) {
    res.json({ success: true, message: 'Akun berhasil diperbarui', data: listAkun[index] });
  } else {
    res.status(500).json({ success: false, message: 'Gagal memperbarui file' });
  }
});

// 4. Hapus akun
app.delete('/api/akun/:id', (req, res) => {
  const { id } = req.params;
  let listAkun = readData();
  const initialLength = listAkun.length;

  listAkun = listAkun.filter(item => item.id !== id && item.id_game !== id);

  if (listAkun.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Akun tidak ditemukan' });
  }

  if (saveData(listAkun)) {
    res.json({ success: true, message: 'Akun berhasil dihapus' });
  } else {
    res.status(500).json({ success: false, message: 'Gagal menghapus dari file' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Panel Admin berjalan secara mandiri di http://localhost:${PORT}`);
});
