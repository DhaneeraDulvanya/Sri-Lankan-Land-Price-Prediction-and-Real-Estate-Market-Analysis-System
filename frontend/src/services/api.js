import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictHousePrice = async (houseData) => {
  const response = await API.post("/predict", houseData);
  return response.data;
};

export const getMarketSummary = async () => {
  const response = await API.get("/analytics/summary");
  return response.data;
};

export const getPropertyTypeAnalysis = async () => {
  const response = await API.get("/analytics/property-types");
  return response.data;
};

export const getCityAnalysis = async () => {
  const response = await API.get("/analytics/states");
  return response.data;
};

export const getLocalityAnalysis = async () => {
  const response = await API.get("/analytics/localities");
  return response.data;
};

export const getPriceVsSqft = async () => {
  const response = await API.get("/analytics/price-vs-sqft");
  return response.data;
};

export const getLocalityList = async () => {
  const response = await API.get("/analytics/locality-list");
  return response.data;
};

export default API;

