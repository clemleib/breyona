import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import loginAction, { login2fa } from "../lib/actions/loginAction";
import axios from 'axios';
import ReactTricker from 'react-ticker';
import numeral from "numeral";
import ReactTooltip from 'react-tooltip';
import { Link as LinkTo, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

class Subnav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      otp: "",
      otpLoading: false,
      captcha1: "",
      answer: "",
      question: "",
      loginClicked: false,
      loading: false,
      spinnerLoading: false,
      cryptoCurrencySymp: {
        /***count === number of symbols to request there data */
        count: 5,
        symbolArr: [
          "btc", "eth", "ltc", "bch", "dash"
        ]
      },
      trickerCoinsDataArray: [],
      tickerMove: true,
    };
    this.gen = this.gen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.loginOtp = this.loginOtp.bind(this);
  }
  componentWillMount() {
    // var x = Math.round(Math.random() * 6) + 1
    // var y = Math.round(Math.random() * 6) + 1;
    // var question = `What is ${Math.floor(x)} x ${Math.floor(y)}`;
    // var answer = Math.floor(x) * Math.floor(y);
    // this.setState({answer,question})
    this.getCoinsTicker()
      .then(DataArr => {
        this.setState({
          trickerCoinsDataArray: DataArr
        })
      }).catch(err => {
        console.log(err);
      });
  }
  refreshDataCoin = () => {

    this.setState({
      trickerCoinsDataArray: []
    })
    console.log("Refresh data");
    this.getCoinsTicker()
      .then(DataArr => {
        this.setState({
          trickerCoinsDataArray: DataArr
        })
      }).catch(err => {
        console.log(err);
      });
  }
  getCoinsTicker = () => {
    //init tracker currency
    return new Promise((resolve, reject) => {
      let { cryptoCurrencySymp } = this.state;
      cryptoCurrencySymp.symbolArr.map(async (val, index) => {

        await axios.get(`https://bravenewcoin-v1.p.rapidapi.com/ticker?show=usd&coin=${val}`, {
          headers: {
            "X-RapidAPI-Host": "bravenewcoin-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "7eb80fbe12msh65a14bd6df33987p10261cjsn3a52d2f316b7"
          }
        }).then(({ data }) => {
          let { trickerCoinsDataArray } = this.state;

          if (val === 'btc') {
            trickerCoinsDataArray.push({
              id: 1,
              logo: "https://res.cloudinary.com/btcgrinders/image/upload/v1561131884/images/icons/btc.png",
              data
            })
          } else if (val === 'eth') {
            trickerCoinsDataArray.push({
              id: 2,
              logo: "https://res.cloudinary.com/btcgrinders/image/upload/v1561131884/images/icons/eth.png",
              data
            })
          } else if (val === 'ltc') {
            trickerCoinsDataArray.push({
              id: 3,
              logo: "https://res.cloudinary.com/btcgrinders/image/upload/v1561131884/images/icons/ltc.png",
              data
            })
          } else if (val === 'bch') {
            trickerCoinsDataArray.push({
              id: 4,
              logo: "https://res.cloudinary.com/btcgrinders/image/upload/v1561131884/images/icons/bch.png",
              data
            })
          } else {
            (val === 'dash')
            id: 5,
              trickerCoinsDataArray.push({
                logo: "https://res.cloudinary.com/btcgrinders/image/upload/v1561131884/images/icons/dash.png",
                data
              })
          }


          if (trickerCoinsDataArray.length === cryptoCurrencySymp.count) {
            return resolve(trickerCoinsDataArray.sort(((a, b) => a.id - b.id)))
          }
        }).catch(err => {
          return reject(err)
        })

      });

    })
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  gen() {
    var x = Math.round(Math.random() * 6) + 1;
    var y = Math.round(Math.random() * 6) + 1;
    var question = `What is ${Math.floor(x)} x ${Math.floor(y)} ?`;
    var answer = Math.floor(x) * Math.floor(y);
    this.setState({ answer, question });
    this.setState({ loginClicked: true });
  }
  onLogin(e) {
    e.preventDefault();
    console.log("login");
    this.setState({
      error: "",
      loading: true
    });

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        error: "Please fill all the fields",
        loading: false
      });
      return;
    }
    if (this.state.answer === parseInt(this.state.captcha1)) {
      let semail = email.toLowerCase();
      this.props.loginAction({ email: semail, password }).then(res => {
        if (res.status && !res.tfa) {
          window.location.href = "/dashboard";
        } else if (res.status && res.tfa) {
          this.setState({
            stage2: true
          });
        } else {
          this.setState({
            error: "Invalid login credentials",
            loading: false
          });
        }
      });
    } else
      this.setState({
        error: "Captcha verification failed",
        loading: false
      });
  }

  loginOtp(e) {
    e.preventDefault();
    this.setState({
      error: "",
      otpLoading: true
    });
    const { otp, email } = this.state;
    if (!otp) {
      this.setState({
        error: "Please enter OTP code",
        otpLoading: false
      });
      return;
    }
    this.props.login2fa({ tfatoken: otp, email }).then(res => {
      if (res) {
        window.location.href = "/dashboard";
      } else {
        this.setState({
          error: "Invalid OTP code. Please enter a valid one.",
          otpLoading: false
        });
      }
    });
  }
  handelmouseOver = () => {
    this.setState({
      tickerMove: false
    })
  }
  handelmouseLeave = () => {
    this.setState({
      tickerMove: true
    })
  }
  goTo = (link) => {
    window.location.href = link;
  }
  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { currentPage, subPage } = this.props;
    const { loginClicked, cryptoCurrencySymp } = this.state;
    return (
      <div>
        <section id="menu">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <ul className="nav">
                  <li className="nav-item" style={{ marginRight: '2em' }}>
                    {/* <a className={!subPage && currentPage === 'poker' ? 'nav-link active1' : 'nav-link'} href="/">Poker</a> */}

                    <a
                      href="/home"
                      onClick={this.refreshDataCoin}
                      className={
                        !loginClicked &&
                          subPage !== "admin" &&
                          subPage !== "tos" &&
                          subPage !== "blog" &&
                          subPage !== `blog/${subPage}` &&
                          subPage !== "faq" &&
                          subPage !== "dashboard" &&
                          subPage !== "affiliate" &&
                          currentPage === "home"
                          ? "nav-link active1"
                          : "nav-link"
                      }
                    >
                      <i className="fa fa-home" /> Home{" "}
                    </a>

                  </li>

                  <li className="nav-item">
                    <LinkTo
                      activeClass="active1"
                      spy={true} smooth={true} duration={1000} to="trading"
                      /*onClick= {this.refreshDataCoin}*/
                      onClick={() => this.goTo("/home#trading")}
                      className={
                        !loginClicked &&
                          subPage !== "admin" &&
                          subPage !== "tos" &&
                          subPage !== "blog" &&
                          subPage !== `blog/${subPage}` &&
                          subPage !== "faq" &&
                          subPage !== "dashboard" &&
                          subPage !== "affiliate" &&
                          currentPage === "trading"
                          ? "dropdown-item nav-link active1"
                          : "dropdown-item nav-link"
                      }
                    >
                      <i className="fa fa-line-chart" /> Trading
                      </LinkTo>

                  </li>
 
                  <li className="nav-item">	
                    <LinkTo	
                      activeClass="active1"	
                      spy={true} smooth={true} duration={1000} to="sports"	
                      /*onClick= {this.refreshDataCoin}*/	
                      onClick={() => this.goTo("/home#sports")}	
                      className={	
                        !loginClicked &&	
                          subPage !== "admin" &&	
                          subPage !== "tos" &&	
                          subPage !== "blog" &&	
                          subPage !== `blog/${subPage}` &&	
                          subPage !== "faq" &&	
                          subPage !== "dashboard" &&	
                          subPage !== "affiliate" &&	
                          currentPage === "sports"	
                          ? "dropdown-item nav-link active1"	
                          : "dropdown-item nav-link"	
                      }	
                    >	
                      <i className="fa fa-desktop" /> eSports	
                      </LinkTo>	

                  </li>

                 <li className="nav-item"> 
                    <LinkTo
                      activeClass="active1"
                      spy={true} smooth={true} duration={1000} to="tools"
                      /*onClick= {this.refreshDataCoin}*/
                      onClick={() => this.goTo("/home#tools")}
                      className={
                        !loginClicked &&
                          subPage !== "admin" &&
                          subPage !== "tos" &&
                          subPage !== "blog" &&
                          subPage !== `blog/${subPage}` &&
                          subPage !== "faq" &&
                          subPage !== "dashboard" &&
                          subPage !== "affiliate" &&
                          currentPage === "tools"
                          ? "dropdown-item nav-link active1"
                          : "dropdown-item nav-link"
                      }
                    >
                      <i className="fa fa-wrench" /> Tools
                      </LinkTo>

                  </li>
                  <ReactTooltip type="light" className="nav-tooltip" />
                </ul>
              </div>
              {/* coin ticker
              <div className="col-md-3" style={{
                padding: "0px",
                height: 30
              }}>
                <ul
                  className="main-menu-socail main-menu-left w-100 h-100">
                  {(this.state.trickerCoinsDataArray.length === cryptoCurrencySymp.count) ?
                    <li className="nav-item w-100 h-100" data-tip='click to refresh'>

                      <div className="TickerDataWrapper h-100" onClick={this.refreshDataCoin}>
                        <ReactTricker
                          speed={3}
                          move={this.state.tickerMove}
                          height={30}
                        >
                          {(index) => index === 0 ?
                            <span>Click To Refresh</span> :
                            <div className="TickerData" style={{ display: 'flex', margin: "0 0px 0px 0", height: 40 }}>
                              {this.state.trickerCoinsDataArray.map((val, i) =>
                                <div className="ticker-wrapper" key={Math.random(i * 100 ^ 5)}>
                                  <span className="item">
                                    <img src={val.logo} alt="" />
                                    {
                                      (val.data.price_24hr_pcnt > 0) ? <i className="fa fa-caret-up state state-green" /> : <i className="fa fa-caret-down state state-danger" />
                                    }
                                    {numeral(val.data.last_price).format('$0,0.00')}
                                  </span>
                                </div>
                              )}
                            </div>
                          }
                        </ReactTricker>
                      </div>
                    </li> :
                    <li className="nav-item w-100 h-100"
                      onClick={this.refreshDataCoin}
                      data-tip='click to refresh'
                    >
                      <div style={{
                        position: 'relative',
                        flexGrow: 1,
                        height: "100%",
                        width: "100%"
                      }}>
                        <div className=" text-secondary"
                          style={{
                            height: "100%",
                            textAlign: "center",
                            paddingTop: 3
                          }} role="status">
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Fetching data...
                          </div>
                      </div>

                    </li>

                  }

                  <ReactTooltip type="light" className="nav-tooltip" />
                </ul>
                </div>
              */}
              <div className="offset-3 col-md-4">
                <ul className="main-menu-right nav">
                  <li className="nav-item">
                    {/*<a className={currentPage !== 'poker'
                      && currentPage !== 'trading'
                      && currentPage !== 'sports'
                      && currentPage !== 'tools'
                      && (subPage=== 'blog' || subPage==='blog/:slug')
                    ? 'nav-link active1' : 'nav-link'} href="/blog"><i className="fa fa-trophy"></i> Blog</a> */}
                    {/*<a className={(subPage === 'blog/:slug'||currentPage === 'blog') ? 'nav-link active1' : 'nav-link'} href="/blog">Blog</a> */}

                    <a href="/blog"
                      onClick={this.refreshDataCoin}
                      className={
                        currentPage === "blog" || currentPage === "single"
                          ? "nav-link active1"
                          : "nav-link"
                      }
                    >
                      Blog
                      </a>
                  </li>
                  <li className="nav-item">
                    <a href="/faq"
                      onClick={this.refreshDataCoin}
                      className={
                        currentPage === "faq"
                          ? "nav-link active1"
                          : "nav-link"
                      }
                    >
                      FAQ
                      </a>
                  </li>
                  {this.props.auth.isAuthenticated &&
                    this.props.auth.user.roleId === 1 ? null : (
                      <li className="nav-item">
                        <a href="/affiliate"
                          onClick={this.refreshDataCoin}
                          className={
                            currentPage === "affiliate"
                              ? "nav-link active1"
                              : "nav-link"
                          }
                        >
                          Affiliate
                        </a>
                      </li>
                    )}
                  {isAuthenticated ? (
                    currentPage === "dashboard" ? (
                      <li className="nav-item">
                        <a href="/dashboard"
                          onClick={this.refreshDataCoin}
                          className="nav-link"
                          className={
                            currentPage === "dashboard"
                              ? "nav-link active1"
                              : "nav-link"
                          }
                        >
                      <i className="fa fa-dashboard" />   Dashboard
                          </a>
                      </li>
                    ) : (
                        <li className="nav-item">
                          <a href="/dashboard"
                            onClick={this.refreshDataCoin}
                            className={
                              currentPage === "dashboard"
                                ? "nav-link active1"
                                : "nav-link"
                            }
                          >
                          <i className="fa fa-dashboard" />   Dashboard
                          </a>
                        </li>
                      )
                  ) : (
                    <li className="nav-item login-btn">
                        <a
                          data-toggle="modal"
                          data-target="#login-modal"
                          className={
                            this.state.loginClicked
                              ? "nav-link active1 login-item clr"
                              : "login-item nav-link"
                          }
                          onClick={this.gen}
                        >
                          {" "}
                          <i
                            className="fa fa-user-circle-o"
                            style={{ margin: "0px 5px" }}
                          />
                          <b>Login</b>{" "}
                        </a>

                        {/* <% } %> */}
                        {/* <!-- The Modal --> */}
                        <div className="modal fade" id="login-modal">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              {/* <!-- Modal Header --> */}
                              <div className="modal-header">
                                <h4 className="modal-title"><font color="#00137F">Log In</font></h4>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                >
                                  &times;
                              </button>
                              </div>

                              {/* <!-- Modal body --> */}
                              <div className="modal-body">
                                <div className="text-left login-form">
                                  {this.state.error && (
                                    <div className="alert alert-danger">
                                      {this.state.error}
                                    </div>
                                  )}
                                  {!this.state.stage2 ? (
                                    <form action="" method="">
                                      <div className="form-group">
                                        <label htmlFor="loginEmail">
                                          Email address
                                      </label>
                                        <input
                                          type="loginEmail"
                                          className="form-control"
                                          id="loginEmail"
                                          aria-describedby="loginEmail"
                                          placeholder="Enter email"
                                          name="email"
                                          value={this.state.email}
                                          onChange={this.onChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="loginPassword">
                                          Password
                                      </label>
                                        <input
                                          type="password"
                                          className="form-control"
                                          id="loginPassword"
                                          placeholder="Password"
                                          name="password"
                                          value={this.state.password}
                                          onChange={this.onChange}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="loginPassword">
                                          {this.state.question}
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          id="captcha1"
                                          placeholder="captcha"
                                          name="captcha1"
                                          value={this.state.captcha1}
                                          onChange={this.onChange}
                                        />
                                      </div>
                                      <div className="text-center">
                                        {this.state.loading ?
                                          <button
                                            id="loginBtn"
                                            className="position-relative cmn-btn newbtnStyle"
                                            onClick={this.onLogin}
                                            disabled={this.state.loading}
                                          >
                                            Login
                                        <div className="spinner-wrapper">
                                              <div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                              </div>
                                            </div>
                                          </button>
                                          :
                                          <button
                                            id="loginBtn"
                                            className="cmn-btn newbtnStyle"
                                            onClick={this.onLogin}
                                          >
                                            Login
                                      </button>
                                        }
                                      </div>
                                    </form>
                                  ) : (
                                      <div>
                                        <p>
                                          Please generate an OTP code using
                                          google authenticate to continue
                                    </p>
                                        <div className="form-group">
                                          <label htmlFor="loginPassword">
                                            OTP
                                      </label>
                                          <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            name="otp"
                                            value={this.state.otp}
                                            onChange={this.onChange}
                                          />
                                        </div>
                                        <div className="text-center">
                                          {this.state.otpLoading ?
                                            <button
                                              className="position-relative newbtnStyle btn btn-light"
                                              disabled
                                            >
                                              Verify Token
                                          <div className="spinner-wrapper">
                                                <div className="spinner-border text-success" role="status">
                                                  <span className="sr-only">Loading...</span>
                                                </div>
                                              </div>
                                            </button>
                                            :
                                            <button className="cmn-btn newbtnStyle" onClick={this.loginOtp}>Verify Token
                                        </button>
                                          }
                                        </div>
                                      </div>
                                    )}
                                  <ul className="reg-menu text-center">
                                    <li>
                                      <a
                                        href="mailto:support@coinrewards.org"
                                        style={{ paddingRight: "10px" }}
                                      >
                                        support@coinrewards.org
                                    </a>
                                    </li>
                                    <li>
                                      <Link href="/faq">
                                        <a style={{ paddingLeft: "10px" }}>
                                          Help
                                      </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/forgot-password">
                                        <a>Forgot Password?</a>
                                      </Link>
                                    </li>
                                  </ul>
                                  <p className="text-center">New User?</p>
                                  <div className="text-center but-div">

                                    <a href="/register">
                                      <button className="cmn-btn newbtnStyle">
                                        Register Now
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* <!-- Modal footer --> */}
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                              </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  {/* <% if (user && user.role === 1 && page === 'admin') { %> */}
                  {isAuthenticated && user.roleId === 1 ? (
                    <li className="nav-item">

                      <a href="/admin"
                        className={
                          currentPage === "admin"
                            ? "nav-link active1"
                            : "nav-link"
                        }
                      >
                        Admin
                        </a>

                    </li>
                  ) : (
                      ""
                    )}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* <% if (page !== 'dashboard' && page !== 'admin') { %> */}
  
        {/* <% } %> */}

        {(this.props.router.pathname.includes("/trading") && this.props.pageInfo.subPage !== "") ? (
          <section id="secondary-menu">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav">
                  <li className="nav-item">
                      <a
                        className={
                          subPage === "Bitfinex".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/trading/bitfinex"
                      >
                      Bitfinex
                      </a>
                    </li>&nbsp;
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Binancej".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/trading/Binancej"
                      >
                        Binancej
                      </a>
                    </li>
                    &nbsp;&nbsp;
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Binance".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/trading/Binance"
                      >
                        Binance
                      </a>
                    </li>
                    &nbsp;&nbsp;
                    {/*<li className="nav-item">
                        <a className={subPage === '1Fox' ? 'nav-link active1' : 'nav-link'} href="/trading/1Fox">1Fox</a>
                      </li>*/}
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Mercatox".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/trading/Mercatox"
                      >
                        Mercatox
                      </a>
                    </li>
                    &nbsp;&nbsp;
                    {/* <li className="nav-item">
                        <a className={subPage === '1Broker' ? 'nav-link active1' : 'nav-link'} href="/trading/1Broker">1Broker</a>
                      </li>*/}
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Livecoin".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/trading/Livecoin"
                      >
                        Livecoin
                      </a>
                    </li>
                    &nbsp;&nbsp;
                    {/* <li className="nav-item">
                        <a className={subPage === 'BitMex' ? 'nav-link active1' : 'nav-link'} href="/trading/BitMex">BitMex</a>
                      </li>*/}



                    &nbsp;&nbsp;
                    {/* <li className="nav-item">
                        <a className={subPage === 'QuadrigaCx' ? 'nav-link active1' : 'nav-link'} href="/trading/QuadrigaCx">QuadrigaCx</a>
                    </li>*/}
                    &nbsp;&nbsp;
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {(this.props.router.pathname.includes("/sports") && this.props.pageInfo.subPage !== "") ? (
          <section id="secondary-menu">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav">
                    <li className="nav-item">
                      <a href="/sports/IntertopSports"
                        className={
                          subPage === "IntertopSports".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                      >
                        IntertopSports
                        </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Fairlay".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/sports/Fairlay"
                      >
                        Fairlay
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "NitrogenSports".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/sports/NitrogenSports"
                      >
                        NitrogenSports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "BitcoinRush".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                        href="/sports/BitcoinRush"
                      >
                        BitcoinRush
                      </a>
                    </li>


                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {(this.props.router.pathname.includes("/tools") && this.props.pageInfo.subPage !== "") ? (
          <section id="secondary-menu">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav">


                    <li className="nav-item">
                      <a href="/tools/Torguard"
                        className={
                          subPage === "Torguard".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                      >
                        Torguard
                        </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className={
                          subPage === "Trezormetal".toLowerCase()
                            ? "nav-link active1"
                            : "nav-link"
                        }
                        href="https://shop.trezor.io/?a=604d54f6413b"
                      >
                        Trezor
                      </a>
                    </li>
                    <li className="nav-item">
                        <a href="/tools/Orange"
                          className={
                            subPage === "Orange".toLowerCase()
                              ? "nav-link active1"
                              : "nav-link"
                          }
                        >
                          Orange
                        </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          subPage === "Ledger".toLowerCase()
                            ? "nav-link active1"
                            : "nav-link"
                        }
                        href="https://www.ledgerwallet.com/r/13ca"
                      >
                        Ledger
                      </a>
                    </li>*/}
                    <li className="nav-item">
                      <a href="/tools/CoinTracking"
                        className={
                          subPage === "CoinTracking".toLowerCase()
                            ? "nav-link active2"
                            : "nav-link"
                        }
                      >
                        Coin Tracking
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pageInfo: state.pageInfo
});

export default connect(
  mapStateToProps,
  { loginAction, login2fa }
)(withRouter(Subnav));