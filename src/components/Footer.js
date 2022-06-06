import React from "react";

const Footer = () => {
  const today = new Date();

  return (
      <footer className="footer">
      <p className="footer__item">front-end developper avondonderwijs</p>
      <p className="footer__time"> Copyright &copy; {today.getFullYear()}</p>
      <p className="footer__name">Kim Scheerens</p>
      <a href="/contact" className="main-nav__item">
         <span>✉️</span> Contact
      </a>
      </footer>
  );
};

export default Footer;