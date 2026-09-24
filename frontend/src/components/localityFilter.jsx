import { useEffect, useState } from "react";
import { getLocalityList } from "../services/api";

function LocalityFilter({ selectedLocality, onLocalityChange }) {

  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadLocalities = async () => {

      try {

        const data = await getLocalityList();

        setLocalities(data);

      } catch (error) {

        console.error(
          "Failed to load localities:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadLocalities();

  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <label
        htmlFor="locality"
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        Select Locality
      </label>

      <select
        id="locality"
        value={selectedLocality}
        onChange={(event) =>
          onLocalityChange(event.target.value)
        }
        disabled={loading}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
      >

        <option value="">
          All Localities
        </option>

        {localities.map((locality) => (

          <option
            key={locality}
            value={locality}
          >
            {locality}
          </option>

        ))}

      </select>

    </div>
  );
}

export default LocalityFilter;