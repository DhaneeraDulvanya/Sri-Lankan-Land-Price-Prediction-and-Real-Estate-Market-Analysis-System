function About() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          About the Project
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          Real Estate AI
        </h1>

        <p className="mt-6 leading-relaxed text-slate-400">
          Real Estate AI is a machine learning-based system designed
          to analyze property information and predict house prices.
          The system uses an XGBoost regression model together with
          a React frontend and FastAPI backend.
        </p>

      </div>
    </div>
  );
}

export default About;