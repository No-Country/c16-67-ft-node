import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export default function Profile() {
  const [options, setOptions] = useState([]);
  const [user, setUser] = useState({ name: '', image_url: '' });
  const userId = JSON.parse(localStorage.getItem('userId'));
  const pet = JSON.parse(localStorage.getItem('pet'));

  const navigate = useNavigate();

  useEffect(() => {
    if (userId === null) {
      navigate('/login');
    }

    axios.get(`${API_URL_BASE}/api/v1/pet/userid/${userId}`).then((res) => {
      setOptions(
        res.data.map((pet) => {
          return {
            value: pet.petId,
            label: pet.name
          };
        })
      );
    });
    axios.get(`${API_URL_BASE}/api/v1/user/${userId}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  const onChange = (event) => {
    if (event.target.value === 'Agregar mascota') {
      navigate('/pets-create');
    } else {
      axios.get(`${API_URL_BASE}/api/v1/pet/${event.target.value}`).then((res) => {
        const pet = { petId: res.data.petId, name: res.data.name, image_url: res.data.image_url };
        localStorage.setItem('pet', JSON.stringify(pet));
      });
    }
  };

  return (
    <div className="px-4">
      <div className="flex flex-col items-center gap-y-4 mt-4">
        <img src={user.image_url} alt="User image" className="w-12 h-12 rounded-full" />
        <p>{user.name}</p>
      </div>
      <h2 className="mt-12">Mascotas</h2>
      <select name="select" onChange={onChange} className="w-full">
        <option>Agregar mascota</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} selected={option.value === pet.petId}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
