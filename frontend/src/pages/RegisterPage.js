import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '', password: '',
        firstName: '', lastName: '',
        address: '', birthDate: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        // Validación extra
        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.address || !form.birthDate) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-3" name="firstName" placeholder="Nombres" onChange={handleChange} required />
                    <input className="form-control mb-3" name="lastName" placeholder="Apellidos" onChange={handleChange} required />
                    <input className="form-control mb-3" name="email" type="email" placeholder="Correo" onChange={handleChange} required />
                    <input className="form-control mb-3" name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
                    <input className="form-control mb-3" name="address" placeholder="Dirección" onChange={handleChange} required />
                    <input className="form-control mb-3" name="birthDate" type="date" onChange={handleChange} required />
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
                <p className="text-center mt-3">{message}</p>
                <p className="text-center mt-2">
                    ¿Ya tienes cuenta?{' '}
                    <button onClick={() => navigate('/login')} className="btn btn-link p-0">Inicia sesión</button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
