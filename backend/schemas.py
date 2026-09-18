from pydantic import BaseModel

class HousePredictionRequest(BaseModel):
    beds: int
    bath: float
    property_sqft: float
    type: str
    state: str
    locality: str