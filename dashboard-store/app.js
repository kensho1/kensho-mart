
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

app.post('/api/update-all-stok', (req, res) => {
  const newData = req.body;
  fs.writeFileSync('data.json', JSON.stringify(newData, null, 2));
  res.json({ success: true, message: 'Semua stok berhasil diperbarui!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
