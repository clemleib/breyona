import React, { Component } from 'react'; //
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import loginAction ,{ login2fa } from '../lib/actions/loginAction';
import apiUrl from "../lib/config"
import Captcha from "react-captcha"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      otp: '',
      otpLoading: false,
      rvalue: "",
      captcha1: "",
      answer: "",
      question: "",
      showBtn: false,
      loading: false
    };
    this.gen = this.gen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.loginOtp = this.loginOtp.bind(this);
    this.crecaptcha = this.crecaptcha.bind(this)
  }
  componentWillMount(){
    const {auth} = this.props;
    if(auth.isAuthenticated){
      this.props.router.push("/dashboard")
    }
    this.gen();
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
    this.setState({
      error: '',
      loading: true
    });
    const { password } = this.state;
    const email= this.state.email.toLowerCase();
    if (!email || !password) {
      this.setState({
        error: 'Please fill all the fields',
        loading: false
      });
      return;
    }
    if(this.state.answer === parseInt(this.state.captcha1)){
      let semail = email.toLowerCase();
      this.props.loginAction({ email, password }).then((res) => {
        if (res.status && !res.tfa) {
          window.location.href = '/dashboard';
        } else if (res.status && res.tfa) {
          this.setState({
            stage2: true
          });
        } else {
          this.setState({
            error: 'Invalid login credentials',
            loading: false
          });
        }
      });

    }else{
      this.setState({
        error: "Captcha verification failed",
        loading: false
      });
    }
  }

  loginOtp(e) {
    e.preventDefault();
    this.setState({
      error: '',
      otpLoading: true
    });
    const { otp } = this.state;
    const email= this.state.email.toLowerCase();
    if (!otp) {
      this.setState({
        error: 'Please enter otp',
        otpLoading: false
      });
      return;
    }
    this.props.login2fa({ tfatoken: otp, email }).then((res) => {
      if (res) {
        window.location.href = '/dashboard';
      } else {
        this.setState({
          error: 'Invalid OTP. Please enter a valid one.',
          otpLoading: false
        });
      }
    });
  }
  crecaptcha(value) {
    axios.post(`${apiUrl}/api/users/confirmRecaptcha`, { value: value }).then((res) => {
      console.log(res)
      if (res.data.success) this.setState({ showBtn: true })
    })
  }

  render() {
    return (
      <section id="main">
        <div className="row " style={{ padding: "60px 0px 30px" }}>
          <div className="col-md-4 offset-md-4" >
            <div className="text-left login-form" >
              {this.state.error &&
                <div className="alert alert-danger">
                  {this.state.error}
                </div>
              }
              {!this.state.stage2 ? (
                <form action="" method="">
                  <div className="form-group">
                    <center><label htmlFor="loginEmail">Enter Account Email Address</label></center>
                    <input
                      type="loginEmail"
                      className="form-control"
                      id="loginEmail"
                      aria-describedby="loginEmail"
                      placeholder="Enter Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <center><label htmlFor="loginPassword">Enter Your Password</label></center>
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
                  <div className="text-center">
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
                  {this.state.loading?
                      <button id="loginBtn" className="position-relative cmn-btn newbtnStyle"
                      disabled= {this.state.loading}
                      onClick={this.onLogin}>
                          Login
                          <div className= "spinner-wrapper">
                              <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                      </button>:
                      <button id="loginBtn" className="cmn-btn newbtnStyle" onClick={this.onLogin}>Login</button>
                  }
                  </div>
                </form>
              ) : (
                  <div>
                    <p>Please generate an OTP code using google authenticater to continue</p>
                    <div className="form-group">
                      <label htmlFor="loginPassword">OTP</label>
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
                      {this.state.otpLoading?
                        <button className="position-relative newbtnStyle btn btn-light"
                        disabled>
                          Verify Token
                          <div className= "spinner-wrapper">
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
              <ul className="reg-menu2 text-center">
                                    <li>
                                      <a href="mailto:support@coinrewards.org" className="custom-hover2">
                                        <font size="1" style={{ paddingRight: "0px" }}>support@coinrewards.org</font>
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
                                <br />
              <p className="text-center">New User?</p>
              <div className="text-center but-div">

                <a href="/register">
                  <button className="cmn-btn newbtnStyle">Register Now</button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loginAction,login2fa })(withRouter(Login));
