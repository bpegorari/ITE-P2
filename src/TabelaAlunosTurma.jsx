import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';


function Row(props) {
  const { row, handleEdit, index } = props;
  const [open, setOpen] = React.useState(false);
  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell component="th" scope="row">
          {row.nome}
        </TableCell>
        <TableCell align="right">{row.notas.join(', ')}</TableCell>
        <TableCell align="right">{row.faltas}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Anotações
              </Typography>
              <Typography variant="body1">
                {row.anotacoes}
              </Typography>
              <IconButton color="primary" aria-label="editar anotação" onClick={() => handleEdit(row.id, index)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TabelaAlunosTurma = ({ alunos, handleEdit }) => {
  
  return (
    <TableContainer style={{ width: '50%' }} component={Paper}>
      <Table aria-label="collapsible table">
      <TableHead>
  <TableRow>
    <TableCell align="right">ID</TableCell> {/* Incluído */}
    <TableCell>Nome</TableCell>
    <TableCell align="right">Notas</TableCell>
    <TableCell align="right">Faltas</TableCell>
  </TableRow>
</TableHead>
        <TableBody>
          {alunos.map((aluno, index) => (
            <Row key={index} row={aluno} handleEdit={handleEdit} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaAlunosTurma;
