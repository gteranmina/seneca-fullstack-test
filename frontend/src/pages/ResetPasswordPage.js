import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword })
        });

        const data = await res.json();
        setMessage(data.message);
        if (res.ok) {
            setTimeout(() => navigate('/login'), 3000);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success w-100">Cambiar contraseña</button>
                </form>
                <p className="text-center mt-3">{message}</p>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
