
import { useState } from 'react'
import './App.css'

const categories = [
  { icon: '📄', name: 'Certificates', description: 'Birth, income, caste and other certificates' },
  { icon: '🎓', name: 'Scholarships', description: 'Explore education support and scholarships' },
  { icon: '👵', name: 'Pensions', description: 'Learn about pension schemes and benefits' },
  { icon: '🍚', name: 'Ration Card', description: 'Understand ration card services' },
  { icon: '🏡', name: 'Land Records', description: 'Find information about land records' },
  { icon: '🌾', name: 'Farmer Welfare', description: 'Discover schemes supporting farmers' },
]

function App() {
  const [search, setSearch] = useState('')

  const filteredCategories = categories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">S</span>
          <span>SevaConnect</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <p className="hero-tag">YOUR GUIDE TO GOVERNMENT SERVICES</p>

          <h1>
            Bringing Government Services
            <br />
            <span>Closer to Every Citizen.</span>
          </h1>

          <p className="hero-description">
            Find government schemes, understand public services, and discover
            the information you need—all in one place.
          </p>

          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search for a service..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search government services"
            />
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <p className="section-tag">EXPLORE AND DISCOVER</p>
            <h2>Government Services</h2>
            <p>Find guidance for the services that matter to you.</p>
          </div>

          <div className="category-grid">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <article className="category-card" key={category.name}>
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <a href="#about">Explore information →</a>
                </article>
              ))
            ) : (
              <p className="no-results">
                No matching categories found. Try another search.
              </p>
            )}
          </div>
        </section>

        <section className="about-section" id="about">
          <h2>Government information, made simpler.</h2>
          <p>
            SevaConnect helps citizens discover public services and understand
            where to find official information.
          </p>
          <p className="disclaimer">
            <strong>Important:</strong> SevaConnect is an information and
            guidance platform. It does not accept applications, issue
            certificates, process payments, or replace official government
            portals. Always verify details with the relevant government
            department.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 SevaConnect. Bringing services closer to citizens.</p>
      </footer>
    </div>
  )
}

export default App
