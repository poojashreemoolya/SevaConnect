
import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/announcementAPI";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function fetchAnnouncements() {
      try {
        setLoading(true);
        setError("");

        const data = await getAnnouncements();

        if (isActive) {
          setAnnouncements(data || []);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err.message || "Unable to load announcements."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchAnnouncements();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="announcements-page">
      <h1>Government Announcements</h1>
      <p>
        View verified government announcements and important deadlines
        in Dakshina Kannada.
      </p>

      {loading && <p>Loading announcements...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading && !error && announcements.length === 0 && (
        <p>No announcements are currently available.</p>
      )}

      {!loading && !error && announcements.length > 0 && (
        <section className="announcement-list">
          {announcements.map((announcement) => (
            <article
              className="announcement-card"
              key={announcement.id}
            >
              <h2>{announcement.title}</h2>

              <p>{announcement.description}</p>

              <p>
                <strong>Published:</strong>{" "}
                {announcement.published_date || "Not available"}
              </p>

              <p>
                <strong>Deadline:</strong>{" "}
                {announcement.deadline || "No deadline specified"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {announcement.status}
              </p>

              {announcement.official_url && (
                <p>
                  <a
                    href={announcement.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official Website
                  </a>
                </p>
              )}

              {announcement.source_url && (
                <p>
                  <a
                    href={announcement.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source
                  </a>
                </p>
              )}

              <small>
                Last verified:{" "}
                {announcement.last_verified || "Not available"}
              </small>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Announcements;
