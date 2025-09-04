import { useState, useEffect, useRef, useMemo } from 'react';
import Typed from 'typed.js';
import Navbar from './components/Navbar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import { techStack, projects } from './data';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTypedText, setCurrentTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  const typedStrings = useMemo(() => ["DEVELOPER", "PROBLEM SOLVER", "THINKER", "EXPLORER"], []);

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
  }, [currentTypedText, currentIndex, isDeleting, typedStrings]);

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
  }, [typedStrings]);

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

  

  return (
    <div>
      <Navbar onNavClick={handleNavClick} onToggleMenu={toggleMenu} />
      <Home typedRef={typedRef} onResumeDownload={handleResumeDownload} />
      <About techStack={techStack} />
      <Services />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;