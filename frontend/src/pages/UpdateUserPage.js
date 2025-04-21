import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '', lastName: '', address: '', birthDate: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setForm({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    address: data.address || '',
                    birthDate: data.birthDate ? data.birthDate.substring(0, 10) : ''
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al obtener datos del usuario:', err);
                setMessage('Error al obtener datos del usuario');
                setLoading(false);
            });
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:5000/api/auth/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        setMessage(data.message);

        setTimeout(() => {
            navigate('/');
        }, 1000); // espera 1 segundo antes de redirigir
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className="container">
            <h2>Actualizar Información</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="Nombres" value={form.firstName} onChange={handleChange} required/>
                <input name="lastName" placeholder="Apellidos" value={form.lastName} onChange={handleChange} required/>
                <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required/>
                <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required/>
                <button type="submit">Actualizar</button>
                <button type="submit" onClick={() => navigate('/')}>Cancelar</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default UpdateUserPage;
