import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Grid } from "../style/GridSystem";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    id_application: "48699c22-26a2-4126-9a63-f5d0dfd2768b",
  });

  const singIn = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
    console.log("response", formInputs);
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
        setRequestErrorAwnser(false);
        // saveUserInfo(response.data.id, response.data.token, response.data.name);
        // navigate("/");
        console.log("Response here -> ", response);
      })
      .catch((error) => {
        setRequestErrorAwnser(error.response.data);
      });
  };

  const [requestErrorAwnser, setRequestErrorAwnser] = useState(false);

  const navigate = useNavigate();

  function handleChange(evt) {
    const value = evt.target.value;
    setFormInputs({
      ...formInputs,
      [evt.target.name]: value,
    });
  }

  const saveUserInfo = (id, token, user) => {
    localStorage.setItem("id", id);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    localStorage.setItem("logged", true);
  };


  const loginUser = () =>{
    
  }

  return (
    <>
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
            {/* <Feedback
              status={requestErrorAwnser}
              success={false}
              display={requestErrorAwnser}
            /> */}

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
                // singIn();
              }}
              fullWidth
              variant="contained"
            >
              Cadastrar
            </Button>

            {/* <CreateAccountButton
              onClick={() => {
                navigate("create-account");
              }}
            >
              Create account
            </CreateAccountButton> */}
          </LoginBox>
        </Grid>
      </BoardBox>
    </>
  );
}
