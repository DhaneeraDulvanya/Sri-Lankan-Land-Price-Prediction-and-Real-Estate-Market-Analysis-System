from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os

from schemas import HousePredictionRequest


app = FastAPI(
    title="Real Estate Price Prediction API",
    description="API for predicting house prices using XGBoost",
    version="1.0.0"
)


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "house_price_xgboost.pkl"
)

model = joblib.load(MODEL_PATH)

print("MODEL LOADED:", type(model))


@app.get("/")
def home():
    return {
        "message": "Real Estate Price Prediction API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "XGBoost"
    }


@app.post("/predict")
def predict_price(
    house: HousePredictionRequest
):
    
    print("Received request:", house)

    input_data = pd.DataFrame({
        "BEDS": [house.beds],
        "BATH": [house.bath],
        "PROPERTYSQFT": [house.property_sqft],
        "TYPE": [house.type],
        "STATE": [house.state],
        "LOCALITY": [house.locality]
    })

    print("Input DataFrame:")
    print(input_data)
    print("Columns:", input_data.columns.tolist())

    try:
        prediction = model.predict(input_data)

        print("Raw prediction:", prediction)

        predicted_price = float(prediction[0])

        return {
            "predicted_price": round(predicted_price, 2)
        }

    except Exception as e:
        print("PREDICTION ERROR:", repr(e))

        return {
            "error": str(e)
        }