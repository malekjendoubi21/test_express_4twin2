const express = require('express');
const router = express.Router();

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.send('Page d\'accueil');
});
module.exports = router;