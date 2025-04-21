import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            fetch('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate('/login');
                });
        }
    }, [navigate]);

    if (loading) return <p className="text-center mt-5">Cargando...</p>;

    const formatDate = isoString => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-3">Bienvenido al Sistema</h2>
                <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Último acceso:</strong> {user.lastLogin ? formatDate(user.lastLogin) : 'Sin registro'}</p>

                <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/update')}>
                        Actualizar Información
                    </button>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;