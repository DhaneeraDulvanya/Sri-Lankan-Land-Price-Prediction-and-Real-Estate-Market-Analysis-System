function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="mb-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">
            AI-Powered Real Estate Analytics
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Understand the market.
            <br />
            <span className="text-cyan-400">
              Predict property prices.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Analyze property information and use machine learning to
            estimate house prices with our XGBoost prediction model.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Prediction Model
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              XGBoost
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Test R² Score
            </p>

            <h2 className="mt-2 text-2xl font-bold text-cyan-400">
              0.8691
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              ML Features
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              6
            </h2>
          </div>

        </div>

        {/* Main Actions */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold text-white">
              Predict a Property Price
            </h2>

            <p className="mt-3 text-slate-400">
              Enter property details and let the XGBoost model
              estimate the property's price.
            </p>

            <a
              href="/prediction"
              className="mt-6 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start Prediction →
            </a>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-2xl font-bold text-white">
              Explore Market Analysis
            </h2>

            <p className="mt-3 text-slate-400">
              Explore property trends, prices and market statistics
              through interactive visualizations.
            </p>

            <a
              href="/market-analysis"
              className="mt-6 inline-block rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              View Analysis →
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;