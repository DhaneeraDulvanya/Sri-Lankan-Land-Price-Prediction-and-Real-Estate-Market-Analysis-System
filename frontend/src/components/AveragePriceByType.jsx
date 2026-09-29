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

import { getAveragePriceByType } from "../services/api";

function AveragePriceByType() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getAveragePriceByType();

        const formattedData = result.map((item) => ({
          type: item.type,
          averagePrice: Number(item.average_price),
        }));

        setData(formattedData);

      } catch (error) {
        console.error("Average price by type error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <p className="text-slate-400">
          Loading property type analysis...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        Average Price by Property Type
      </h2>

      <p className="mb-6 mt-2 text-sm text-slate-400">
        Compare average property prices across different property types.
      </p>

      <ResponsiveContainer width="100%" height={450}>

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 80,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="type"
            angle={-25}
            textAnchor="end"
            interval={0}
            tick={{ fill: "#94a3b8" }}
          />

          <YAxis
            tick={{ fill: "#94a3b8" }}
            tickFormatter={(value) =>
              `Rs.${(value / 1000000).toFixed(1)}M`
            }
          />

          <Tooltip
            formatter={(value) => [
              `Rs.${Number(value).toLocaleString()}`,
              "Average Price",
            ]}
          />

          <Bar
            dataKey="averagePrice"
            name="Average Price"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AveragePriceByType;