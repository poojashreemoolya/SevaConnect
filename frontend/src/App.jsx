
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

const services = [
  { name: 'Income Certificate', category: 'Certificates', description: 'Find guidance about income certificate services.' },
  { name: 'Caste Certificate', category: 'Certificates', description: 'Learn where to find information about caste certificates.' },
  { name: 'Scholarship Schemes', category: 'Scholarships', description: 'Explore information about educational assistance.' },
  { name: 'Pension Schemes', category: 'Pensions', description: 'Discover information about pension benefits.' },
  { name: 'Ration Card Services', category: 'Ration Card', description: 'Find guidance about ration card-related services.' },
  { name: 'Land Records', category: 'Land Records', description: 'Learn where to access land record information.' },
  { name: 'Farmer Welfare Schemes', category: 'Farmer Welfare', description: 'Explore information about farmer support schemes.' },
]

const taluks = [
  'Mangaluru',
  'Bantwal',
  'Puttur',
  'Sullia',
  'Belthangady',
  'Kadaba',
  'Moodabidri',
]

const steps = [
  { number: '01', title: 'Find a Service', description: 'Search for the government service you need.' },
  { number: '02', title: 'Check Requirements', description: 'Understand eligibility and required documents.' },
  { number: '03', title: 'Follow the Guidance', description: 'Read the available application instructions.' },
  { number: '04', title: 'Visit Official Sources', description: 'Continue through the relevant official portal or office.' },
]

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedTaluk, setSelectedTaluk] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const filteredServices = services.filter((service) => {
    const matchesSearch = `${service.name} ${service.category} ${service.description}`
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || service.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const navLinks = [
    ['Home', 'home'],
    ['Government Services', 'services'],
    ['Local Offices', 'offices'],
    ['Announcements', 'announcements'],
    ['About Us', 'about'],
    ['Contact', 'contact'],
  ]

  function handleFeedbackSubmit(event) {
    event.preventDefault()
    setFeedbackSubmitted(true)
    event.target.reset()
  }

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">S</span>
          <span>SevaConnect</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HOME / HERO */}
        <section className="hero-section" id="home">
          <p className="hero-tag">YOUR GUIDE TO GOVERNMENT SERVICES</p>

          <h1>
            Government Services,
            <br />
            <span>Made Simpler.</span>
          </h1>

          <p className="hero-description">
            Find government schemes, understand application procedures and
            discover local public offices across Dakshina Kannada – all in one place.
          </p>

          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search income certificate, pension, scholarship..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Search government services"
            />
          </div>

          <div className="hero-buttons">
            <a className="primary-button" href="#services">Explore Services →</a>
            <a className="secondary-button" href="#offices">Browse Local Offices</a>
          </div>

          <div className="hero-note">
            <span>📍</span> Focused on Dakshina Kannada, Karnataka
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="services-section" id="services">
          <div className="section-heading">
            <p className="section-tag">EXPLORE AND DISCOVER</p>
            <h2>Government Services</h2>
            <p>Find guidance for the services that matter to you.</p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                className={`category-card ${activeCategory === category.name ? 'selected-card' : ''}`}
                key={category.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.name ? 'All' : category.name
                  )
                }
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Explore information →</span>
              </button>
            ))}
          </div>

          {/* POPULAR SERVICES */}
          <div className="popular-services">
            <div className="section-heading">
              <p className="section-tag">SERVICE DIRECTORY</p>
              <h2>Popular Government Services</h2>
              <p>Search and explore available service information.</p>
            </div>

            <div className="filter-row">
              <button
                className={activeCategory === 'All' ? 'filter-active' : 'filter-button'}
                onClick={() => setActiveCategory('All')}
              >
                All Services
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={activeCategory === category.name ? 'filter-active' : 'filter-button'}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="service-grid">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <article className="service-card" key={service.name}>
                    <span className="service-category">{service.category}</span>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <button
                      className="text-button"
                      onClick={() => setSelectedService(
                        selectedService?.name === service.name ? null : service
                      )}
                    >
                      {selectedService?.name === service.name ? 'Close Details ↑' : 'View Details →'}
                    </button>
                  </article>
                ))
              ) : (
                <p className="no-results">
                  No matching services found. Try another keyword or category.
                </p>
              )}
            </div>

            {selectedService && (
              <div className="service-details">
                <h3>{selectedService.name}</h3>
                <p>{selectedService.description}</p>
                <p><strong>Category:</strong> {selectedService.category}</p>
                <p><strong>Eligibility:</strong> Information not available.</p>
                <p><strong>Required documents:</strong> Information not available.</p>
                <p><strong>Application procedure:</strong> Information not available.</p>
                <p><strong>Responsible department:</strong> Information not available.</p>
                <p><strong>Official application link:</strong> Not yet verified.</p>
                <p className="demo-note">
                  This is a sample service listing. Details must be verified
                  against official government sources before publication.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <p className="section-tag">SIMPLE AND CONVENIENT</p>
            <h2>How SevaConnect Works</h2>
            <p>Four simple steps to find the information you need.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* LOCAL OFFICES */}
        <section className="offices-section" id="offices">
          <div className="section-heading">
            <p className="section-tag">CONNECT WITH LOCAL ADMINISTRATION</p>
            <h2>Local Government Offices</h2>
            <p>Explore the seven taluks of Dakshina Kannada district.</p>
          </div>

          <div className="office-filter">
            <label htmlFor="taluk-filter">Choose a Taluk:</label>
            <select
              id="taluk-filter"
              value={selectedTaluk}
              onChange={(event) => setSelectedTaluk(event.target.value)}
            >
              <option value="All">All Taluks</option>
              {taluks.map((taluk) => (
                <option value={taluk} key={taluk}>{taluk}</option>
              ))}
            </select>
          </div>

          <div className="office-grid">
            {taluks
              .filter((taluk) => selectedTaluk === 'All' || selectedTaluk === taluk)
              .map((taluk) => (
                <article className="office-card" key={taluk}>
                  <div className="office-icon">🏢</div>
                  <h3>{taluk} Taluk</h3>
                  <p>Government office directory</p>
                  <p className="office-unavailable">
                    Office addresses, contact numbers and service details
                    are being verified.
                  </p>
                </article>
              ))}
          </div>
        </section>

        {/* ANNOUNCEMENTS */}
        <section className="announcements-section" id="announcements">
          <div className="section-heading">
            <p className="section-tag">STAY INFORMED</p>
            <h2>Latest Announcements</h2>
            <p>Updates and public notices from official sources.</p>
          </div>

          <div className="announcement-empty">
            <span>📢</span>
            <h3>No verified announcements available yet</h3>
            <p>
              Official announcements will be displayed here after their
              source and publication details have been verified.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-section">
          <div className="section-heading">
            <p className="section-tag">WHY SEVACONNECT?</p>
            <h2>Information That Brings People Closer to Services</h2>
          </div>

          <div className="why-grid">
            <article><span>🔎</span><h3>Easy Access</h3><p>Find useful public-service information in one place.</p></article>
            <article><span>📍</span><h3>District Focused</h3><p>Information organised around Dakshina Kannada.</p></article>
            <article><span>📘</span><h3>Clear Guidance</h3><p>Understand where to find service procedures and requirements.</p></article>
            <article><span>🔗</span><h3>Official Sources</h3><p>Guidance to verified government resources when available.</p></article>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <p className="section-tag">ABOUT OUR PROJECT</p>
          <h2>Government Information, Made Simpler.</h2>
          <p>
            SevaConnect is a public-service information portal designed to
            help citizens of Dakshina Kannada discover government schemes,
            understand public services and find relevant local offices.
          </p>
          <p>
            The project aims to make public information easier to discover
            through a simple, accessible and district-focused website.
          </p>
          <div className="disclaimer">
            <strong>Important Disclaimer:</strong> SevaConnect is an independent
            information and guidance portal, not an official government website.
            It does not accept applications, issue certificates, approve benefits,
            process payments or replace official government portals. Always
            confirm information with the relevant government department.
          </div>
        </section>

        {/* CONTACT / FEEDBACK */}
        <section className="contact-section" id="contact">
          <div className="section-heading">
            <p className="section-tag">GET IN TOUCH</p>
            <h2>Contact & Feedback</h2>
            <p>Share your suggestions to help improve SevaConnect.</p>
          </div>

          <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
            <label htmlFor="feedback-name">Name</label>
            <input id="feedback-name" name="name" type="text" placeholder="Enter your name" required />

            <label htmlFor="feedback-email">Email</label>
            <input id="feedback-email" name="email" type="email" placeholder="Enter your email" required />

            <label htmlFor="feedback-subject">Subject</label>
            <input id="feedback-subject" name="subject" type="text" placeholder="Enter subject" required />

            <label htmlFor="feedback-message">Message</label>
            <textarea id="feedback-message" name="message" rows="5" placeholder="Write your message..." required />

            <button className="primary-button" type="submit">Submit Feedback</button>

            {feedbackSubmitted && (
              <p className="success-message">
                Thank you! This is a demo form. Your feedback has not been
                sent or stored.
              </p>
            )}

            <p className="demo-note">
              Demo only: this form does not currently send or store messages.
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-icon">S</span>
              <span>SevaConnect</span>
            </a>
            <p>Bringing Government Services Closer to Every Citizen.</p>
            <p>Public-service information for Dakshina Kannada.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            {navLinks.map(([label, id]) => (
              <a href={`#${id}`} key={id}>{label}</a>
            ))}
          </div>

          <div>
            <h3>Service Categories</h3>
            {categories.map((category) => (
              <a href="#services" key={category.name}>{category.name}</a>
            ))}
          </div>
        </div>

        <p className="footer-disclaimer">
          Independent information portal. Not an official government website.
        </p>
        <p>© 2026 SevaConnect. Bringing services closer to citizens.</p>
      </footer>
    </div>
  )
}

export default App
