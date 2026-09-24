import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getPropertyTypeAnalysis } from "../services/api";

function PropertyTypeChart({ locality }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getPropertyTypeAnalysis( locality );

        const formattedData = result.map((item) => ({
          type: item.type,
          averagePrice: item.average_price,
        }));

        setData(formattedData);
      } catch (err) {
        console.error(err);
        setError("Unable to load property type analysis.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [ locality ]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Average Price by Property Type
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Average property price calculated from the dataset
        </p>
      </div>

      {loading && (
        <div className="flex h-80 items-center justify-center">
          <p className="text-slate-500">
            Loading chart...
          </p>
        </div>
      )}

      {error && (
        <div className="flex h-80 items-center justify-center">
          <p className="text-red-400">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="type"
                tick={{ fill: "#94a3b8" }}
              />

              <YAxis
                tick={{ fill: "#94a3b8" }}
              />

              <Tooltip
                formatter={(value) =>
                  `$${Number(value).toLocaleString()}`
                }
              />

              <Bar
                dataKey="averagePrice"
                fill="#22d3ee"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex h-80 items-center justify-center">
          <p className="text-slate-500">
            No property type data available.
          </p>
        </div>
      )}
    </div>
  );
}

export default PropertyTypeChart;