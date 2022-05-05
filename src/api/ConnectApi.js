import axios from "axios";
import { useState, useEffect } from "react";

const ConnectApi = (url, pageNumber) => {
  const [dataState, setDataState] = useState({ data: [] });
  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const response = await axios.get(url);
        setDataState({ ...dataState, data: response.data });
      } catch (e) {
        console.log(e);
      }
    }
    fetchDataFromApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);
  return [dataState];
};

export default ConnectApi;
