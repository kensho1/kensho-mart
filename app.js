const express = require('express');
const path = require('path');
const app = express();

// Path absolut untuk views dan public
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route utama
app.get('/', (req, res) => {
    res.render('index');
});

// Port server lokal
const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
