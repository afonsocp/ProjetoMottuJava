// src/pages/mapa.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/Mapa.module.css';

interface Moto {
  id: number;
  localizacao: string;
}

export default function Mapa() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/motos')
      .then(response => setMotos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mapeamento de Localizações</h1>
      <div className={styles.grid}>
        {motos.map(moto => (
          <div key={moto.id} className={styles.motoCard}>
            <p><strong>ID:</strong> {moto.id}</p>
            <p><strong>Localização:</strong> {moto.localizacao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
