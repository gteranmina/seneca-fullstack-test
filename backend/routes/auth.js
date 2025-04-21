const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword,
    updateUserInfo
} = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    console.log('🔎 Token recibido:', token);

    try {
        const user = await User.findOne({ activationToken: token });
        if (!user) {
            console.log('❌ Usuario no encontrado con ese token');
            return res.status(400).send('Token inválido');
        }

        user.isActive = true;
        user.activationToken = null;
        await user.save();

        console.log('✅ Cuenta activada');
        res.status(200).send('Cuenta activada correctamente');
    } catch (err) {
        console.error('❌ Error en activación:', err);
        res.status(500).send('Error al activar la cuenta');
    }
});

router.get('/me', authenticate, async (req, res) => {
    const user = await User.findById(req.userId).select('-password -activationToken -resetToken');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
});

router.put('/update', authenticate, updateUserInfo);

module.exports = router;
