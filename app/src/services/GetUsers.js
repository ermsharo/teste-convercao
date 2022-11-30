import { useState, useEffect } from "react";
import axios from "axios";
import { getToken, getAplicationId } from "../services/storageManagement";

export const GetUsersData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(
          `https://dart-converter-api.azurewebsites.net/api/user/${getAplicationId()}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setData(result.data);
      } catch (error) {
        setIsError(error.response.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [refresh]);

  return [{ data, isLoading, isError }, setRefresh];
};
