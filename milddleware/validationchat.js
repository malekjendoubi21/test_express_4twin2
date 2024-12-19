const { check, validationResult } = require('express-validator');

// Middleware pour valider les données
const validateChat = [
    check('message').notEmpty().withMessage('Le message est requis'),
    check('dateCreation').isISO8601().withMessage('La date doit être au format ISO 8601'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Route avec validation
router.post('/add', validateChat, chatController.add);