function About() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          About the Project
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
          Real Estate AI
        </h1>

        <p className="mt-6 max-w-3xl leading-relaxed text-slate-400">
          Real Estate AI is a machine learning-based system designed
          to analyze property information and predict house prices.
          The system uses an XGBoost regression model together with
          a React frontend and FastAPI backend.
        </p>

        <p className="mt-5 max-w-3xl leading-relaxed text-slate-400">
          Users can provide property details such as bedrooms, bathrooms,
          property size, property type, state, and locality to receive
          an estimated property price. The system also provides
          interactive market analysis to explore property prices,
          property types, sizes, and localities.
        </p>

        {/* Project Features */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">
              Machine Learning
            </h2>

            <p className="mt-3 leading-relaxed text-slate-400">
              An XGBoost regression model is used to predict property
              prices based on important property characteristics.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">
              Market Analysis
            </h2>

            <p className="mt-3 leading-relaxed text-slate-400">
              Interactive visualizations allow users to explore price
              trends, property types, property sizes, and locality-level
              statistics.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">
              Full-Stack System
            </h2>

            <p className="mt-3 leading-relaxed text-slate-400">
              The application combines a React frontend, FastAPI backend,
              and a trained machine learning pipeline into one system.
            </p>
          </div>

        </div>

        {/* Technologies */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-bold text-white">
            Technologies Used
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {[
              "Python",
              "Pandas",
              "Scikit-learn",
              "XGBoost",
              "FastAPI",
              "React",
              "Tailwind CSS",
              "REST API",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
              >
                {technology}
              </span>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default About;
