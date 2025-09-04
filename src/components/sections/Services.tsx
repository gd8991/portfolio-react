import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="section services">
      <h2 className="fade-in" style={{ textAlign: 'center' }}>What I Provide</h2>
      <div className="service-grid">
        <div className="service-item fade-in-left">
          <h3>Web Application Development</h3>
          <p>Web design, UI/UX standard code architecture</p>
        </div>

        <div className="service-item fade-in-right">
          <h3>Backend Development</h3>
          <p>API design, databases, server logic—focusing on interactive, realtime and efficient backend systems.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;


