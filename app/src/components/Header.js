import * as React from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #673ab7;
  color: #ffd740;
  padding: 16px 32px;
  border: 6px;
  margin-bottom: 16px;
  -webkit-box-shadow: 0px -1px 8px 5px rgba(0, 0, 0, 0.17);
  box-shadow: 0px -1px 8px 5px rgba(0, 0, 0, 0.17);
  font-size: 24px;
`;

const LogoBox = styled.div`
  cursor: pointer;
`;

const Header = () => {
  //   const navigate = useNavigate();
  return (
    <header>
      <HeaderBox>
        <LogoBox
        //   onClick={() => {
        //     // navigate("/words");
        //   }}
        >
          Dart converter
        </LogoBox>
        <div>Sair</div>
      </HeaderBox>
    </header>
  );
};
export default Header;
