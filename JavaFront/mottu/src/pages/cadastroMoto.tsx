import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './styles/CadastroMoto.module.css';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';

interface Moto {
  idMoto: number;
  placa: string;
  modelo: string;
  ano: number;
  status: string;
}

export default function CadastroMoto() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState<number | ''>('');
  const [status, setStatus] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [motos, setMotos] = useState<Moto[]>([]);
  const [editando, setEditando] = useState<Moto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  
  
  const [atualizacaoAutomatica, setAtualizacaoAutomatica] = useState(true);
  const [forcarAtualizacao, setForcarAtualizacao] = useState(false);

  
  useEffect(() => {
    buscarMotos();
  }, [paginaAtual, itensPorPagina, atualizacaoAutomatica, forcarAtualizacao]);

  const buscarMotos = async () => {
    
    if (!atualizacaoAutomatica && !forcarAtualizacao) return;
    
    setCarregando(true);
    try {
      const response = await fetch(`http://localhost:8080/api/motos?page=${paginaAtual}&size=${itensPorPagina}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      setMotos(data.content || data);
      setTotalPaginas(data.totalPages || 1);
      
      
      if (forcarAtualizacao) {
        setForcarAtualizacao(false);
      }
    } catch (error) {
      console.error('Erro ao buscar motos:', error);
      setMensagem(`Erro na conexão com a API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    
    
    if (!placa || !modelo || !ano || !status) {
      setMensagem('Todos os campos são obrigatórios!');
      return;
    }
    
    
    setAtualizacaoAutomatica(false);
    
    const moto = {
      placa,
      modelo,
      ano,
      status,
    };

    
    const dadosParaEnviar = editando 
      ? { ...moto, idMoto: editando.idMoto }
      : moto;

    try {
      let url = 'http://localhost:8080/api/motos';
      let method = 'POST';
      
      if (editando) {
        url = `${url}/${editando.idMoto}`;
        method = 'PUT';
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erro ${response.status}` }));
        throw new Error(errorData?.message || 'Falha na operação');
      }
      
      const dadosSalvos = await response.json();
      
      setMensagem(editando ? 'Moto atualizada com sucesso!' : 'Moto cadastrada com sucesso!');
      
      
      if (editando) {
        setMotos(prevMotos => 
          prevMotos.map(m => 
            m.idMoto === editando.idMoto ? dadosSalvos : m
          )
        );
      } else {
       
        setMotos(prevMotos => [...prevMotos, dadosSalvos]);
      }
      
      limparFormulario();
      
      
    } catch (error) {
      console.error('Erro ao salvar moto:', error);
      setMensagem(`Erro: ${error instanceof Error ? error.message : 'Falha na operação'}`);
      setAtualizacaoAutomatica(true);
    }
  };

  const handleExcluir = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta moto?')) return;
    
    
    setAtualizacaoAutomatica(false);
    
    try {
      const response = await fetch(`http://localhost:8080/api/motos/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao excluir: ${response.status}`);
      }
      
      setMensagem('Moto excluída com sucesso!');
      
      
      setMotos(prevMotos => 
        prevMotos.filter(m => m.idMoto !== id)
      );
      
      
      if (editando && editando.idMoto === id) {
        limparFormulario();
      }
      
      
      setTimeout(() => {
        setForcarAtualizacao(true);
        setAtualizacaoAutomatica(true);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao excluir moto:', error);
      setMensagem(`Erro: ${error instanceof Error ? error.message : 'Falha na operação'}`);
      setAtualizacaoAutomatica(true);
    }
  };

  const handleEditar = (moto: Moto) => {
    
    setAtualizacaoAutomatica(false);
    
    setEditando(moto);
    setPlaca(moto.placa);
    setModelo(moto.modelo);
    setAno(moto.ano);
    setStatus(moto.status);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setPlaca('');
    setModelo('');
    setAno('');
    setStatus('');
    setEditando(null);
  };

  const filtrarMotos = () => {
    if (!filtro) return motos;
    
    const termoLowerCase = filtro.toLowerCase();
    return motos.filter(moto => 
      moto.placa.toLowerCase().includes(termoLowerCase) ||
      moto.modelo.toLowerCase().includes(termoLowerCase) ||
      moto.status.toLowerCase().includes(termoLowerCase),
    );
  };

  const motosFiltradas = filtrarMotos();

  const mudarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Motos</h1>
        <p className={styles.description}>
          {editando ? 'Edite os dados da moto.' : 'Preencha os dados da nova moto.'}
        </p>

        {mensagem && <div className={styles.message}>{mensagem}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Placa</label>
              <input
                type="text"
                value={placa}
                onChange={e => setPlaca(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: ABC-1234"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Modelo</label>
              <input
                type="text"
                value={modelo}
                onChange={e => setModelo(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: Honda CB 500"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Ano</label>
              <input
                type="number"
                value={ano}
                onChange={e => setAno(e.target.value ? parseInt(e.target.value) : '')}
                required
                className={styles.input}
                placeholder="Ex: 2023"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                required
                className={styles.input}
              >
                <option value="">Selecione um status</option>
                <option value="Disponível">Disponível</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Alugada">Alugada</option>
                <option value="Reservada">Reservada</option>
              </select>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              {editando ? 'Atualizar' : 'Cadastrar'} Moto
              {editando ? <FaEdit className={styles.buttonIcon} /> : <FaPlus className={styles.buttonIcon} />}
            </button>
            {editando && (
              <button 
                type="button" 
                onClick={limparFormulario} 
                className={`${styles.button} ${styles.cancelButton}`}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className={styles.listContainer}>
          <h2 className={styles.subtitle}>Motos Cadastradas</h2>
          
          <div className={styles.tableControls}>
            <div className={styles.searchBox}>
              <input
                type="text"
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                placeholder="Buscar moto..."
                className={styles.searchInput}
              />
              <FaSearch className={styles.searchIcon} />
            </div>
            
            <div className={styles.itemsPerPage}>
              <label>Itens por página:</label>
              <select 
                value={itensPorPagina} 
                onChange={e => setItensPorPagina(Number(e.target.value))}
                className={styles.select}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          
          {carregando && <p className={styles.loading}>Carregando...</p>}
          
          {!carregando && motosFiltradas.length === 0 && (
            <p className={styles.emptyMessage}>Nenhuma moto encontrada.</p>
          )}
          
          {!carregando && motosFiltradas.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {motosFiltradas.map(moto => (
                    <tr key={moto.idMoto}>
                      <td>{moto.idMoto}</td>
                      <td>{moto.placa}</td>
                      <td>{moto.modelo}</td>
                      <td>{moto.ano}</td>
                      <td>{moto.status}</td>
                      <td className={styles.actionButtons}>
                        <button 
                          onClick={() => handleEditar(moto)} 
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleExcluir(moto.idMoto)} 
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {totalPaginas > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => mudarPagina(paginaAtual - 1)} 
                disabled={paginaAtual === 0}
                className={styles.pageButton}
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i}
                  onClick={() => mudarPagina(i)}
                  className={`${styles.pageButton} ${paginaAtual === i ? styles.activePage : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => mudarPagina(paginaAtual + 1)} 
                disabled={paginaAtual === totalPaginas - 1}
                className={styles.pageButton}
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
