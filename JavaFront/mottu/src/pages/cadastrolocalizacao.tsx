import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from './styles/CadastroLocalizacao.module.css';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';

interface Localizacao {
  idLocalizacao: number;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function CadastroLocalizacao() {
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);
  const [editando, setEditando] = useState<Localizacao | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [atualizacaoAutomatica, setAtualizacaoAutomatica] = useState(true);
  const [forcarAtualizacao, setForcarAtualizacao] = useState(false);

  useEffect(() => {
    buscarLocalizacoes();
  }, [paginaAtual, itensPorPagina]);

  const buscarLocalizacoes = async () => {
    if (!atualizacaoAutomatica && !forcarAtualizacao) return;
    
    setCarregando(true);
    try {
      const response = await fetch(`http://localhost:8080/api/localizacoes?page=${paginaAtual}&size=${itensPorPagina}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      setLocalizacoes(data.content || data);
      setTotalPaginas(data.totalPages || 1);
      
      
      if (forcarAtualizacao) {
        setForcarAtualizacao(false);
      }
    } catch (error) {
      console.error('Erro ao buscar localizações:', error);
      setMensagem(`Erro na conexão com a API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    
    
    setAtualizacaoAutomatica(false);
    
    const localizacao = {
      endereco,
      cidade,
      estado,
      cep
    };

    
    const dadosParaEnviar = editando 
      ? { ...localizacao, idLocalizacao: editando.idLocalizacao }
      : localizacao;

    try {
      let url = 'http://localhost:8080/api/localizacoes';
      let method = 'POST';
      
      if (editando) {
        url = `${url}/${editando.idLocalizacao}`;
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
      
      setMensagem(editando ? 'Localização atualizada com sucesso!' : 'Localização cadastrada com sucesso!');
      
      
      if (editando) {
        setLocalizacoes(prevLocalizacoes => 
          prevLocalizacoes.map(loc => 
            loc.idLocalizacao === editando.idLocalizacao ? dadosSalvos : loc
          )
        );
      } else {
        
        setLocalizacoes(prevLocalizacoes => [...prevLocalizacoes, dadosSalvos]);
      }
      
      limparFormulario();
      
      
      setTimeout(() => {
        setForcarAtualizacao(true);
        setAtualizacaoAutomatica(true);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao salvar localização:', error);
      setMensagem(`Erro: ${error instanceof Error ? error.message : 'Falha na operação'}`);
      setAtualizacaoAutomatica(true);
    }
  };

  const handleExcluir = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta localização?')) return;
    
    
    setAtualizacaoAutomatica(false);
    
    try {
      const response = await fetch(`http://localhost:8080/api/localizacoes/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao excluir: ${response.status}`);
      }
      
      setMensagem('Localização excluída com sucesso!');
      
      setLocalizacoes(prevLocalizacoes => 
        prevLocalizacoes.filter(loc => loc.idLocalizacao !== id)
      );
      
      if (editando && editando.idLocalizacao === id) {
        limparFormulario();
      }
      
      setTimeout(() => {
        setForcarAtualizacao(true);
        setAtualizacaoAutomatica(true);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao excluir localização:', error);
      setMensagem(`Erro: ${error instanceof Error ? error.message : 'Falha na operação'}`);
      setAtualizacaoAutomatica(true);
    }
  };

  const handleEditar = (localizacao: Localizacao) => {
    setAtualizacaoAutomatica(false);
    
    setEditando(localizacao);
    setEndereco(localizacao.endereco);
    setCidade(localizacao.cidade);
    setEstado(localizacao.estado);
    setCep(localizacao.cep);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setEndereco('');
    setCidade('');
    setEstado('');
    setCep('');
    setEditando(null);
  };

  const filtrarLocalizacoes = () => {
    if (!filtro) return localizacoes;
    
    const termoLowerCase = filtro.toLowerCase();
    return localizacoes.filter(loc => 
      loc.endereco.toLowerCase().includes(termoLowerCase) ||
      loc.cidade.toLowerCase().includes(termoLowerCase) ||
      loc.estado.toLowerCase().includes(termoLowerCase) ||
      loc.cep.toLowerCase().includes(termoLowerCase)
    );
  };

  const localizacoesFiltradas = filtrarLocalizacoes();

  const mudarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Localizações</h1>
        <p className={styles.description}>
          {editando ? 'Edite os dados da localização.' : 'Preencha os dados da nova localização.'}
        </p>

        {mensagem && <div className={styles.message}>{mensagem}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Endereço</label>
              <input
                type="text"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: Rua das Flores, 123"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: São Paulo"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Estado</label>
              <input
                type="text"
                value={estado}
                onChange={e => setEstado(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: SP"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>CEP</label>
              <input
                type="text"
                value={cep}
                onChange={e => setCep(e.target.value)}
                required
                className={styles.input}
                placeholder="Ex: 01234-567"
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              {editando ? 'Atualizar' : 'Cadastrar'} Localização
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
          <h2 className={styles.subtitle}>Localizações Cadastradas</h2>
          
          <div className={styles.tableControls}>
            <div className={styles.searchBox}>
              <input
                type="text"
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                placeholder="Buscar localização..."
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
          
          {!carregando && localizacoesFiltradas.length === 0 && (
            <p className={styles.emptyMessage}>Nenhuma localização encontrada.</p>
          )}
          
          {!carregando && localizacoesFiltradas.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Endereço</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>CEP</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {localizacoesFiltradas.map(loc => (
                    <tr key={loc.idLocalizacao}>
                      <td>{loc.idLocalizacao}</td>
                      <td>{loc.endereco}</td>
                      <td>{loc.cidade}</td>
                      <td>{loc.estado}</td>
                      <td>{loc.cep}</td>
                      <td className={styles.actionButtons}>
                        <button 
                          onClick={() => handleEditar(loc)} 
                          className={`${styles.actionButton} ${styles.editButton}`}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleExcluir(loc.idLocalizacao)} 
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