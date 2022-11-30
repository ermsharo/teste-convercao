import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getToken, getAplicationId } from "./../services/storageManagement";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiTwotoneDelete, AiTwotoneSave, AiFillEdit } from "react-icons/ai";
import Loading from "./Loading";

const ActionsButton = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-around;
  font-size: 32px;
  svg {
    cursor: pointer;
  }
`;

const formatPassword = (password) => {
  if (!password) return "???";
};

const TableLine = ({
  user_id,
  username,
  password,
  id_application,
  refreshUserBoards,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [formInputs, setFormInputs] = useState({
    username: username,
    password: password,
    id_application: getAplicationId(),
  });

  const editUser = async () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${getToken()}`,
    };
    await axios
      .put(
        `https://dart-converter-api.azurewebsites.net/api/user`,
        {
          id_user: user_id,
          username: formInputs.username,
          password: formInputs.password,
          id_application: formInputs.id_application,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setLoading(false);
        alert("Edição realizada com sucesso");
        setEditPassword(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("Não foi possivel editar");
        setEditPassword(false);
      });
  };

  const deleteUser = async (user_id) => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${getToken()}`,
    };
    await axios
      .delete(
        `https://dart-converter-api.azurewebsites.net/api/user/${user_id}/${getAplicationId()}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        navigate("/dart-converter/home");
        setLoading(false);
      })
      .catch((error) => {
        // setRequestErrorAwnser(error.response.data);
        setLoading(false);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setFormInputs({
      ...formInputs,
      [evt.target.name]: value,
    });
  }

  return !editionMode ? (
    <>
      {" "}
      <Loading open={loading} />{" "}
      <TableRow
        key={user_id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="center" component="th" scope="row">
          {user_id}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {username}
        </TableCell>
        <TableCell align="center">{formatPassword(password)}</TableCell>
        <TableCell align="center">{id_application}</TableCell>

        <TableCell align="center">
          <ActionsButton>
            <div
              onClick={() => {
                setEditionMode(true);
              }}
            >
              <AiFillEdit />
            </div>
            <div
              onClick={() => {
                deleteUser(user_id);
                refreshUserBoards();
              }}
            >
              <AiTwotoneDelete />
            </div>
          </ActionsButton>
        </TableCell>
      </TableRow>
    </>
  ) : (
    <>
      {" "}
      <Loading open={loading} />
      <TableRow
        key={user_id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="center" component="th" scope="row">
          {user_id}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <TextField
            fullWidth
            id="outlined-name"
            label="Usuário *"
            name="username"
            value={formInputs.username}
            onChange={handleChange}
          />
        </TableCell>
        <TableCell align="center">
          {editPassword ? (
            <TextField
              type="password"
              fullWidth
              id="outlined-name"
              label="Senha *"
              name="password"
              value={formInputs.password}
              onChange={handleChange}
            />
          ) : (
            <>
              {" "}
              <Button
                onClick={() => {
                  setEditPassword(true);
                }}
                fullWidth
                variant="contained"
              >
                Alterar senha
              </Button>
            </>
          )}
        </TableCell>
        <TableCell align="center">{id_application}</TableCell>

        <TableCell align="center">
          <ActionsButton>
            <div
              onClick={() => {
                editUser();
                refreshUserBoards();
              }}
            >
              <AiTwotoneSave />
            </div>
          </ActionsButton>
        </TableCell>
      </TableRow>
    </>
  );
};
export default TableLine;
