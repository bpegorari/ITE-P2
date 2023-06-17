import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TabelaAlunosTurma = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      const res = await axios.get('http://localhost:4000/turmas/1/alunos'); // Substitua pela URL da sua API
      setAlunos(res.data);
    };

    fetchAlunos();
  }, []);

  const handleEdit = async (alunoId, index) => {
    const novaAnotacao = window.prompt('Insira a nova anotação:');
    if (novaAnotacao) {
      try {
        await axios.post(`http://localhost:4000/turmas/1/alunos/${alunoId}/anotacoes?texto=${novaAnotacao}`);
        const alunosAtualizados = [...alunos];
        alunosAtualizados[index].anotacoes = novaAnotacao;
        setAlunos(alunosAtualizados);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Notas</th>
          <th>Faltas</th>
          <th>Anotações</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {alunos.map((aluno, index) => (
          <tr key={index}>
            <td>{aluno.id}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.notas.join(', ')}</td>
            <td>{aluno.faltas}</td>
            <td>{aluno.anotacoes}</td>
            <td>
              <button onClick={() => handleEdit(aluno.id, index)}>Editar Anotação</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaAlunosTurma;
