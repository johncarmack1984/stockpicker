import React from 'react';

const Footer = (props) => {
  return (
    <footer>
      <ul className="footer-nav">
          <li><a href="">About us</a></li>
          <li><a href="">Legal</a></li>
          <li><a href="">Blog</a></li>
          <li><a href="">Press</a></li>
      </ul>
      <ul className="social-links">
        <li><a href=""><i className="ion-social-facebook"></i></a></li>
        <li><a href=""><i className="ion-social-twitter"></i></a></li>
        <li><a href=""><i className="ion-social-googleplus"></i></a></li>
        <li><a href=""><i className="ion-social-instagram"></i></a></li>
      </ul>
      <p>Copyright &copy; 2017 by Stockpicker.io<br />
      All rights reserved</p>
    </footer>
  );
};

export default Footer;

/*


 */
