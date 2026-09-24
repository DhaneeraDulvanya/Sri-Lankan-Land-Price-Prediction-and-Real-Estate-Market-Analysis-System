import MarketStats from "../components/statcard";
import PriceChart from "../components/priceChart";
import PropertyTypeChart from "../components/propertyTypeChart";
import LocalityAnalysisChart from "../components/localityAnalysisChart";
import LocalityFilter from "../components/localityFilter";

import { useState } from "react";

function MarketAnalysis() {

  const [selectedLocality, setSelectedLocality] =
    useState("");


  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Real Estate Analytics
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            Market Analysis
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore property prices, property sizes,
            property types and localities using
            interactive market analytics.
          </p>

        </div>


        {/* Locality Filter */}

        <div className="mb-8 max-w-md">

          <LocalityFilter
            selectedLocality={selectedLocality}
            onLocalityChange={setSelectedLocality}
          />

        </div>


        {/* KPI Cards */}

        <MarketStats
          locality={selectedLocality}
        />


        {/* Charts */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <PriceChart
            locality={selectedLocality}
          />

          <PropertyTypeChart
            locality={selectedLocality}
          />

          <LocalityAnalysisChart />

        </div>

      </div>

    </div>
  );
}


export default MarketAnalysis;