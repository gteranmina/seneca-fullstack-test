import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ActivatePage = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('Activando...');
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/activate/${token}`);
                const text = await res.text();
                setMessage(text);
                setTimeout(() => navigate('/login'), 3000);
            } catch (err) {
                setMessage('Error al activar la cuenta');
            }
        };

        activateAccount();
    }, [token, navigate]);

    return (
        <div className="container">
            <h2>Activación de cuenta</h2>
            <p>{message}</p>
        </div>
    );
};

export default ActivatePage;
