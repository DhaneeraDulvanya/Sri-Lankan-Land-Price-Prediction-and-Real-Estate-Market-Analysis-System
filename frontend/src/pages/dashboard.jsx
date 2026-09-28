import { useEffect, useState } from "react";
import { getMarketSummary } from "../services/api";
import PriceVsSizeChart from "../components/PriceVsPropertySizeChart";

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await getMarketSummary();
        setSummary(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load market statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <p className="text-slate-400">
          Loading market statistics...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">
            AI-Powered Real Estate Analytics
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Understand the market.
            <br />
            <span className="text-cyan-400">
              Predict property prices.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Analyze property information and use machine learning to
            estimate house prices with our XGBoost prediction model.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Prediction Model */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Prediction Model
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              XGBoost
            </h2>
          </div>

          {/* R² Score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Test R² Score
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-400">
              0.8691
            </h2>
          </div>

          {/* Features */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              ML Features
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              6
            </h2>
          </div>

        </div>

        {/* Live Market Statistics */}
        <div className="mt-10">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Market Overview
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Total Properties */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Total Properties
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {summary.total_properties?.toLocaleString()}
              </h3>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Average Price
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                Rs. {summary.average_price?.toLocaleString()}
              </h3>
            </div>

            {/* Median Price */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Median Price
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                Rs. {summary.median_price?.toLocaleString()}
              </h3>
            </div>

            {/* Average SQFT */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Average Property Size
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {summary.average_sqft?.toLocaleString()} sqft
              </h3>
            </div>

          </div>

        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Average Bedrooms
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {summary.average_beds}
            </h2>
          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Average Bathrooms
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {summary.average_baths}
            </h2>
          </div>

        </div>

        
          <div className="mt-10">
            <PriceVsSizeChart />
          </div>

        {/* Main Actions */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* Prediction */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold text-white">
              Predict a Property Price
            </h2>

            <p className="mt-3 text-slate-400">
              Enter property details and let the XGBoost model
              estimate the property's price.
            </p>

            <a
              href="/prediction"
              className="mt-6 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start Prediction →
            </a>

          </div>

          {/* Market Analysis */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold text-white">
              Explore Market Analysis
            </h2>

            <p className="mt-3 text-slate-400">
              Explore property trends, prices and market statistics
              through interactive visualizations.
            </p>

            <a
              href="/market-analysis"
              className="mt-6 inline-block rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              View Analysis →
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
