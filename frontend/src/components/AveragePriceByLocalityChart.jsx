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
            propertyCount: Number(item.property_count),
          }))
          .filter(
            (item) =>
              item.locality &&
              Number.isFinite(item.averagePrice)
          )
          .sort((a, b) => b.averagePrice - a.averagePrice)
          .slice(0, 15);

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
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Average Price by Locality
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Top 15 localities based on average property price.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 100,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            tick={{ fill: "#94a3b8" }}
            tickFormatter={(value) =>
              `$${(value / 1000000).toFixed(1)}M`
            }
          />

          <YAxis
            type="category"
            dataKey="locality"
            width={120}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => [
              `Rs. ${Number(value).toLocaleString()}`,
              "Average Price",
            ]}
          />

          <Bar
            dataKey="averagePrice"
            name="Average Price"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AveragePriceByLocality;