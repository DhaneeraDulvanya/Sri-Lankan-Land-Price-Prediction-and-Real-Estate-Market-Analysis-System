import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getAveragePriceByLocality } from "../services/api";

function AveragePriceByLocality() {
  const [data, setData] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getAveragePriceByLocality();

        console.log("LOCALITY DATA:", result);

        const formattedData = result
          .map((item) => ({
            locality: item.locality,
            averagePrice: Number(item.average_price),
            medianPrice: Number(item.median_price),
            propertyCount: Number(item.property_count),
          }))
          .filter(
            (item) =>
              item.locality &&
              Number.isFinite(item.averagePrice)
          )
          .sort((a, b) => a.locality.localeCompare(b.locality));

        setData(formattedData);

      } catch (err) {
        console.error("Locality analysis error:", err);
        setError("Failed to load locality analysis.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <p className="text-slate-400">
          Loading locality analysis...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  const selectedData = selectedLocality
    ? data.find((item) => item.locality === selectedLocality)
    : null;
  const chartData = (selectedData ? [selectedData] : selectedLocality ? [] : data).map(
    (item) => ({
      name: item.locality,
      averagePrice: item.averagePrice,
      medianPrice: item.medianPrice,
    })
  );

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Locality Market Analysis
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Select a locality to explore its property market statistics.
        </p>
      </div>

      {/* Locality Dropdown */}
      <div className="mb-8 max-w-md">

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Select Locality
        </label>

        <select
          value={selectedLocality}
          onChange={(e) => setSelectedLocality(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3
                     text-slate-200 outline-none transition-all duration-200
                     hover:border-slate-600
                     focus:border-cyan-500
                     focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="" className="bg-slate-900 text-slate-200">
            All Localities
          </option>
          {data.map((item) => (
            <option
              key={item.locality}
              value={item.locality}
              className="bg-slate-900 text-slate-200"
            >
              {item.locality}
            </option>
          ))}
        </select>

      </div>

      {/* Selected Locality Statistics */}
      {selectedData && (
        <div className="grid gap-4 sm:grid-cols-3">

          {/* Average Price */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              Average Price
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-400">
              Rs.{selectedData.averagePrice.toLocaleString()}
            </h3>
          </div>

          {/* Median Price */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              Median Price
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              Rs.{selectedData.medianPrice.toLocaleString()}
            </h3>
          </div>

          {/* Property Count */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              Properties
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {selectedData.propertyCount.toLocaleString()}
            </h3>
          </div>

        </div>
      )}

      {/* Selected Locality Chart */}
      {chartData.length > 0 && (
        <div className="mt-10">

          <ResponsiveContainer
            width="100%"
            height={Math.max(350, chartData.length * 36)}
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 20,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                tick={{ fill: "#94a3b8" }}
                tickFormatter={(value) =>
                  `Rs.${(value / 1000000).toFixed(1)}M`
                }
              />

              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fill: "#94a3b8" }}
              />

              <Tooltip
                formatter={(value, name) => [
                  `Rs. ${Number(value).toLocaleString()}`,
                  name === "averagePrice" || name === "Average Price"
                    ? "Average Price"
                    : "Median Price",
                ]}
              />

              <Bar
                dataKey="averagePrice"
                name="Average Price"
                fill="#3b82f6"
              />

              <Bar
                dataKey="medianPrice"
                name="Median Pric"
                fill="#1a04d9"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default AveragePriceByLocality;
