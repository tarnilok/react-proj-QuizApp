import axios from "axios";
import { useState, useEffect } from "react";

const ConnectApi = (url, pageNumber) => {
  const [dataState, setDataState] = useState({ data: [] });
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(url);
        setDataState({ ...dataState, data: response.data });
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataFromApi();
  }, [pageNumber, url, dataState]);
  return [dataState];
};

export default ConnectApi;
