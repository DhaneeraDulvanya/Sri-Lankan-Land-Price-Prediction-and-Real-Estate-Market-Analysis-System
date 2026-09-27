import { useState } from "react";
import { predictHousePrice } from "../services/api";
import { predictHousePriceWithExplanation } from "../services/api";

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

  const [result, setResult] = useState(null);

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
    setResult(null);

    try {
      const houseData = {
        beds: Number(formData.beds),
        bath: Number(formData.bath),
        property_sqft: Number(formData.property_sqft),
        type: formData.type,
        state: formData.state,
        locality: formData.locality,
      };

      const data = await predictHousePriceWithExplanation(
        houseData
      );

      setResult(data);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to predict the property price. Please check your input."
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="House for Sale">House for sale</option>
                <option value="Villa For Sale">Villa for sale</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            {/* Locality */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Locality
              </label>

              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Price"}
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

          {result && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm font-medium text-slate-400">
                Estimated Property Price
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                Rs. {Math.round(result.predicted_price).toLocaleString()}
              </h2>

            </div>
          )}

          {result && result.explanations?.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-2xl font-bold text-white">
                Why did the model predict this price?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                These features had the largest contributions to this prediction.
              </p>

              <div className="mt-6 space-y-3">

                {result.explanations.map((item) => {
                  const positive = item.shap_value >= 0;

                  const featureName = item.feature
                    .replace("num__", "")
                    .replace("cat__", "");

                  return (
                    <div
                      key={item.feature}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
                    >

                      <span className="text-slate-300">
                        {featureName}
                      </span>

                      <span
                        className={
                          positive
                            ? "font-semibold text-emerald-400"
                            : "font-semibold text-red-400"
                        }
                      >
                        {positive ? "+" : "-"}Rs. 
                        {Math.abs(
                          Math.round(item.shap_value)
                        ).toLocaleString()}
                      </span>

                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4">
              <p className="text-red-400">
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