// src/pages/disponibilidade.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/Disponibilidade.module.css';

interface Moto {
  id: number;
  status: string;
}

export default function Disponibilidade() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/motos')
      .then(response => setMotos(response.data))
      .catch(error => console.error(error));
  }, []);

  const getStatusClass = (status: string) => {
    if (status === 'DISPONIVEL') return styles.statusDisponivel;
    if (status === 'EM_USO') return styles.statusEmUso;
    return styles.statusManutencao;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disponibilidade das Motos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {motos.map(moto => (
            <tr key={moto.id}>
              <td>{moto.id}</td>
              <td className={getStatusClass(moto.status)}>{moto.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
