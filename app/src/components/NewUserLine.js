import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getToken, getAplicationId } from "../services/storageManagement";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AiTwotoneDelete, AiTwotoneSave, AiFillEdit } from "react-icons/ai";

const ActionsButton = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-around;
  font-size: 32px;
  cursor: pointer;
`;

const NewUserLine = ({ refreshUserBoards }) => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    id_application: getAplicationId(),
  });

  const [editionMode, setEditionMode] = useState(false);

  const createUser = async (user_id) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${getToken()}`,
    };
    await axios
      .post(
        `https://dart-converter-api.azurewebsites.net/api/user`,
        {
          username: formInputs.username,
          password: formInputs.password,
          id_application: formInputs.id_application,
        },
        {
          headers: headers,
        }
      )
      .then(() => {
        navigate("/dart-converter/home");
      })
      .catch(() => {
        // setRequestErrorAwnser(error.response.data);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setFormInputs({
      ...formInputs,
      [evt.target.name]: value,
    });
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center" component="th" scope="row"></TableCell>
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
        <TextField
          type="password"
          fullWidth
          id="outlined-name"
          label="Senha *"
          name="password"
          value={formInputs.password}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="center">{formInputs.id_application}</TableCell>

      <TableCell align="center">
        <ActionsButton>
          <div
            onClick={() => {
              createUser();
              refreshUserBoards();
            }}
          >
            <AiTwotoneSave />
          </div>
        </ActionsButton>
      </TableCell>
    </TableRow>
  );
};
export default NewUserLine;
