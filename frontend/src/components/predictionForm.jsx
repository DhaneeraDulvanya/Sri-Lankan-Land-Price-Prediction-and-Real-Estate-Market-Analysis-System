import { useState } from "react";
import { predictHousePrice } from "../services/api";
import {
  predictHousePriceWithExplanation,
  getPropertyTypeList,
  getStateList,
  getLocalityList,
} from "../services/api";

function PredictionForm() {
  const [formData, setFormData] = useState({
    beds: 3,
    bath: 2,
    property_sqft: 1800,
    type: "House fo sale",
    state: "Colombo",
    locality: "Nugegoda",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [types, statesData, localitiesData] = await Promise.all([
          getPropertyTypeList(),
          getStateList(),
          getLocalityList(),
        ]);

        setPropertyTypes(types);
        setStates(statesData);
        setLocalities(localitiesData);

      } catch (error) {
        console.error("Failed to load dropdown data:", error);
      }
    };

    loadDropdownData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const data = await predictHousePrice({
        beds: Number(formData.beds),
        bath: Number(formData.bath),
        property_sqft: Number(formData.property_sqft),
        type: formData.type,
        state: formData.state,
        locality: formData.locality,
      });

      setPrediction(data.predicted_price);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to generate prediction. Please make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">

      {/* Form */}
      <div className="lg:col-span-2">

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* Beds */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Bedrooms
              </label>

              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                min="1"
                max="20"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* Bath */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Bathrooms
              </label>

              <input
                type="number"
                name="bath"
                value={formData.bath}
                onChange={handleChange}
                min="0.5"
                max="20"
                step="0.5"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* SQFT */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Property SQFT
              </label>

              <input
                type="number"
                name="property_sqft"
                value={formData.property_sqft}
                onChange={handleChange}
                min="101"
                max="100000"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Property Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select property type</option>

                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select state</option>

                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {/* Locality */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Locality
                </label>

                <select
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                >
                  <option value="">Select locality</option>

                  {localities.map((locality) => (
                    <option key={locality} value={locality}>
                      {locality}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Predicting..." : "Predict House Price"}
            </button>

        </form>

      </div>

      {/* Result */}
      <div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-sm font-medium text-slate-400">
            AI Prediction
          </p>

          {prediction !== null ? (
            <div className="mt-4">

              <p className="text-sm text-slate-400">
                Estimated Property Price
              </p>

              <h2 className="mt-2 text-4xl font-bold text-cyan-400">
                RS. {prediction.toLocaleString()}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                Prediction generated using the XGBoost regression model.
              </p>

            </div>
          ) : (
            <div className="mt-6">

              <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-700">

                <p className="text-center text-sm text-slate-500">
                  Enter property details and click
                  <br />
                  "Predict House Price"
                </p>

              </div>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-4">

              <p className="text-sm text-red-400">
                {error}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default PredictionForm;