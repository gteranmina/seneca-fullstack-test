const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const { sendActivationEmail } = require('../utils/mailer');
const { sendEmail } = require('../utils/mailer');

const registerUser = async (req, res) => {
    const { email, password, firstName, lastName, address, birthDate } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const activationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            birthDate,
            activationToken
        });

        await newUser.save();
        await sendActivationEmail(email, activationToken);

        res.status(201).json({ message: 'Usuario registrado. Revisa tu correo para activar tu cuenta.' });
    } catch (err) {
        res.status(500).json({ message: 'Error en el registro', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        if (!user.isActive) return res.status(401).json({ message: 'Cuenta no activada' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Credenciales incorrectas' });

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Error en el login', error: err.message });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
        await sendEmail(email, 'Restablecer contraseña',
            `<p>Haz clic para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`);

        res.status(200).json({ message: 'Correo de recuperación enviado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al solicitar recuperación', error: err.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken: token });
        if (!user) return res.status(400).json({ message: 'Token inválido o expirado' });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        user.resetToken = null;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al restablecer contraseña', error: err.message });
    }
};

const updateUserInfo = async (req, res) => {
    const { firstName, lastName, address, birthDate } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { firstName, lastName, address, birthDate },
            { new: true }
        );
        res.status(200).json({ message: 'Usuario actualizado', user });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar', error: err.message });
    }
};

module.exports = { registerUser, loginUser, requestPasswordReset, resetPassword, updateUserInfo};
