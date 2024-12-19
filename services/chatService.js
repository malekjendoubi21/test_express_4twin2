const chat = require('../models/chat'); // Assuming you have a chat model
var socketIo = require('socket.io')

// Add a chat
const add = (req, res) => {
    const { message, dateCreation } = req.body;
    if (!message) {
        return res.status(400).json({ error: "message and dateCreation are required" });
    }

    const newchat = new chat({
        message: message,
        dateCreation: new Date()


    });
    newchat.save()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json({ error: "Failed to save chat", details: err }));
};

// List all chats
const list = (req, res) => {
    chat.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "Failed to retrieve chats", details: err }));
};

const supprimer = (req, res) => {
    const chatId = req.params.id;
    chat.findByIdAndDelete(chatId)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                res.json({ message: "Utilisateur supprimé avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la suppression", details: err }));
};
const update = (req, res) => {
    const chatId = req.params.id; // Récupère l'ID de l'utilisateur à partir des paramètres de la requête
    const { message, dateCreation } = req.body; // Récupère les nouvelles valeurs de message et date

    // Mettre à jour l'utilisateur
    chat.findByIdAndUpdate(chatId, { message, dateCreation }, { new: true }) // `new: true` renvoie l'utilisateur mis à jour
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                res.json({ message: "Utilisateur mis à jour avec succès", data });
            }
        })
        .catch(err => res.status(500).json({ error: "Erreur lors de la mise à jour", details: err }));
};

/*
function socketIO(server) {
    const io = socketIo(server);
    return io;
}*/

function socketIO(server) {

    const io = socketIo(server);
    io.on("connection", (socket) => {
        console.log("user connected with socket id" + socket.id);
    })
    return io;
}

function showChats(req, res, next) {
    res.render('chats', { title: 'My chats' })
}
module.exports = { add, list, supprimer, update, socketIO, showChats };