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

import {
  getLocalityAnalysis,
} from "../services/api";


function LocalityChart() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadData = async () => {

      try {

        const result =
          await getLocalityAnalysis();

        const formattedData = result
          .slice(0, 15)
          .map((item) => ({

            locality: item.locality,

            averagePrice:
              item.average_price,

            propertyCount:
              item.property_count,

          }));

        setData(formattedData);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load locality analysis."
        );

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);


  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Average Price by Locality
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Top localities based on average property price
        </p>

      </div>


      {loading && (

        <div className="flex h-80 items-center justify-center">

          <p className="text-slate-500">
            Loading locality data...
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


      {!loading &&
        !error &&
        data.length > 0 && (

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data}
              layout="vertical"
              margin={{
                left: 20,
                right: 20,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                type="number"
                tick={{
                  fill: "#94a3b8",
                }}
              />

              <YAxis
                type="category"
                dataKey="locality"
                width={120}
                tick={{
                  fill: "#94a3b8",
                }}
              />

              <Tooltip
                formatter={(value) =>
                  `Rs.${Number(
                    value
                  ).toLocaleString()}`
                }
              />

              <Bar
                dataKey="averagePrice"
                fill="#22d3ee"
                radius={[
                  0,
                  6,
                  6,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      )}


      {!loading &&
        !error &&
        data.length === 0 && (

        <div className="flex h-80 items-center justify-center">

          <p className="text-slate-500">
            No locality data available.
          </p>

        </div>

      )}

    </div>
  );
}

export default LocalityChart;