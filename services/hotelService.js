const Hotel = require('../models/hotel');

const add = (req, res) => {
    const { name, nbrrooms, datefabrication } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Le champ 'name' est requis." });
    }

    const newHotel = new Hotel({
        name,
        nbrrooms: nbrrooms || 10,
        datefabrication: datefabrication || new Date(),
    });

    newHotel.save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: "Erreur lors de l'enregistrement de l'hôtel.", details: err }));
};

const list = (req, res) => {
    Hotel.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Erreur lors de la récupération des hôtels.", details: err }));
};



const search = (req, res) => {
    Hotel.find({
            nbrrooms: { $lt: 100, $gt: 10 }
        })
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Erreur lors de la récupération des hôtels.", details: err }));
};



const supprimer = (req, res) => {
    const hotelId = req.params.id;

    Hotel.findByIdAndDelete(hotelId)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Hôtel non trouvé." });
            }
            res.json({ message: "Hôtel supprimé avec succès.", data });
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la suppression de l'hôtel.", details: err }));
};

const update = (req, res) => {
    const hotelId = req.params.id;
    const { name, nbrrooms, datefabrication } = req.body;

    Hotel.findByIdAndUpdate(
            hotelId, { name, nbrrooms, datefabrication }, { new: true }
        )
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Hôtel non trouvé." });
            }
            res.json({ message: "Hôtel mis à jour avec succès.", data });
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour de l'hôtel.", details: err }));
};

module.exports = { add, list, supprimer, update, search };