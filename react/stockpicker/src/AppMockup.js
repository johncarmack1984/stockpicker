import React, { Component } from 'react';
import chart from './resources/img/chart-small.png';
import './App.css';
import './vendors/css/normalize.css';
import './vendors/css/grid.css';
import './vendors/css/ionicons.css';
import './resources/css/style.css';
import './resources/css/queries.css';
import './vendors/css/animate.css';
import './vendors/css/magnific-popup.css';

//import './vendors/js/clamp.js';
//import './resources/js/scripts.js';



class AppMockup extends Component {
  render() {
    return (
      <div className="App">

        <header class="splash row">
          <nav>
            <div class="row">
              <div class="col span-1-of-2 splash-text-box">
                <a href="/"><h1 class="splash-text">stockpicker.io</h1><span class="beta-box">BETA</span></a>
                <a class="mobile-nav-icon js--nav-icon"><i class="ion-navicon"></i></a>
              </div>
              <div class="nav-box col span-1-of-2">
                <ul class="main-nav js--main-nav">
                  <li><a class="popup-with-form" href="#about">about&nbsp;<i class="ion-information-circled"></i></a></li>
                  <li><a class="popup-with-form" href="#legal">legal&nbsp;<i class="ion-document-text"></i></a></li>
                  <li>
                      <a href="">log in / sign up&nbsp;<i class="ion-person"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <section class="app-screen row col span-3-of-3">

          <div class="sidebar col span-1-of-3">

            <div class="row">
                <input class="sidebar-search col span-2-of-3" type="text" placeholder="SYMBOL" />
                <button class="sidebar-button col span-1-of-3" type="button"><i class="ion-plus"></i></button>
            </div>

            <div class="stock-picks row">

              <div class="stock-pick row col">
                  <input type="checkbox" class="stock-check" checked />&nbsp;
                      <a class="js--stock-pick"><i class="ion-arrow-down-b stock-arrow js--stock-arrow">&nbsp;</i>
                          <span class="stock-symbol">TSLA</span><span class="stock-name"> : Tesla, Inc.</span></a>
                      <i class="ion-trash-a delete-button"></i>
                  <a class="js--ideal-weight"><span class="ideal-weight js--ideal-weight">18&#37;</span></a>
                      <span class="stock-pick-price js--stock-pick-price">1&nbsp;<i class="ion-ios-close-empty"></i>&nbsp;$362.37</span>
                      <span class="num-shares"></span>
                  <div class="stock-detail js--stock-detail">
                      <div class="small-chart row">
                        <center><img src={ chart } alt=" "/></center>
                      </div>
                      <div class="row">
                          <ul class="stock-fine-print">
                              <li>Open: 386.69</li>
                              <li>High: 386.95</li>
                              <li>Low: 373.10</li>
                              <li>Mkt cap: 62.14B</li>
                              <li>P/E ratio: -</li>
                              <li>Div yield: -</li>
                          </ul>
                      </div>
                  </div>
              </div>

            </div>
          </div>

        </section>

        <footer class="row">
            <div class="row">
              <div class="col span-1-of-2">
                <ul class="footer-nav">
                    <li><a class="popup-with-form" href="#about">About us</a></li>
                    <li><a class="popup-with-form" href="#legal">Legal</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Press</a></li>
                </ul>
              </div>
              <div class="col span-1-of-2">
                <ul class="social-links">
                  <li><a href=""><i class="ion-social-facebook"></i></a></li>
                  <li><a href=""><i class="ion-social-twitter"></i></a></li>
                  <li><a href=""><i class="ion-social-googleplus"></i></a></li>
                  <li><a href=""><i class="ion-social-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <p>
              Copyright &copy; 2017 by Stockpicker.io. All rights reserved.
            </p>
        </footer>

      </div>
    );
  }
}

export default AppMockup;
