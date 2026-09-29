import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getPriceVsSqft } from "../services/api";

function PriceVsSizeChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getPriceVsSqft();

        console.log("PRICE VS SQFT RESPONSE:", response);

        const formattedData = response
          .map((item) => ({
            sqft: Number(item.sqft),
            price: Number(item.price),
          }))
          .filter((item) => Number.isFinite(item.sqft) && Number.isFinite(item.price));

        setData(formattedData);
      } catch (error) {
        console.error("PRICE VS SQFT ERROR:", error);
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
          Loading price analysis...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        Price vs Property Size
      </h2>

      <p className="mt-2 mb-6 text-sm text-slate-400">
        Relationship between property size and property price.
      </p>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={450}>

          <ScatterChart
            margin={{
              top: 20,
              right: 30,
              bottom: 40,
              left: 60,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="sqft"
              name="Property Size"
              tick={{ fill: "#94a3b8" }}
              label={{
                value: "Property Size (sqft)",
                position: "insideBottom",
                offset: -20,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              type="number"
              dataKey="price"
              name="Price"
              width={80}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) =>
                `Rs.${(value / 1000000).toFixed(1)}M`
              }
            />

            <Tooltip
              formatter={(value) =>
                [`Rs. ${Number(value).toLocaleString("en-LK", { maximumFractionDigits: 0 })}`, "Price"]
              }
              contentStyle={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#0f172a" }}
            />

            <Scatter
              name="Properties"
              data={data}
              fill="#22d3ee"
            />

          </ScatterChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default PriceVsSizeChart;