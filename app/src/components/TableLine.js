import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getToken, getAplicationId } from "./../services/storageManagement";
import { useNavigate } from "react-router-dom";

const ActionsButton = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-around;
`;

const TableLine = ({ user_id, username, password, id_application }) => {
  const navigate = useNavigate();

  const [editionMode, setEditionMode] = useState(false);

  const deleteUser = async (user_id) => {
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
      })
      .catch((error) => {
        // setRequestErrorAwnser(error.response.data);
      });
  };

  return (
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
      <TableCell align="center">{password}</TableCell>
      <TableCell align="center">{id_application}</TableCell>

      <TableCell align="center">
        <ActionsButton>
          <div>EDIT </div>
          <div
            onClick={() => {
              deleteUser(user_id);
            }}
          >
            DELETE
          </div>
        </ActionsButton>
      </TableCell>
    </TableRow>
  );
};
export default TableLine;
