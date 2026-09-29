import { useEffect, useState } from "react";
import { getMarketSummary } from "../services/api";


function MarketStats({ locality }) {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const loadStats = async () => {

      setLoading(true);
      setError("");

      try {

        const data =
          await getMarketSummary(locality);

        setStats(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load market statistics."
        );

      } finally {

        setLoading(false);

      }
    };


    loadStats();

  }, [locality]);


  if (loading) {

    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <p className="text-slate-400">
          Loading market statistics...
        </p>

      </div>
    );

  }


  if (error) {

    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-5">

        <p className="text-red-400">
          {error}
        </p>

      </div>
    );

  }


  const cards = [

    {
      title: "Properties",
      value:
        stats.total_properties.toLocaleString(),
      description:
        locality
          ? `Properties in ${locality}`
          : "All properties",
    },

    {
      title: "Average Price",
      value:
        ` Rs.${Math.round(
          stats.average_price
        ).toLocaleString()}`,
      description:
        "Average property price",
    },

    {
      title: "Average SQFT",
      value:
        Math.round(
          stats.average_sqft
        ).toLocaleString(),
      description:
        "Average property size",
    },

    {
      title: "Average Bedrooms",
      value:
        stats.average_beds.toFixed(1),
      description:
        "Average number of bedrooms",
    },

  ];


  return (

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/40"
        >

          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {card.value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {card.description}
          </p>

        </div>

      ))}

    </div>

  );
}


export default MarketStats;