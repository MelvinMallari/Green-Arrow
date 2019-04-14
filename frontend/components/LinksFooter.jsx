import React from 'react'

const LinksFooter = () => {
  return (
    <footer className="splash-footer">
      <div className="personal-links-container">
        <div className="personal-links">
          <a href="https://github.com/MelvinMallari/Green-Arrow">
            <i className="fab fa-github-square fa-3x fa-icon"></i>
          </a>
          <a href="https://www.linkedin.com/in/melvinmallari/">
            <i className="fab fa-linkedin fa-3x fa-icon"></i>
          </a>
          <a href="https://melvinmallari.com/">
            <i className="fas fa-address-card fa-3x fa-icon"></i>
          </a>  
        </div>
      </div>
    </footer>
  );
}

export default LinksFooter;