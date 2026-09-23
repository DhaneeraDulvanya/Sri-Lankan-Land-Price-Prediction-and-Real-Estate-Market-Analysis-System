import { BrowserRouter, Routes, Route } from "react-router-dom";

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

    </BrowserRouter>
  );
}

export default App;