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

export const getMarketSummary = async (locality = "") => {

  const url = locality
    ? `/analytics/summary?locality=${encodeURIComponent(locality)}`
    : "/analytics/summary";

  const response = await API.get(url);

  return response.data;
};

export const getPropertyTypeAnalysis = async (
  locality = ""
) => {

  const url = locality
    ? `/analytics/property-types?locality=${encodeURIComponent(locality)}`
    : "/analytics/property-types";

  const response = await API.get(url);

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

export const getPriceVsSqft = async (
  locality = ""
) => {

  const url = locality
    ? `/analytics/price-vs-sqft?locality=${encodeURIComponent(locality)}`
    : "/analytics/price-vs-sqft";

  const response = await API.get(url);

  return response.data;
};

export const getLocalityList = async () => {
  const response = await API.get("/analytics/locality-list");
  return response.data;
};


export const getFeatureImportance = async () => {
  const response = await API.get("/analytics/feature-importance");
  return response.data;
};

export const getModelPerformance = async () => {
  const response = await API.get("/analytics/model-performance");
  return response.data;
};

export const getShapAnalysis = async () => {
  const response = await API.get("/analytics/shap");
  return response.data;
};

export const predictHousePriceWithExplanation = async (houseData) => {
  const response = await API.post(
    "/predict/explain",
    houseData
  );

  return response.data;
};

export default API;

