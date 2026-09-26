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

import { getShapAnalysis } from "../services/api";

function ShapChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShap = async () => {
      try {
        const result = await getShapAnalysis();

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
        console.error("Failed to load SHAP analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShap();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading SHAP analysis...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          SHAP Explainability
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Average contribution of model features to
          property price predictions.
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

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="feature"
              width={120}
            />

            <Tooltip />

            <Bar
              dataKey="importance"
              name="Mean |SHAP value|"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ShapChart;