import ModelPerformance from "../components/modelPerformance";
import FeatureImportance from "../components/featureImportance";

function ModelInsights() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Machine Learning
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            Model Insights
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore the performance and important characteristics
            of the machine learning model used for property price
            prediction.
          </p>
        </div>

        <ModelPerformance />

        <div className="mt-8">
          <FeatureImportance />
        </div>

      </div>
    </div>
  );
}

export default ModelInsights;