import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getPriceVsSqft } from "../services/api";


function PriceChart({ locality }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getPriceVsSqft(locality);

        setData(result);

      } catch (err) {
        console.error(err);

        setError(
          "Unable to load price and property size data."
        );

      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [locality]);


  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Property Size vs Price
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {locality
            ? `Property size and price relationship in ${locality}`
            : "Relationship between property size and price"}
        </p>

      </div>


      {/* Loading */}

      {loading && (
        <div className="flex h-80 items-center justify-center">

          <p className="text-slate-500">
            Loading price analysis...
          </p>

        </div>
      )}


      {/* Error */}

      {error && (
        <div className="flex h-80 items-center justify-center">

          <p className="text-red-400">
            {error}
          </p>

        </div>
      )}


      {/* Chart */}

      {!loading && !error && data.length > 0 && (

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <ScatterChart>

              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                type="number"
                dataKey="sqft"
                name="Property SQFT"
                tick={{ fill: "#94a3b8" }}
              />


              <YAxis
                type="number"
                dataKey="price"
                name="Price"
                tick={{ fill: "#94a3b8" }}
              />


              <Tooltip
                cursor={{
                  strokeDasharray: "3 3"
                }}

                formatter={(value, name) => {

                  if (name === "Price") {
                    return [
                      `Rs. ${Number(value).toLocaleString()}`,
                      name
                    ];
                  }

                  return [
                    Number(value).toLocaleString(),
                    name
                  ];
                }}
              />


              <Scatter
                name="Properties"
                data={data}
                fill="#22d3ee"
              />

            </ScatterChart>

          </ResponsiveContainer>

        </div>
      )}


      {/* No Data */}

      {!loading &&
        !error &&
        data.length === 0 && (

          <div className="flex h-80 items-center justify-center">

            <p className="text-slate-500">
              No price data available.
            </p>

          </div>
        )}

    </div>
  );
}


export default PriceChart;