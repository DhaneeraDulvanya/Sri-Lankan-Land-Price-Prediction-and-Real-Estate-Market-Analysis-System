import PredictionForm from "../components/predictionForm";

function Prediction() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Machine Learning
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            House Price Prediction
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Enter the property details below and our XGBoost
            machine learning model will estimate the property price.
          </p>

        </div>

        {/* Prediction Form */}
        <PredictionForm />

      </div>

    </div>
  );
}

export default Prediction;