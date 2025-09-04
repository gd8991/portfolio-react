import React from 'react';

type Project = { title: string; description: string };

type ProjectsProps = {
  projects: Project[];
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="section projects">
      <h2 className="fade-in" style={{ textAlign: 'center' }}>What I Built</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`project-card ${
              index === 0 ? 'fade-in-left' :
              index === 2 ? 'fade-in-right' :
              'fade-in'
            }`}
          >
            <h3 style={{ marginTop: 0 }}>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


