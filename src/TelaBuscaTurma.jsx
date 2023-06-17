import React, { useState } from 'react';
import axios from 'axios';
import TabelaAlunosTurma from './TabelaAlunosTurma'; // Importe o componente da tabela que criamos anteriormente
import { Button, TextField } from '@mui/material'; // Importando componentes do MUI

const TelaBuscaTurma = () => {
  const [turmaId, setTurmaId] = useState(''); // Para armazenar o ID da turma digitado pelo usuário
  const [alunos, setAlunos] = useState([]); // Para armazenar a lista de alunos

  const buscarAlunos = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/turmas/${turmaId}/alunos`);
      setAlunos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (alunoId, index) => {
    const novaAnotacao = window.prompt('Insira a nova anotação:');
    if (novaAnotacao) {
      try {
        await axios.post(`http://localhost:4000/turmas/${turmaId}/alunos/${alunoId}/anotacoes?texto=${novaAnotacao}`);
        const alunosAtualizados = [...alunos];
        alunosAtualizados[index].anotacoes = novaAnotacao;
        setAlunos(alunosAtualizados);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>Busca Alunos por Turma</h1>
      <TextField 
        label="ID da Turma" 
        variant="outlined" 
        value={turmaId} 
        onChange={(e) => setTurmaId(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={buscarAlunos}>
        Buscar
      </Button>
      <TabelaAlunosTurma alunos={alunos} handleEdit={handleEdit} />
    </div>
  );
};

export default TelaBuscaTurma;
