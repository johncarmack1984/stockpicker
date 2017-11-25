import React, { Component } from 'react';
import Modal from 'react-modal';
import SmoothCollapse from 'react-smooth-collapse';

// CSS for modals until I process out how to get this into style.css
const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '0',
    backgroundImage       : 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.03))',
    width                 : '80%',
    backgroundColor       : '#f4f4f4',
    transform             : 'translate(-50%, -50%)',
    position: 'absolute',
    border: 'none',
    borderRadius: 'none',
    maxHeight: '100vh',
    overflowY: 'scroll',
  }
};

class SplashNav extends Component {
  constructor () {
    super()
    this.state = {
      navHidden: true,
      navIconClass: 'ion-navicon',
      width: 0,
      aboutIsOpen: false,
      legalIsOpen: false,
    }
    this.openAbout = this.openAbout.bind(this);
    this.afterOpenAbout = this.afterOpenAbout.bind(this);
    this.closeAbout = this.closeAbout.bind(this);
    this.openLegal = this.openLegal.bind(this);
    this.afterOpenLegal = this.afterOpenLegal.bind(this);
    this.closeLegal = this.closeLegal.bind(this);
  }

  openAbout() { this.setState({aboutIsOpen: true}); }
  openLegal() { this.setState({legalIsOpen: true}); }
  // references are now sync'd and can be accessed.
  afterOpenAbout() { this.subtitle.style.color = ''; }
  afterOpenLegal() { this.subtitle.style.color = ''; }
  closeAbout() { this.setState({aboutIsOpen: false}); }
  closeLegal() { this.setState({legalIsOpen: false}); }

  // responsive nav menu
  handleResize() {
    if (window.innerWidth > 1023) {
      this.setState({ navHidden: false })
    } else if ((window.innerWidth < 1023) && (this.state.navIconClass === 'ion-navicon')) {
      this.setState({ navHidden: true })
    }
  }
  componentDidMount() {
    // bind window resize listeners
    this._handleResize = this.handleResize.bind(this);
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
  }
  // clean up listeners
  componentWillUnmount() { window.removeEventListener('resize', this._handleResize); }
  // manage nav visiblity in narrow windows
  toggleNav () {
    this.setState({ navHidden: !this.state.navHidden })
    if (this.state.navIconClass === 'ion-navicon'){
      this.setState({navIconClass: 'ion-android-close'});
    } else {
      this.setState({navIconClass: 'ion-navicon'});
    }
  }
  render() {
    const Nav = (props) => (
      <div className="nav-box">
        <ul className="main-nav">
          <li><a className="popup-with-form" onClick={this.openAbout}>about&nbsp;<i className="ion-information-circled"></i></a></li>

          <li><a className="popup-with-form" onClick={this.openLegal}>legal&nbsp;<i className="ion-document-text"></i></a></li>

        </ul>
        <Modal
          isOpen={this.state.aboutIsOpen}
          onAfterOpen={this.afterOpenAbout}
          onRequestClose={this.closeAbout}
          style={modalStyles}
          contentLabel="about stockpicker.io"
          >
          <h2 ref={subtitle => this.subtitle = subtitle} className="modal-header">
            about
          </h2>
          <div className='modal-text'>
            <p>
              Stockpicker.io is a web app designed to bring investment math and all its possibilities to the largest possible audience.
            </p>
            <br/>
            <p>
              Building wealth shouldn&apos;t be a second job. Let stockpicker.io help you maximize your earnings potential.
            </p>
            <br/>
            <center><button onClick={this.closeAbout}>close</button></center>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.legalIsOpen}
          onAfterOpen={this.afterOpenLegal}
          onRequestClose={this.closeLegal}
          style={modalStyles}
          contentLabel="legal"
          >
          <h2 ref={subtitle => this.subtitle = subtitle} className="modal-header">
            legal
          </h2>
          <div className='modal-text'>
          <p>
            Stockpicker.io is a financial calculator, but it does not promise financial gain.<br/><br/>
            The math here is from <a href="https://en.wikipedia.org/wiki/Harry_Markowitz" target="_blank" rel="noopener noreferrer">Harry Markowitz&apos;s</a> Nobel Prize winning model, commonly referred to as <a href="https://en.wikipedia.org/wiki/Modern_portfolio_theory" target="_blank" rel="noopener noreferrer">modern portfolio theory.</a><br/><br/>
            But because market forces are unpredictable, even to the most sophisticated algorithms, we cannot take responsiblity for money lost due to poor portfolio or market performance.<br/><br/>
            We present the tools for doing investment math, and we are here to empower you, but we are not (as of this writing) stock mocket wizards. <br/><br/>
            That said, we hope you find these tools useful. We use them, and we&apos;re always working to make them better. Thanks for stopping by. :)<br/><br/>
            Most sincerely,<br/>
            The Team at Stockpicker.io
            <br/>

          </p>
          <br/>
          <center><button onClick={this.closeLegal}>close</button></center>
          </div>
        </Modal>
      </div>

    )
    return (

      <header className="splash row">
        <nav>
          <div className="row splash-text-box">
            <div className="col span-1-of-2">
              <a className="mobile-nav-icon" onClick={this.toggleNav.bind(this)}><i className={this.state.navIconClass}></i></a>
              <h1 className="splash-text">stockpicker.io</h1><span className="beta-box">BETA</span>
            </div>
            <div className="col span-1-of-2">
              <SmoothCollapse
                expanded={!this.state.navHidden}>
                <Nav />
              </SmoothCollapse>
            </div>

          </div>
        </nav>
      </header>
    );
  }
};



export default SplashNav;

/*
<li>
    <a href="">log in / sign up&nbsp;<i className="ion-person"></i></a>
</li>
*/
