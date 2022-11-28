import * as React from "react";

import styled from "styled-components";
import { Grid } from "../style/GridSystem";
import { useNavigate } from "react-router-dom";

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
  line-height: 32px;
`;

const Board = () => {
  const navigate = useNavigate();
  return (
    <Grid>
      <BoardBox>
        <BoardTitleText>Olá usuario aqui, </BoardTitleText>
        <BoardTitleText>
          Segue a lista de usuários cadastrados no sistema.
        </BoardTitleText>
      </BoardBox>
    </Grid>
  );
};
export default Board;
