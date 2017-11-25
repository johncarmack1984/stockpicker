import React from 'react';

const Footer = (props) => {
  return (
    <footer className="row">
        <div className="row">
          <div className="col span-1-of-2">
            <ul className="footer-nav">
                <li><a className="popup-with-form" href="#about">About us</a></li>
                <li><a className="popup-with-form" href="#legal">Legal</a></li>
                <li><a href="">Blog</a></li>
                <li><a href="">Press</a></li>
            </ul>
          </div>
          <div className="col span-1-of-2">
            <ul className="social-links">
              <li><a href=""><i className="ion-social-facebook"></i></a></li>
              <li><a href=""><i className="ion-social-twitter"></i></a></li>
              <li><a href=""><i className="ion-social-googleplus"></i></a></li>
              <li><a href=""><i className="ion-social-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <p>
          Copyright &copy; 2017 by Stockpicker.io. All rights reserved.
        </p>
    </footer>
  );
};

export default Footer;
