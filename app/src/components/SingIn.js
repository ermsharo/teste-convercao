import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Grid } from "../style/GridSystem";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setUserInfo,
  getAplicationId,
  getToken,
} from "../services/storageManagement";
import Loading from "./Loading";

const BoardBox = styled.div`
  width: 100%;
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  height: 100%;
`;

const LoginBox = styled.div`
  padding-top: 32px;
  grid-column: 3/7;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  border: 8px solid #ffd740;
  border-radius: 8px;
  padding: 32px;
  margin-top: 64px;

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

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export default function SingIn() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    id_application: getAplicationId(),
  });

  const [loading, setLoading] = useState(false);

  const singIn = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${getToken()}`,
    };

    setLoading(true);
    await axios
      .post(
        "https://dart-converter-api.azurewebsites.net/api/auth/token",
        {
          username: formInputs.username,
          password: formInputs.password,
          id_application: formInputs.id_application,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setUserInfo(
          response.data.user.id_user,
          response.data.user.username,
          response.data.access_token
        );
        setLoading(false);
        navigate("/dart-converter/home");
      })
      .catch((error) => {
        setLoading(false);
        alert("Falha ao realizar o login");
      });
  };

  const createUser = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
    setLoading(true);
    await axios
      .post(
        "https://dart-converter-api.azurewebsites.net/api/user",
        {
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
        alert("Usuario criado com sucesso");
      })
      .catch((error) => {
        setLoading(false);
        alert("Dados de cadastro invalidos");
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
    <>
      <Loading open={loading} />
      <BoardBox>
        <LogoBox></LogoBox>
        <Grid>
          <LoginBox>
            <TextField
              fullWidth
              id="outlined-name"
              label="Usuário *"
              name="username"
              value={formInputs.username}
              onChange={handleChange}
            />
            <TextField
              type="password"
              fullWidth
              id="outlined-name"
              label="Senha *"
              name="password"
              value={formInputs.password}
              onChange={handleChange}
            />
            <Button
              onClick={() => {
                singIn();
              }}
              fullWidth
              variant="contained"
            >
              Entrar
            </Button>
            <Button
              onClick={() => {
                createUser();
              }}
              fullWidth
              variant="contained"
            >
              Cadastrar
            </Button>
          </LoginBox>
        </Grid>
      </BoardBox>
    </>
  );
}
