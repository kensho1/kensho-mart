const express = require('express');
const path = require('path');
const app = express();

// Konfirmasi lokasi folder views untuk Vercel
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Utama
app.get('/', (req, res) => {
    res.render('index');
});

// Port Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Kensho Mart berjalan di port ${PORT}`);
});

module.exports = app;
