const express = require('express');
const path = require('path');
const app = express();

// Konfirmasi path folder views untuk environment Vercel
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Utama
app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;
