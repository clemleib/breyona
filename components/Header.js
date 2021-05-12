import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { withRouter } from 'next/router';
import { registerUser } from '../lib/actions/userAction';
import logoutAction from '../lib/actions/logoutAction';
import axios from 'axios';
import ReactTricker from 'react-ticker';
import numeral from "numeral";
import apiUrl from "../lib/config"
import { saveCurrent, saveSub } from '../lib/actions/pathActions';
import Captcha from "react-captcha"
import Homeslider from "./Slick";
import ReactTooltip from 'react-tooltip';
import ThemeSetting from './ThemeSetting';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      tos: false,
      rsuccess: "",
      showBtn: false,
      captcha1: '',
      answer: "",
      question: '',
      loading: false,
      referralCode: null,
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
    this.logOut = this.logOut.bind(this);
    const path = this.props.router.pathname;
    this.savePath(path);
    this.savePath = this.savePath.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setTerms = this.setTerms.bind(this);
    this.crecaptcha = this.crecaptcha.bind(this)
  }

  componentDidMount() {
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

  savePath(path) {
    // const { stuff, currentPath, subPath } = path.split('/')
    // this.props.saveCurrent(currentPath);
    // this.props.saveSub(subPath);
    // console.log('path stuff ==> ', currentPath, subPath )
    // // this.props.saveCurrent(path.replace("/", ""));
    if (
      path === '/tools' ||
      path === '/trading' ||
      path === '/sports' ||
      path === '/poker'
    ) {
      console.log("header ", path)
      this.props.saveCurrent(path.replace('/', ''));
    } else if (path === '/') {
      this.props.saveCurrent('poker');
    } else {
      this.props.saveSub(path.replace('/', ''));
    }
  }


  /**
   * Logs a user out
   * @param {any} e
   * @returns {void}
   * @memberOf Dashboard
   */
  logOut(e) {
    e.preventDefault();
    this.props.logoutAction();
  }
  gen() {
    var x = Math.round(Math.random() * 6) + 1
    var y = Math.round(Math.random() * 6) + 1;
    var question = `What is ${Math.floor(x)} x ${Math.floor(y)} ?`;
    var answer = Math.floor(x) * Math.floor(y);
    this.setState({ answer, question })
  }
  crecaptcha(value) {
    axios.post(`${apiUrl}/api/users/confirmRecaptcha`, { value: value }).then((res) => {
      console.log(res)
      if (res.data.success) this.setState({ showBtn: true })
    })
  }
  signUp(e) {
    e.preventDefault();
    console.log("regis");
    const { tos } = this.state;
    const email = this.state.email.toLowerCase();
    //get Referral
    let referral;
    if (jsCookie.get("referral")) {
      referral = jsCookie.get("referral");
    } else if (this.state.referralCode) {
      referral = `?ref=${this.state.referralCode}`;
    } else {
      referral = `?ref=${document.getElementById("referralCode").value}`;
    }

    const filter = /^[\w\-.+]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4}$/;
    this.setState({
      error: '',
      loading: true
    });
    if (!email || !filter.test(email)) {
      this.setState({
        error: 'Please enter a valid email address.',
        loading: false
      });
      return;
    }
    if (!tos) {
      this.setState({
        error: 'Please agree with our Terms of Service.',
        loading: false
      });
      return;
    }
    if (this.state.answer === parseInt(this.state.captcha1)) {
      this.props.registerUser({ email, referral }).then((res) => {
        console.log(res);
        if (res.done) {
          this.setState({ rsuccess: `Your password has been sent to ${email}` })
          jsCookie.set("rsuccess", `Your password has been sent to ${email}`)
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        } else {
          this.setState({
            error: res.data.message,
            loading: false
          });
        }
      })
    } else {
      this.setState({
        error: 'You did not get the captcha correct. Please try again.',
        loading: false
      });
    }
  }
  setTerms() {
    this.setState({
      tos: !this.state.tos
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { email, tos, error } = this.state;

    let referral = jsCookie.get("referral") ? jsCookie.get("referral").slice(1).split("=")[1] : null;


    return (
      <div>
        <section id="menu" className="d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-end">
              <div className=" col-md-5" style={{
                padding: "0px",
                height: 30
              }}>
               
              </div>
              <div className="offset-0 col-md-4 p-0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ThemeSetting />
              </div>
            </div>
          </div>
        </section>

        <section id="top">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="logo ishak">
                  <a href="/" >
                    <img src="https://res.cloudinary.com/cnrr/image/upload/v1564283085/Acoinr-logo_eddorn.png" height="55" width="auto" />
                  </a>


                </div>
                <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size="1"><i><b><font color="#686868"></font></b></i></font>
              </div>
              <div className="col-md-5 x-adjustpad" >

                <Homeslider />
              </div>



              <div className="col-md-4">
                <div className="row">
                  <div className="col-sm-12 text-right">
                    {isAuthenticated && (
                      <li>
                        <a href="/dashboard">
                          <font size="2">Welcome, {user.email}
                          </font>
                        </a>
                      </li>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div className="right-top ">

                      {(!isAuthenticated && this.state.loading) &&
                        <button onClick={this.gen} id="registerBtn"
                          className="position-relative cmn-btn-disabled newbtnStyle"
                          disabled={this.state.loading}
                          data-toggle="modal" data-target="#signup-modal" onClick={this.gen}
                        >Create Wallet
                            <div className="spinner-wrapper">
                            <div className="spinner-border text-success" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </button>
                      }
                      {(!isAuthenticated && !this.state.loading) &&
                        <button onClick={this.gen} id="registerBtn"
                          className="position-relative cmn-btn newbtnStyle"
                          disabled={this.state.loading}
                          data-toggle="modal" data-target="#signup-modal" onClick={this.gen}
                        ><b>Create Crypto Cashback Wallet Now!</b>

                        </button>
                      }
                      <style jsx>
                        {`
                                          .newbtnStyle {
                                            text-align: center;
                                            cursor: pointer;
                                            outline: none;
                                            border: none;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newbtnStyle:hover {
                                            background-color: #3e8e41;
                                          }

                                          .newbtnStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .newAStyle {
                                            padding: 5px;
                                            border: 10px solid #22B14C;
                                            color: white;
                                            font-weight: 15px;
                                            background: #22B14C;
                                            font-size: 20px;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newAStyle: hover {
                                            background-color: #3e8e41;

                                          }

                                          .newAStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .disabled {
                                            background-color: #e0e0e0;
                                            box-shadow: none;
                                            cursor: default
                                          }
                                      `}
                      </style>
                      {isAuthenticated && (
                        <li>
                          <a
                            href="/logout"
                            className="btn btn-primary"
                            style={{ marginLeft: '5px', color: '#fff' }}
                            onClick={this.logOut}
                          >
                            <font size="3"><i className="fa fa-power-off"></i></font>
                          </a>

                        </li>
                      )}
                      {/* <!-- The Modal --> */}


                    </div>


                  </div>
                  <div className="col-sm-12 text-right">
                    <div className="modal fade" id="signup-modal">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                          {/* <!-- Modal Header --> */}
                          <div className="modal-header">
                            <h4 className="modal-title">Register with Us</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>

                          {/* <!-- Modal body --> */}
                          <div className="modal-body">
                            <div className="text-center login-form">
                              {error && (
                                <div className="error alert alert-danger">{error}</div>
                              )}
                              {this.state.rsuccess !== "" ? <div className="alert alert-success">{this.state.rsuccess} </div> : null}
                              <div className="success" id="successDiv" />
                              <form>

                                <div className="form-group">
                                  <label htmlFor="email">Email </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Password will be sent to e-mail"
                                    value={email}
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="loginPassword">{this.state.question}</label>
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
                                {referral ?
                                  <div className="form-group">
                                    <p style={{ fontSize: "small" }}><i><b><font color="FF6A00">Referral Code (optional)</font></b></i></p>
                                    <input
                                      id=""
                                      disabled
                                      type="text"
                                      name="referral"
                                      value={referral}
                                    />
                                  </div> :
                                  <div className="form-group">
                                    <label style={{ fontSize: "small" }}><i><b><font color="FF6A00">Referral</font></b></i></label>
                                    <input
                                      id="referralCode"
                                      className="form-control"
                                      type="text"
                                      placeholder="Optional"
                                      name="referralCode"
                                    />
                                  </div>
                                }
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input
                                      className="form-check-input"
                                      name="tos"
                                      type="checkbox"
                                      value={tos}
                                      onChange={this.setTerms}
                                    />
                                    I agree with the <a target="_blank" href="/blog/Terms-of-Use-and-Privacy-Policy"> <u>Terms of Service</u> </a>.
                                </label>
                                </div>
                                <div className="text-center but-div">
                                  {/* <center> <Captcha
                                  sitekey='6LdUlpYUAAAAAJfpbB2j74ZY4X5DTbhF0HtqmXI3'
                                  lang='en'
                                  theme='light'
                                  type='image'
                                  callback={(value) => this.setState({ rvalue: value }, () => this.crecaptcha(value))} /></center> */}

                                  <style jsx>
                                    {`
                                          .newbtnStyle {
                                            text-align: center;
                                            cursor: pointer;
                                            outline: none;
                                            border: none;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newbtnStyle:hover {
                                            background-color: #3e8e41;
                                          }

                                          .newbtnStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .newAStyle {
                                            padding: 5px;
                                            border: 10px solid #22B14C;
                                            color: white;
                                            font-weight: 15px;
                                            background: #22B14C;
                                            font-size: 20px;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newAStyle: hover {
                                            background-color: #3e8e41;

                                          }

                                          .newAStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .disabled {
                                            background-color: #e0e0e0;
                                            box-shadow: none;
                                            cursor: default
                                          }
                                      `}
                                  </style>
                                  {this.state.loading ?
                                    <button onClick={this.signUp} id="registerBtn" className="cmn-btn newbtnStyle"
                                      disabled={this.state.loading}
                                    >
                                      <b>Create Account</b>
                                      <div className="spinner-wrapper">
                                        <div className="spinner-border text-success" role="status">
                                          <span className="sr-only">Loading...</span>
                                        </div>
                                      </div>
                                    </button> :
                                    <button onClick={this.signUp} id="registerBtn" className="cmn-btn newbtnStyle">
                                      Create Account
                                      </button>
                                  }
                                </div>
                              </form>

                              <div className="text-center">
                                <style jsx>
                                  {`
                                          .newbtnStyle {
                                            text-align: center;
                                            cursor: pointer;
                                            outline: none;
                                            border: none;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newbtnStyle:hover {
                                            background-color: #3e8e41;
                                          }

                                          .newbtnStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .newAStyle {
                                            padding: 5px;
                                            border: 10px solid #22B14C;
                                            color: white;
                                            font-weight: 15px;
                                            background: #22B14C;
                                            font-size: 20px;
                                            box-shadow: 0px 2px 5px 1px #777;
                                          }
                                          .newAStyle:hover {
                                            background-color: #3e8e41;

                                          }

                                          .newAStyle:active {
                                            background-color: #3e8e41;
                                            box-shadow: 0 5px #666;
                                            transform: translateY(4px);
                                          }

                                          .disabled {
                                            background-color: #e0e0e0;
                                            box-shadow: none;
                                            cursor: default
                                          }
                                      `}
                                </style>
                                <br />
                                <p>Already a Member?</p>
                                <div className="but-div">
                                  <a href="/login">
                                    <button className="cmn-btn newbtnStyle">Login Now</button>
                                  </a>
                                </div>
                                <br />
                                <ul className="reg-menu2 text-center">
                                  <li>
                                    <a href="mailto:support@coinrewards.org" >
                                      <font size="1" style={{ paddingRight: "0px", color: "#000080" }}><b>support@coinrewards.org</b></font>
                                    </a>
                                  </li>

                                  <span style={{ fontSize: "0.8em" }}>|</span>
                                  <li>
                                    <a href="/faq" className="custom-hover2">
                                      <font size="1" style={{ paddingLeft: "5px" }}>Help</font>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/forgot-password" className="custom-hover2">
                                      <font size="1" style={{ paddingLeft: "0px" }}>Forgot Password?</font>
                                    </a>
                                  </li>
                                </ul>
                              </div>

                            </div>
                          </div>

                          {/* <!-- Modal footer --> */}
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* <!-- End create accoint modal --> */}

                    <ul className="reg-menu2 text-center">

                      {!isAuthenticated && (
                        <li>
                          <a href="mailto:support@coinrewards.org" className="custom-hover2">
                            <font size="1" style={{ paddingRight: "0px", color: "#000080" }}><font face="arial"><b>support@coinrewards.org</b></font></font>
                          </a>
                        </li>

                      )}
                      {!isAuthenticated && (<span style={{ fontSize: "0.8em", color: "#000080" }}><font face="arial"><b><font color="#000080">|</font></b></font></span>
                      )}
                      {!isAuthenticated && (
                        <li>
                          <a href="/faq" className="custom-hover2">
                            <font size="1" style={{ paddingLeft: "5px" }}><font face="arial"><b><font color="#000080">Help</font></b></font></font>
                          </a>
                        </li>

                      )}
                      {!isAuthenticated && (
                        <li>
                          <a href="/forgot-password" className="custom-hover2">
                            <font size="1" style={{ paddingLeft: "0px" }}>Forgot Password?</font>
                          </a>
                        </li>
                      )}


                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pageInfo: state.pageInfo
});

export default connect(mapStateToProps, {
  logoutAction, saveCurrent, saveSub, registerUser
})(withRouter(Header));
