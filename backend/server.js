require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/auth', authRoutes);

// Rutas (las añadiremos después)
// app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB');
        app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Error al conectar a MongoDB', err));

const User = require('./models/User');

const crearUsuarioPorDefecto = async () => {
    const existente = await User.findOne({ email: 'admin@seneca.com' });
    if (!existente) {
        const hashed = await bcrypt.hash('admin123', 10);
        await new User({
            email: 'admin@seneca.com',
            password: hashed,
            firstName: 'Admin',
            lastName: 'Seneca',
            isActive: true
        }).save();
        console.log('Usuario por defecto creado');
    }
};

crearUsuarioPorDefecto();
