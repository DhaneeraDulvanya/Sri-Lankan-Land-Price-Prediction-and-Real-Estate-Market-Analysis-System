import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/navbar";

import Dashboard from "./pages/dashboard";
import Prediction from "./pages/prediction";
import MarketAnalysis from "./pages/marketAnalysis";
import ModelInsights from "./pages/modelInsights";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/prediction"
          element={<Prediction />}
        />

        <Route
          path="/market-analysis"
          element={<MarketAnalysis />}
        />

        <Route
          path="/model-insights"
          element={<ModelInsights />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-lg font-bold text-white">
              RealEstate<span className="text-cyan-400">AI</span>
            </Link>
            <p className="mt-1 text-sm text-slate-400">
              Real estate price prediction and market analysis.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} RealEstateAI
          </p>
        </div>
      </footer>

    </BrowserRouter>
  );
}

export default App;