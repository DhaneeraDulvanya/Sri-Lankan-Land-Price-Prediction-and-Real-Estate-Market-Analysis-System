import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          RealEstate
          <span className="text-cyan-400">AI</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            to="/prediction"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            Prediction
          </Link>

          <Link
            to="/market-analysis"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            Market Analysis
          </Link>

          <Link
            to="/model-insights"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            Model Insights
          </Link>

          <Link
            to="/about"
            className="text-sm text-slate-300 transition hover:text-cyan-400"
          >
            About
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;