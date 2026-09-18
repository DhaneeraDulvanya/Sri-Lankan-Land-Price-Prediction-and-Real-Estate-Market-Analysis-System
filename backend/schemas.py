from pydantic import BaseModel, Field

class HousePredictionRequest(BaseModel):
    beds: int = Field(
        ...,
        ge=1,
        le=20
    )
    bath: float = Field(
        ...,
        gt=0,
        le=20
    )
    property_sqft: float = Field(
        ...,
        gt=100,
        le=100000
    )
    type: str
    state: str
    locality: str