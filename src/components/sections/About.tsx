import React from 'react';

type Tech = { name: string; icon: string };

type AboutProps = {
  techStack: Tech[];
};

const About: React.FC<AboutProps> = ({ techStack }) => {
  return (
    <section id="about" className="section about">
      <h2 className="fade-in" style={{ textAlign: 'center' }}>About Me</h2>
      <p className="fade-in">Hello! I'm Gurdeep Singh and I'm a Full Stack Developer with proven expertise in building both Windows and Web applications across diverse domains, including Finance, Healthcare, and Telecom. With a strong command of both front-end and back-end development, I specialize in designing and delivering high-quality, reliable, and scalable solutions that align with modern business needs.</p>
      <h3 className="fade-in" style={{ textAlign: 'center' }}>Technologies & Tools</h3>
      <div className="tech-grid">
        {techStack.map((tech) => (
          <div key={tech.name} className="tech-item">
            <img src={tech.icon} alt={`${tech.name} Logo`} />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;


