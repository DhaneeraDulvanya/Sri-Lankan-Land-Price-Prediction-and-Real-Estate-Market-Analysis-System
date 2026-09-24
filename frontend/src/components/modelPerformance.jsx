import { useEffect, useState } from "react";
import { getModelPerformance } from "../services/api";

function ModelPerformance() {
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPerformance = async () => {
      try {
        const data = await getModelPerformance();
        setPerformance(data);
      } catch (error) {
        console.error("Failed to load model performance:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPerformance();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading model performance...
        </p>
      </div>
    );
  }

  if (!performance) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
        <p className="text-red-400">
          Unable to load model performance.
        </p>
      </div>
    );
  }

  const metrics = [
    {
      title: "R² Score",
      value: performance.r2.toFixed(4),
      description: "Variance explained by the model",
    },
    {
      title: "MAE",
      value: `$${Math.round(performance.mae).toLocaleString()}`,
      description: "Mean Absolute Error",
    },
    {
      title: "RMSE",
      value: `$${Math.round(performance.rmse).toLocaleString()}`,
      description: "Root Mean Squared Error",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          Machine Learning
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {performance.model} Performance
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">
              {metric.title}
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              {metric.value}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelPerformance;