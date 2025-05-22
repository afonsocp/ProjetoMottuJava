import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaMotorcycle, FaClipboardList, FaUserCircle, FaSignOutAlt, FaWarehouse } from 'react-icons/fa';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');

  const toggleMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.nome) {
      setNomeUsuario(usuario.nome);
    } else {
      setNomeUsuario('Usuário');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <>
      <header className={styles.header}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <GiHamburgerMenu size={24} />
        </button>
        <img src="/mottu-branca.png" alt="Logo Mottu" className={styles.logo} />
      </header>

      <nav className={`${styles.sideMenu} ${menuAberto ? styles.open : ''}`}>
        <div className={styles.userInfo}>
          <img src="/avatar.webp" alt="Avatar do Usuário" className={styles.userAvatar} />
          <span className={styles.userName}>{nomeUsuario}</span>
        </div>

        <ul>
          <li><a href="/cadastroMoto"><FaMotorcycle /> Cadastro Moto</a></li>
          <li><a href="/cadastrolocalizacao"><FaClipboardList /> Cadastro Localização</a></li>
          <li><a href="/perfil"><FaUserCircle /> Perfil</a></li>
          <li><a onClick={handleLogout} className={styles.logout}><FaSignOutAlt /> Sair</a></li>
        </ul>
      </nav>

      {menuAberto && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
}
