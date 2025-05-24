import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from './styles/Perfil.module.css';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [bio, setBio] = useState('');
  const [editando, setEditando] = useState(false);
  const [emailAntigo, setEmailAntigo] = useState('');
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true); 
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    setNome(usuario.nome || '');
    setEmail(usuario.email || '');
    setSenha(usuario.senha || '');
    setBio(usuario.bio || '');
    setEmailAntigo(usuario.email || '');
  }, []);

  const salvarAlteracoes = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const emailEmUso = usuarios.some(
      (u: any) => u.email === email && u.email !== emailAntigo
    );

    if (emailEmUso) {
      alert('Este email já está em uso por outro usuário.');
      return;
    }

    const usuarioAtualizado = { nome, email, senha, bio };

    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

    const usuariosAtualizados = usuarios.map((u: any) =>
      u.email === emailAntigo ? usuarioAtualizado : u
    );

    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    setEmailAntigo(email);
    setEditando(false);
    alert('Perfil atualizado com sucesso!');
  };

  const excluirConta = () => {
    if (confirm('Deseja realmente excluir sua conta?')) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuariosAtualizados = usuarios.filter((u: any) => u.email !== email);
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      window.location.href = '/cadastro';
    }
  };

  
  if (!isClient) return null;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Meu Perfil</h1>
        <div className={styles.avatarContainer}>
          <img src="/avatar.webp" alt="Avatar" className={styles.avatar} />
        </div>

        <div className={styles.infoBox}>
          <label className={styles.label}>Nome:</label>
          {editando ? (
            <input
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          ) : (
            <p className={styles.value}>{nome}</p>
          )}
        </div>

        <div className={styles.infoBox}>
          <label className={styles.label}>Email:</label>
          {editando ? (
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p className={styles.value}>
              {email ? email.replace(/(.{2}).+(@.+)/, '$1****$2') : ''}
            </p>
          )}
        </div>

        <div className={styles.infoBox}>
          <label className={styles.label}>Senha:</label>
          {editando ? (
            <input
              type="password"
              className={styles.input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          ) : (
            <p className={styles.value}>{senha ? '*'.repeat(senha.length) : ''}</p>
          )}
        </div>

        <div className={styles.infoBox}>
          <label className={styles.label}>Bio:</label>
          {editando ? (
            <textarea
              className={styles.textarea}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p className={styles.value}>{bio || 'Nenhuma bio adicionada.'}</p>
          )}
        </div>

        <div className={styles.buttons}>
          {editando ? (
            <>
              <button onClick={salvarAlteracoes} className={styles.saveButton}>
                Salvar
              </button>
              <button
                onClick={() => setEditando(false)}
                className={styles.cancelButton}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditando(true)}
              className={styles.editButton}
            >
              Editar Perfil
            </button>
          )}
          <button onClick={excluirConta} className={styles.deleteButton}>
            Excluir Conta
          </button>
        </div>
      </div>
    </>
  );
}
