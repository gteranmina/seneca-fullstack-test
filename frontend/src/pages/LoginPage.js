import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || 'Error al iniciar sesión');
            } else {
                localStorage.setItem('token', data.token);
                setMessage('Inicio de sesión exitoso');
                navigate('/');
            }
        } catch (err) {
            setMessage('Error de red');
        }
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
                <button type="submit">Entrar</button>
            </form>
            <p className="text-center mt-2">
                <button onClick={() => navigate('/forgot-password')} className="btn btn-link p-0">
                    ¿Olvidaste tu contraseña?
                </button>
            </p>
            <p>
                ¿No tienes cuenta?{' '}
                <button onClick={() => navigate('/register')} className="btn btn-link p-0">Regístrate</button>
            </p>
            <p>{message}</p>
        </div>
    );
};

export default LoginPage;
