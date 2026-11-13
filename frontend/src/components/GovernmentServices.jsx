import { useEffect, useState } from 'react';
import './GovernmentServices.css';
import { getServices, getServiceById } from '../services/api';

function GovernmentServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  async function fetchServices() {
    setLoading(true);
    setError('');

    try {
      const data = await getServices();

      const filteredData = data.filter(service =>
        (!search ||
          service.name.toLowerCase().includes(search.toLowerCase())) &&
        (!category || service.category === category)
      );

      setServices(filteredData);
    } catch (err) {
      setError('Unable to load services. Please check the backend connection.');
    } finally {
      setLoading(false);
    }
  }

  async function viewDetails(id) {
    try {
      const data = await getServiceById(id);
      setSelectedService(data);
    } catch (err) {
      setError('Unable to load service details.');
    }
  }

  const categories = [
    ...new Set(services.map(service => service.category))
  ];

  return (
    <div className="government-services">

      <header className="services-header">
        <h1>Government Services</h1>
        <p>Find government schemes and services in Dakshina Kannada.</p>
      </header>

      <div className="services-controls">
        <input
          type="text"
          placeholder="Search government services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading services...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && services.length === 0 && (
        <p>No government services found.</p>
      )}

      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <span>{service.category}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>

            <button onClick={() => viewDetails(service.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="service-details">

          <button onClick={() => setSelectedService(null)}>
            Close
          </button>

          <h2>{selectedService.name}</h2>

          <p><b>Category:</b> {selectedService.category}</p>
          <p><b>Description:</b> {selectedService.description}</p>
          <p><b>Eligibility:</b> {selectedService.eligibility}</p>
          <p><b>Application Mode:</b> {selectedService.application_mode}</p>
          <p><b>Department:</b> {selectedService.department}</p>

          <h3>Required Documents</h3>

          <ul>
            {selectedService.required_documents?.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>

          <h3>Application Steps</h3>

          <ol>
            {selectedService.application_steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {selectedService.official_url && (
            <p>
              <a
                href={selectedService.official_url}
                target="_blank"
                rel="noreferrer"
              >
                Official Website
              </a>
            </p>
          )}

          {selectedService.source_url && (
            <p>
              <a
                href={selectedService.source_url}
                target="_blank"
                rel="noreferrer"
              >
                Information Source
              </a>
            </p>
          )}

          <p>
            <b>Last Verified:</b> {selectedService.last_verified}
          </p>

        </div>
      )}

    </div>
  );
}

export default GovernmentServices;