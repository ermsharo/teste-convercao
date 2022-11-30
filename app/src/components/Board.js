import React, { useState } from "react";
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
import { getUserInfo } from "../services/storageManagement";
import { GetUsersData } from "../services/GetUsers";
import TableLine from "./TableLine";

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

const Board = () => {
  const navigate = useNavigate();

  const userInfo = getUserInfo();
  const [refreshBoard, setRefreshBoard] = useState(false);
  const [{ data, isLoading, isError }, setRefresh] = GetUsersData();

  const refreshUserBoards = () => {
    console.log("refresh board");
    setRefreshBoard(!refreshBoard);
    setRefresh(refreshBoard);
  };

  if (isLoading) return <>Loading</>;

  if (data)
    return (
      <Grid>
        <BoardBox>
          <BoardTitleText>Olá {userInfo.user} </BoardTitleText>
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
                  {data.map((row) => (
                    <TableLine
                      user_id={row.id_user}
                      username={row.username}
                      password={row.password}
                      id_application={row.id_application}
                      refreshUserBoards={refreshUserBoards}
                    />
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
