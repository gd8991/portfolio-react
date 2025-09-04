import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section contact">
      <h2 className="fade-in" style={{ textAlign: 'center' }}>Connect with me</h2>
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
        <a href="https://linkedin.com/in/gurdeep-singh-a6502a91" style={{ color: 'white', textDecoration: 'none', fontSize: '1px' }}>
          <img src="/assets/icons8-linkedin-48.png" alt="LinkedIn" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        </a>
        <a href="https://github.com/gd8991" style={{ color: 'white', textDecoration: 'none', fontSize: '1px' }}>
          <img src="/assets/icons8-github-48.png" alt="GitHub" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        </a>
      </div>
    </section>
  );
};

export default Contact;


