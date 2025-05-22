import React, { useState } from 'react';
import styles from './styles/Cadastro.module.css';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (senha !== confirmSenha) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioJaExiste = usuariosExistentes.find((user: any) => user.email === email);

    if (usuarioJaExiste) {
      setErrorMessage('Este email já está cadastrado.');
      return;
    }

    const novoUsuario = { nome, email, senha, bio: '' };

    localStorage.setItem('usuarios', JSON.stringify([...usuariosExistentes, novoUsuario]));
    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    localStorage.setItem('token', 'fake-token-123');

    alert('Cadastro realizado com sucesso!');
    router.push('/perfil');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginSection}>
        <div className={styles.formBox}>
          <div className={styles.logoContainer}>
            <img src="/mottuLogo.png" className={styles.logo} alt="Logo Mottu" />
          </div>
          <h2 className={styles.title}>Criar conta</h2>
          <p className={styles.subtitle}>Cadastre-se para reservar sua moto Mottu.</p>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <form onSubmit={handleCadastro}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirmar Senha</label>
              <input
                type="password"
                value={confirmSenha}
                onChange={e => setConfirmSenha(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>Cadastrar</button>
          </form>

          <div className={styles.separator}>ou</div>
          <p className={styles.infoText}>
            Já tem uma conta? <a href="/" className={styles.link}>Entrar</a>
          </p>
        </div>
      </div>
      <div className={styles.imageSection}></div>
    </div>
  );
}
