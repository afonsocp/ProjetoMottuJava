import React, { useState } from 'react';
import styles from './styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioValido = usuarios.find(
      (user: any) => user.email === email && user.senha === senha
    );

    if (usuarioValido) {
      localStorage.setItem('token', 'fake-token-123');
      localStorage.setItem('usuario', JSON.stringify(usuarioValido));

      alert('Login realizado com sucesso!');
      window.location.href = '/perfil';
    } else {
      setErrorMessage('Email ou senha incorretos.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginSection}>
        <div className={styles.formBox}>
          <div className={styles.logoContainer}>
            <img src="/mottuLogo.png" className={styles.logo} alt="Logo Mottu" />
          </div>
          <h2 className={styles.title}>Bem-vindo de volta!</h2>
          <p className={styles.subtitle}>Entre para continuar reservando sua moto Mottu.</p>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <form onSubmit={handleLogin}>
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
            <div className={styles.remember}>
              <label>
                <input type="checkbox" /> Lembrar de mim
              </label>
            </div>
            <button type="submit" className={styles.button}>Entrar</button>
          </form>

          <div className={styles.separator}>ou</div>
          <p className={styles.infoText}>
            Não tem uma conta? <a href="/cadastro" className={styles.link}>Cadastre-se</a>
          </p>
        </div>
      </div>
      <div className={styles.imageSection}></div>
    </div>
  );
}
