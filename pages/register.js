import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { registerUser } from '../lib/actions/userAction';
import jsCookie from 'js-cookie';
import axios from 'axios';
import apiUrl from "../lib/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      tos: false,
      rsuccess: "",
      showBtn: false,
      captcha: '',
      answer: "", captcha1: '',
      question: '',
      loading: false,
      referralCode: null
    };
    this.gen = this.gen.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setTerms = this.setTerms.bind(this);
    this.crecaptcha = this.crecaptcha.bind(this)

  }

  componentWillMount() {
    //auth.isAuthenticated
    const {auth} = this.props;
    if(auth.isAuthenticated){
      this.props.router.push("/dashboard")
    }
    this.gen();
    var referral = window.location.search
    if (referral) {
      jsCookie.set("referral", referral);
    } else {
      referral = jsCookie.get("referral");
    }
  }

  gen() {
    var x = Math.round(Math.random() * 6) + 1
    var y = Math.round(Math.random() * 6) + 1;
    var question = `What is ${Math.floor(x)} x ${Math.floor(y)}?`;
    var answer = Math.floor(x) * Math.floor(y);
    this.setState({ answer, question })
    return "question"
  }

  crecaptcha(value) {
    axios.post(`${apiUrl}/api/users/confirmRecaptcha`, { value: value }).then((res) => {

      if (res.data.success) this.setState({ showBtn: true })
    })
  }
  signUp(e) {
    e.preventDefault();
    //get Referral
    let referral ;
    if(jsCookie.get("referral")){
      referral = jsCookie.get("referral");
    }else if(this.state.referralCode){
      referral = `?ref=${this.state.referralCode}`;
    }else{
      referral = `?ref=${document.getElementById("referralCode").value}`;
    }

    const { tos } = this.state;
    const email= this.state.email.toLowerCase();
    const filter = /^[\w\-.+]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4}$/;
    this.setState({
      error: '',
      loading: true
    });
    if (!email || !filter.test(email)) {
      this.setState({
        error: 'Please enter a valid email',
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
        if (res.done) {
          this.setState({ rsuccess: `Your password has been sent to ${email}` })
          jsCookie.set("rsuccess", `Your password has been sent to ${email}`)
          setTimeout(() => {
            this.props.router.push("/dashboard")
          }, 3000);
        } else {


          this.setState({
            error: res.data.message,
            loading: false
          });
        }
      });
    } else {
      this.setState({
        error: 'Captcha verification failed. Please try again.',
        loading: false
      });

    }
  }
    setTerms() {
      this.setState({
        tos: !this.state.tos,
      });
    }

    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    render() {
      const { email, tos, error } = this.state;
      let referral = jsCookie.get("referral") ?jsCookie.get("referral").slice(1).split("=")[1]: null;

      return (
        <section id="main">
          <div className="row " style={{ padding: "60px 0px 30px" }}>
            <div className="col-md-4 offset-md-4">
              <div className="text-center login-form">
                {error && (
                  <div className="error alert alert-danger">{error}</div>
                )}
                {this.state.rsuccess !== "" ? <div className="alert alert-success">{this.state.rsuccess} </div> : null}
                <div className="success" id="successDiv" />
                <form>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Your password will be sent to this email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label >{this.state.question}</label>
                    <input
                      type="number"
                      className="form-control"
                      id="captcha1"
                      placeholder="Enter the answer here"
                      name="captcha1"
                      value={this.state.captcha1}
                      onChange={this.onChange}
                    />
                  </div>
                  {referral?
                    <div className="form-group">
                      <p style={{fontSize:"small" }}><i><b><font color="FF6A00">Referral</font></b></i></p>
                      <input
                        id=""
                        disabled
                        type="text"
                        name="referral"
                        value={referral}
                      />
                    </div>:
                    <div className="form-group">
                      <label style={{fontSize:"small" }}><i><b><font color="FF6A00">Referral</font></b></i></label>
                      <input
                        id="referralCode"
                        className="form-control"
                        type="text"
                        name="referralCode"
                        placeholder= "Optional"
                        onChange={this.onChange}
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
                      /> I agree with the&nbsp;&nbsp;
                                  <a href="https://coinrewards.org/blog/Terms-of-Use-and-Privacy-Policy">
                        <u>Terms of Service</u>
                      </a>.
                                </label>
                  </div>

                  <div className="text-center but-div">
                  {/* <center> <Captcha
                    sitekey='6LdUlpYUAAAAAJfpbB2j74ZY4X5DTbhF0HtqmXI3'
                    lang='en'
                    theme='light'
                    type='image'
                    callback={(value) => this.setState({ rvalue: value }, () => this.crecaptcha(value))} /></center> */}
                    {this.state.loading?
                      <button onClick={this.signUp} id="registerBtn"
                      className="position-relative cmn-btn-disabled newbtnStyle"
                      disabled= {this.state.loading}
                      >Create Account
                        <div className= "spinner-wrapper">
                          <div className="spinner-border text-success" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </button> :
                      <button onClick={this.signUp} id="registerBtn"
                      className="position-relative cmn-btn newbtnStyle"
                      disabled= {false}
                      >Create Account
                      </button>

                    }
                </div>
                </form>

                <div className="text-center">
                  <br />
                  <p>Already Registered?</p>
                  <div className="but-div">
                    <a href="/login">
                      <button className="cmn-btn newbtnStyle">Login Now</button>
                    </a>
                  </div>
                  <br />
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
                </div>

              </div>
            </div>
          </div>
        </section>
      )
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth,
  });
  export default connect(mapStateToProps, { registerUser })(withRouter(Register));;
