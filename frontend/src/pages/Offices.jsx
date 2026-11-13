
import { useEffect, useState } from "react";
import { getOffices } from "../services/officeAPI";
import OfficeCard from "../components/OfficeCard";

const TALUKS = [
  "All Taluks",
  "Mangaluru",
  "Bantwal",
  "Puttur",
  "Sullia",
  "Belthangady",
  "Kadaba",
  "Moodabidri",
];

function Offices() {
  const [offices, setOffices] = useState([]);
  const [taluk, setTaluk] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function fetchOffices() {
      try {
        setLoading(true);
        setError("");

        const data = await getOffices({ taluk, search });

        if (isActive) {
          setOffices(data || []);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err.message || "Unable to load government offices."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchOffices();

    return () => {
      isActive = false;
    };
  }, [taluk, search]);

  return (
    <main className="offices-page">
      <h1>Government Offices</h1>
      <p>
        Find government offices and public services in
        Dakshina Kannada district.
      </p>

      <div className="office-filters">
        <label htmlFor="taluk-filter">Filter by Taluk:</label>

        <select
          id="taluk-filter"
          value={taluk}
          onChange={(event) => setTaluk(event.target.value)}
        >
          {TALUKS.map((name) => (
            <option
              key={name}
              value={name === "All Taluks" ? "" : name}
            >
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="office-search">Search offices:</label>

        <input
          id="office-search"
          type="search"
          placeholder="Enter office name or service..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && <p>Loading government offices...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading && !error && offices.length === 0 && (
        <p>No government offices found.</p>
      )}

      {!loading && !error && offices.length > 0 && (
        <section className="office-list">
          {offices.map((office) => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Offices;
