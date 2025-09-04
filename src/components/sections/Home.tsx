import React from 'react';

type HomeProps = {
  typedRef: React.RefObject<HTMLSpanElement | null>;
  onResumeDownload: (e: React.MouseEvent) => void;
};

const Home: React.FC<HomeProps> = ({ typedRef, onResumeDownload }) => {
  return (
    <section id="home" className="section hero">
      <div className="typed-bg">
        <span id="typed-developer" ref={typedRef}></span>
      </div>
      <h1>Hi, I am Gurdeep</h1>
      <h2>Full-Stack Developer</h2>
      <p>I am a Full-Stack Developer. I am currently working at Gemini Solutions Ltd.</p>
      <a href="#" className="btn" onClick={onResumeDownload}>Resume</a>
    </section>
  );
};

export default Home;


