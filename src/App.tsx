import { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTypedText, setCurrentTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  const typedStrings = ["DEVELOPER", "PROBLEM SOLVER", "THINKER", "EXPLORER"];

  // Manual Typed.js effect (backup)
  useEffect(() => {
    const typeSpeed = 50;
    const backSpeed = 30;
    const backDelay = 2000;
    
    const type = () => {
      const current = typedStrings[currentIndex];
      
      if (!isDeleting) {
        if (currentTypedText.length < current.length) {
          setCurrentTypedText(current.substring(0, currentTypedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), backDelay);
          return;
        }
      } else {
        if (currentTypedText.length > 0) {
          setCurrentTypedText(current.substring(0, currentTypedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % typedStrings.length);
          return;
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? backSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [currentTypedText, currentIndex, isDeleting]);

  // Initialize Typed.js
  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["DEVELOPER", "PROBLEM SOLVER", "THINKER", "EXPLORER"],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: false,
        cursorChar: "_",
        smartBackspace: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .tech-item, .social-links a');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.querySelector('.navbar') as HTMLElement;

      if (navbar) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for hero section
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero') as HTMLElement;
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleResumeDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/assets/Files/Gurdeep_Resume.docx';
    link.download = 'Gurdeep_Singh_Resume.docx';
    link.click();
  };

  // Hamburger menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }
  };

  const techStack = [
    { name: 'HTML', icon: '/assets/icons8-html-5-48.png' },
    { name: 'CSS', icon: '/assets/icons8-css3-100.png' },
    { name: 'JavaScript', icon: '/assets/icons8-javascript-48.png' },
    { name: 'Bootstrap', icon: '/assets/icons8-bootstrap-48.png' },
    { name: 'TypeScript', icon: '/assets/icons8-typescript-48.png' },
    { name: '.NET', icon: '/assets/dotnet.png' },
    { name: 'Angular', icon: '/assets/icons8-angular-48.png' },
    { name: 'Azure', icon: '/assets/icons8-azure-48.png' },
    { name: 'Cloud Development', icon: '/assets/icons8-cloud-development-48.png' },
    { name: 'Git', icon: '/assets/icons8-git-48.png' },
    { name: 'MongoDB', icon: '/assets/icons8-mongodb-48.png' },
    { name: 'Oracle', icon: '/assets/icons8-oracle-logo-48.png' },
    { name: 'Postman', icon: '/assets/icons8-postman-inc-48.png' },
    { name: 'React', icon: '/assets/icons8-react-48.png' },
    { name: 'SaaS', icon: '/assets/icons8-saas-60.png' },
  ];

  const projects = [
    {
      title: 'Pricing Portal',
      description: "It's a web application on Angular for managing, pricing, taking business decisions on setting prices for various types of securities in an Asset Management Company."
    },
    {
      title: 'Batch Reports',
      description: "It's a WPF application used to generate various types of reports of different securities in an Asset Management Company"
    },
    {
      title: 'Xenon Enterprises',
      description: "It's a website that showcases various products and services proved by the provider."
    }
  ];

  return (
    <div>
      {/* Navigation */}
      <header>
        <nav className="navbar">
          <div className="nav-container">
            {/* Hamburger menu */}
            <div 
              className="hamburger" 
              id="hamburger"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <ul className="nav-menu" id="nav-menu">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item} className="nav-item">
                  <a 
                    className="btn-nav"
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="section hero">
        <div className="typed-bg">
          <span id="typed-developer" ref={typedRef}></span>
        </div>
        <h1>Hi, I am Gurdeep</h1>
        <h2>Full-Stack Developer</h2>
        <p>I am a Full-Stack Developer. I am currently working at Gemini Solutions Ltd.</p>
        <a href="#" className="btn" onClick={handleResumeDownload}>Resume</a>
      </section>
      
      {/* About Section */}
      <section id="about" className="section about">
        <h2 className="fade-in" style={{textAlign: 'center'}}>About Me</h2>
        <p className="fade-in">Hello! I'm Gurdeep Singh and I'm a Full Stack Developer with proven expertise in building both Windows and Web applications across diverse domains, including Finance, Healthcare, and Telecom. With a strong command of both front-end and back-end development, I specialize in designing and delivering high-quality, reliable, and scalable solutions that align with modern business needs.</p>
        <h3 className="fade-in" style={{textAlign: 'center'}}>Technologies & Tools</h3>
        <div className="tech-grid">      
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-item">
              <img src={tech.icon} alt={`${tech.name} Logo`} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services">
        <h2 className="fade-in" style={{textAlign: 'center'}}>What I Provide</h2>
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

      {/* Projects Section */}
      <section id="projects" className="section projects">
        <h2 className="fade-in" style={{textAlign: 'center'}}>What I Built</h2>
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
              <h3 style={{marginTop: 0}}>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2 className="fade-in" style={{textAlign: 'center'}}>Connect with me</h2>
        <form className="fade-in" action="mailto:gd8991@gmail.com" method="post" encType="text/plain">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="Name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="Email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="Message" required></textarea>
          </div>
          <button type="submit" className="btn">Send me email directly</button>
        </form>
        <div className="fade-in">
          <p>Email: gd8991@gmail.com</p>
          <p>Mobile: +91-9742843406</p>
          <p>Address: Chandigarh, India</p>
        </div>
        <div className="social-links">
          <a href="https://linkedin.com/in/gurdeep-singh-a6502a91" style={{color: 'white', textDecoration: 'none', fontSize: '1px'}}>
            <img src="/assets/icons8-linkedin-48.png" alt="LinkedIn" style={{verticalAlign: 'middle', marginRight: '5px'}} />
          </a>
          <a href="https://github.com/gd8991" style={{color: 'white', textDecoration: 'none', fontSize: '1px'}}>
            <img src="/assets/icons8-github-48.png" alt="GitHub" style={{verticalAlign: 'middle', marginRight: '5px'}} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="fade-in">
        <p>Made with ❤ by Gurdeep Singh</p>
      </footer>
    </div>
  );
};

export default Portfolio;