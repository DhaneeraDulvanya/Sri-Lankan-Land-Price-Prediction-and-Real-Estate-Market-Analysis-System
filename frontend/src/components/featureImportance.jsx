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

import { getFeatureImportance } from "../services/api";

function FeatureImportance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatureImportance = async () => {
      try {
        const result = await getFeatureImportance();

        const formattedData = result
          .map((item) => ({
            feature: item.feature
              .replace("num__", "")
              .replace("cat__", ""),
            importance: item.importance,
          }))
          .reverse();

        setData(formattedData);
      } catch (error) {
        console.error(
          "Failed to load feature importance:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadFeatureImportance();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading feature importance...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Feature Importance
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Features contributing most to the XGBoost
          price prediction model.
        </p>
      </div>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 120,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              tickFormatter={(value) =>
                `${(value * 100).toFixed(0)}%`
              }
            />

            <YAxis
              type="category"
              dataKey="feature"
              width={120}
            />

            <Tooltip
              formatter={(value) =>
                `${(value * 100).toFixed(2)}%`
              }
            />

            <Bar
              dataKey="importance"
              name="Importance"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default FeatureImportance;