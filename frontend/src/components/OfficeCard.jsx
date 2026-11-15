import "../pages/LocalInfo.css";

function OfficeCard({ office }) {
  return (
    <article className="office-card">
      <h3>{office.office_name}</h3>

      <p>
        <strong>Taluk:</strong> {office.taluk}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {office.address || "Address not available"}
      </p>

      <p>
        <strong>Contact:</strong>{" "}
        {office.contact_number || "Contact not available"}
      </p>

      <div>
        <strong>Services handled:</strong>
        {office.services_handled?.length > 0 ? (
          <ul>
            {office.services_handled.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        ) : (
          <p>Services information not available</p>
        )}
      </div>

      {office.official_url && (
        <p>
          <a
            href={office.official_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website
          </a>
        </p>
      )}

      {office.source_url && (
        <p>
          <a
            href={office.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
      )}

      <small>Last verified: {office.last_verified || "Not available"}</small>
    </article>
  );
}

export default OfficeCard;
