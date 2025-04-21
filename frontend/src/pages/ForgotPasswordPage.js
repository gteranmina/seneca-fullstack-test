import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100">Enviar correo</button>
                </form>
                <p className="text-center mt-3">{message}</p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
