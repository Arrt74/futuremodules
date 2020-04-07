import axios from "axios";

const getCSV = async (body) => {
  return await axios.post(`/gapi/fetch/csvkeys`, body);
}

const getCSVGraphKeys = async (body) => {
  return await axios.post(`/gapi/fetch/csvgraphkeys`, body);
}

export {
  getCSV,
  getCSVGraphKeys
}
