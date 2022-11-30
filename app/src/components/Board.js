import * as React from "react";

import styled from "styled-components";
import { Grid } from "../style/GridSystem";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  height: 100%;
  grid-column: 2/8;
  padding-top: 62px;
`;

const BoardTitleText = styled.div`
  font-family: "Varela Round", sans-serif;
  font-weight: 400;

  font-size: 24px;
  line-height: 40px;
`;

const TableBox = styled.div`
  padding: 16px;
  margin-top: 16px;
`;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Board = () => {
  const navigate = useNavigate();
  return (
    <Grid>
      <BoardBox>
        <BoardTitleText>Olá usuario aqui, </BoardTitleText>
        <BoardTitleText>
          Segue a lista de usuários cadastrados no sistema.
        </BoardTitleText>
        <TableBox>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Usuário</TableCell>
                  <TableCell align="center">Senha</TableCell>
                  <TableCell align="center">Aplicação</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableBox>
      </BoardBox>
    </Grid>
  );
};
export default Board;
