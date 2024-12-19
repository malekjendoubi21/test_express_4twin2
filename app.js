const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hotelRoutes = require('./routes/hotelRoutes');
const app = express();
const PORT = 3000;

mongoose
    .connect('mongodb://localhost:27017/hotel_management', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/hotel', hotelRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue dans l\'application de gestion des hôtels</h1>');
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});