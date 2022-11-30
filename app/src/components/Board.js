/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import NewUserLine from "./NewUserLine";
const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  height: 100%;
  grid-column: 2/8;
  padding-top: 62px;

  input {
    font-family: "Varela Round", sans-serif;
  }
  button {
    font-family: "Varela Round", sans-serif;
    font-weight: 700;
    background-color: #673ab7;
    border-radius: 20px;

    &:hover {
      background-color: #673ab7;
      opacity: 0.9;
    }
  }
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

const CreateUserButton = styled.div`
  padding: 16px;
  margin-top: 16px;
  button {
    width: 20vw;
  }

  display: flex;
  justify-content: end;
`;

const Board = () => {
  const navigate = useNavigate();

  const userInfo = getUserInfo();
  const [refreshBoard, setRefreshBoard] = useState(false);
  const [{ data, isLoading, isError }, setRefresh] = GetUsersData();
  const [newUserArray, setNewUserArray] = useState([]);



  const refreshUserBoards = () => {
    setRefreshBoard(!refreshBoard);
    setRefresh(refreshBoard);
  };

  const fillNewUserArray = () => {
    let newUsers = newUserArray;
    newUsers.push({
      username: "",
      password: "",
    });
    setNewUserArray(newUsers);
    refreshUserBoards();
  };

  const emptyNewUserArray = () => {
    let newUsers = newUserArray;
    newUsers.pop();
    setNewUserArray(newUsers);
    refreshUserBoards();
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

          <CreateUserButton>
            {" "}
            <Button
              onClick={() => {
                fillNewUserArray();
              }}
              fullWidth
              variant="contained"
            >
              Criar usuario
            </Button>
          </CreateUserButton>
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

                  {newUserArray.map((row) => (
                    <NewUserLine
                      refreshUserBoards={refreshUserBoards}
                      emptyNewUserArray={emptyNewUserArray}
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
