from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import joblib
import os

from schemas import HousePredictionRequest


# FastAPI Application

app = FastAPI(
    title="Real Estate Price Prediction API",
    description="API for house price prediction and real estate market analysis",
    version="1.0.0"
)


# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "house_price_xgboost.pkl"
)

model = joblib.load(MODEL_PATH)

print("MODEL LOADED:", type(model))


# Dataset

DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "dataset",
    "processed",
    "feature_engineered_house_prices.csv"
)

df = pd.read_csv(DATA_PATH)

print("DATASET LOADED")
print("Rows:", len(df))
print("Columns:", df.columns.tolist())


# Home

@app.get("/")
def home():
    return {
        "message": "Real Estate Price Prediction API is running"
    }

# Health Check

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "XGBoost",
        "dataset_rows": len(df)
    }


# House Price Prediction

@app.post("/predict")
def predict_price(house: HousePredictionRequest):

    input_data = pd.DataFrame({
        "BEDS": [house.beds],
        "BATH": [house.bath],
        "PROPERTYSQFT": [house.property_sqft],
        "TYPE": [house.type],
        "STATE": [house.state],
        "LOCALITY": [house.locality]
    })

    prediction = model.predict(input_data)

    predicted_price = float(prediction[0])

    return {
        "predicted_price": round(predicted_price, 2)
    }

# MARKET ANALYSIS APIs

# Market Summary

@app.get("/analytics/summary")
def market_summary():

    return {
        "total_properties": int(len(df)),
        "average_price": round(float(df["PRICE"].mean()), 2),
        "median_price": round(float(df["PRICE"].median()), 2),
        "average_sqft": round(float(df["PROPERTYSQFT"].mean()), 2),
        "average_beds": round(float(df["BEDS"].mean()), 2),
        "average_baths": round(float(df["BATH"].mean()), 2)
    }


# Property Type Analysis

@app.get("/analytics/property-types")
def property_type_analysis(
    locality: str | None = None
):

    filtered_df = df.copy()

    if locality:
        filtered_df = filtered_df[
            filtered_df["LOCALITY"] == locality
        ]

    result = (
        filtered_df
        .groupby("TYPE")["PRICE"]
        .mean()
        .reset_index()
    )

    result.columns = [
        "type",
        "average_price"
    ]

    result["average_price"] = (
        result["average_price"].round(2)
    )

    return result.to_dict(
        orient="records"
    )

# Average Price by State

@app.get("/analytics/states")
def city_analysis():

    result = (
        df.groupby("STATE")
        .agg(
            average_price=("PRICE", "mean"),
            property_count=("PRICE", "count")
        )
        .reset_index()
        .sort_values("average_price", ascending=False)
        .head(10)
    )

    result["average_price"] = result["average_price"].round(2)

    result.columns = [
        "state",
        "average_price",
        "property_count"
    ]

    return result.to_dict(orient="records")

# Average Price by Locality

@app.get("/analytics/localities")
def locality_analysis():

    result = (
        df.groupby("LOCALITY")
        .agg(
            average_price=("PRICE", "mean"),
            property_count=("PRICE", "count")
        )
        .reset_index()
        .sort_values("average_price", ascending=False)
        .head(15)
    )

    result["average_price"] = result["average_price"].round(2)

    result.columns = [
        "locality",
        "average_price",
        "property_count"
    ]

    return result.to_dict(orient="records")

# Price vs Property SQFT

@app.get("/analytics/price-vs-sqft")
def price_vs_sqft(
    locality: str | None = None
):

    filtered_df = df.copy()

    if locality:
        filtered_df = filtered_df[
            filtered_df["LOCALITY"] == locality
        ]

    result = (
        filtered_df[
            ["PROPERTYSQFT", "PRICE"]
        ]
        .dropna()
        .sample(
            min(500, len(filtered_df)),
            random_state=42
        )
    )

    result.columns = [
        "sqft",
        "price"
    ]

    return result.to_dict(
        orient="records"
    )

# Locality Analysis

@app.get("/analytics/localities")
def locality_analysis():

    result = (
        df.groupby("LOCALITY")
        .agg(
            average_price=("PRICE", "mean"),
            property_count=("PRICE", "count")
        )
        .reset_index()
        .sort_values(
            "average_price",
            ascending=False
        )
    )

    result["average_price"] = (
        result["average_price"].round(2)
    )

    result.columns = [
        "locality",
        "average_price",
        "property_count"
    ]

    return result.to_dict(
        orient="records"
    )

# Available Localities

@app.get("/analytics/locality-list")
def locality_list():

    localities = (
        df["LOCALITY"]
        .dropna()
        .drop_duplicates()
        .sort_values()
        .tolist()
    )

    return localities

# Filtered Market Summary

@app.get("/analytics/summary")
def market_summary(locality: str | None = None):

    filtered_df = df.copy()

    if locality:
        filtered_df = filtered_df[
            filtered_df["LOCALITY"] == locality
        ]

    return {
        "total_properties": int(len(filtered_df)),
        "average_price": round(
            float(filtered_df["PRICE"].mean()), 2
        ),
        "median_price": round(
            float(filtered_df["PRICE"].median()), 2
        ),
        "average_sqft": round(
            float(filtered_df["PROPERTYSQFT"].mean()), 2
        ),
        "average_beds": round(
            float(filtered_df["BEDS"].mean()), 2
        ),
        "average_baths": round(
            float(filtered_df["BATH"].mean()), 2
        )
    }

@app.get("/analytics/feature-importance")
def feature_importance():

    trained_model = model.named_steps["model"]
    preprocessor = model.named_steps["preprocessor"]

    feature_names = preprocessor.get_feature_names_out()
    importance_values = trained_model.feature_importances_

    result = []

    for name, importance in zip(feature_names, importance_values):
        result.append({
            "feature": name,
            "importance": round(float(importance), 6)
        })

    result = sorted(
        result,
        key=lambda x: x["importance"],
        reverse=True
    )

    return result[:15]