import React, { Component } from 'react';
import { connect } from 'react-redux';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import swal from 'sweetalert2';
import { addSite, addSite2 } from '../../lib/actions/userAction';


class Broker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      error: '',
      tos: false,
      captcha: '',
      answer: "", captcha1: '',
      question: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
  }
  componentDidMount() {
    this.gen()
  }

  gen() {
    console.log("kdlask")
    var x = Math.round(Math.random() * 6) + 1
    var y = Math.round(Math.random() * 6) + 1;
    var question = `What is ${Math.floor(x)} x ${Math.floor(y)} ?`;
    var answer = Math.floor(x) * Math.floor(y);
    this.setState({ answer, question })
    return "question"
  }
  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e, type) {
    e.preventDefault();
    this.setState({
      error: ''
    });
    if ((this.state.answer === parseInt(this.state.captcha1)) && this.state.tos) {
      if (type === 'new') {
        const filter = /^[\w\-.+]+@[a-zA-Z0-9.-]+\.[a-zA-z0-9]{2,4}$/;
        if (!this.state.username || !this.state.email) {
          this.setState({
            error: 'Please fill all fields'
          });
          return;
        }
        if (!filter.test(this.state.email)) {
          this.setState({
            error: 'Please input a valid email address'
          });
          return;
        }
        this.props
          .addSite2({
            email: this.state.email,
            username: this.state.username,
            siteName: this.props.page.subPage,
            siteType: this.props.page.currentPage
          })
          .then((res) => {
            if (res.success) {
              console.log(res)
              swal({
                title: 'Success',
                html: 'Site added successfully!',
                type: 'success',
                allowOutsideClick: false
              });
              if (res.res.data.type === "new") {
                jsCookie.set("rsuccess", `Your password has been sent to ${res.res.data.email}`)
                setTimeout(() => {
                  Router.push("/dashboard")
                }, 2000);
              }
            } else {
              console.log(res)

              swal({
                title: 'Error',
                html: res.response.data.message,
                type: 'error',
                allowOutsideClick: false
              });
            }
          });
      } else {
        if (!this.state.username) {
          this.setState({
            error: 'Please enter your username'
          });
          return;
        }
        this.props
          .addSite({
            email: this.props.auth.user.email,
            username: this.state.username,
            siteName: this.props.page.subPage,
            siteType: this.props.page.currentPage
          })
          .then((res) => {
            if (res) {
              swal({
                title: 'Success',
                html: 'Site added successfully!',
                type: 'success',
                allowOutsideClick: false
              });
            } else {
              swal({
                title: 'Error',
                html: 'You already added this. Please hold for confirmation or contact support@coinrewards.org',
                type: 'error',
                allowOutsideClick: false
              });
            }
          });
      }
    } else {
      swal({
        title: 'Error',
        html: this.state.tos === false ? "Please accept our terms of service before continuation" : 'Captcha validation failed',
        type: 'error',
        allowOutsideClick: false
      });
    }
  }
  onSubmit2(e, type) {
    e.preventDefault();
    this.setState({
      error: ''
    });

    if (!this.state.username) {
      this.setState({
        error: 'Please enter your username'
      });
      return;
    }
    this.props
      .addSite({
        email: this.props.auth.user.email,
        username: this.state.username,
        siteName: this.props.page.subPage,
        siteType: this.props.page.currentPage
      })
      .then((res) => {
        if (res) {
          swal({
            title: 'Success',
            html: 'Site added successfully!',
            type: 'success',
            allowOutsideClick: false
          });
        } else {
          swal({
            title: 'Error',
            html: 'You already added this name. Please hold for confirmation or contact support@coinrewards.org',
            type: 'error',
            allowOutsideClick: false
          });
        }
      });
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { error } = this.state;
    return (
      <section id="main" className="poker">
        <div className="container">
        <div className="row text-left">
            <div className="col-md-8">
            <div>
            <ul className="" style={{ padding: "20px",textAlign:"left",fontSize:"small", float:"left", width:"49%" }}>
                      <li><b>√</b>&nbsp;&nbsp;22% Fee Rebate (Exclusive)<font color="red"><b>*</b></font></li>
                      <li><b>√</b>&nbsp;&nbsp;Up to 100x Leverage</li>
                      <li><b>√</b>&nbsp;&nbsp;0% fees on non-margin trades</li>
                      <li><b>√</b>&nbsp;&nbsp;API</li>
                    </ul>
                    <ul className="" style={{ padding: "20px",textAlign:"left",fontSize:"small", float:"left", width:"49%" }}>
                    <li><b>√</b>&nbsp;&nbsp;USA Welcomed</li>
                    <li><b>√</b>&nbsp;&nbsp;Forex, Commodities, Stocks, Indices, Cryptos</li>
                    <li><b>√</b>&nbsp;&nbsp;Social Trading: Copy users</li>
                    </ul>
              </div>
            </div>
            <div className="col-md-4" style={{ textAlign: "center", minHeight: '0' }}>
            <a target="_blank" href="https://1broker.com/?r=55129">
              <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/1broker.png"  style={{ width: "35%", marginTop: '18px' }} />
</a>
            </div>


         <div className="col-md-4">
              <h4 style={{ marginTop: '0px' }}>Step 1 </h4>
              <p
                style={{
                  marginTop: '0px',
                  textAlign: 'justify',
                  padding: '25px',
                  fontSize: 'small'
                }}
              >
                Please clear your browsers’ cookies.
              </p>
              <div>
                <a
                  target="_blank"
                  href="https://1broker.com/?r=55129"
                  className="cmn-btn newAStyle"
                  // style={{
                  //   padding: '5px',
                  //   border: '10px solid brown',
                  //   borderRadius: '20px',
                  //   backgroundColor: 'green',
                  //   color: 'white',
                  //   fontWeight: '15px',
                  //   fontSize: '20px'
                  // }}
                >
                  Visit Exchange
                </a>
              </div>
              <p
                style={{
                  marginTop: '0px',
                  textAlign: 'justify',
                  padding: '25px',
                  fontSize: 'small'
                }}
              >
                <b>Important</b>: Make sure to use the provided link or else
                you will not qualify for our exclusive rewards.
              </p>
            </div>
            <div className="col-md-4">
              <h4 style={{marginTop: '0px'}}>Step 2 </h4>
              <p style={{marginTop: '0px', textAlign: 'center', padding: '25px', fontSize:"small" }}>
              Please make sure you see referrer <b>55129</b> at the bottom left corner of your registration form:
              </p>
              <a target="_blank" href="https://1broker.com/?r=55129">
              <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-1broker-rebate-fee-return-signup-form.png" height="auto" width="320px" />
              </a>
              <br />
              <br />
            </div>
            <div className="col-md-4 step-3">
            <h4 style={{marginTop: '0px'}}>Step 3</h4>
            <p style={{paddingTop: '25px', fontSize:"small" }}>To ensure you are properly tracked:</p>
            <br />
              <p style={{marginTop: '0px', fontSize:"small" }}>Verify Your <a href="https://1broker.com/?r=55129"><font color="#1070E0"><b>1Broker</b></font></a> Login Email</p>
              {error && (
                <div className="error">{error}</div>
              )}
              <input
                style={{height: '27px', width: '70%'}}
                id="signupUsername"
                type="text"
                name="username"
                placeholder="Enter 1Broker Email"
                value={this.state.username}
                onChange={this.onChange}
              />
              <br />
              {!isAuthenticated ? (
                <div>
                  <p style={{fontSize:"small" }}>Join <i><b><font color="FF6A00">BTC Grinders</font></b></i></p>
                  <input
                    style={{height: '27px', width: '70%'}}
                    id="signupEmail"
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <div className="form-group" style={{marginBottom: '0px'}}>
                    <label >{this.state.question}</label>
                    <input
                      style={{height: '27px', width: '70%', marginLeft: '53px'}}
                      type="number"
                      className="form-control"
                      id="captcha1"
                      placeholder="captcha"
                      name="captcha1"
                      value={this.state.captcha1}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                    <input className="form-check-input" name="tos" style={{left: '63px', top: '0px'}} onChange={() => this.setState({ tos: !this.state.tos })} type="checkbox" />I agree with the <a href="/blog/Terms-of-Use-and-Privacy-Policy"><u>Terms of Service</u></a>.
                    </label>
                  </div>
                  <div className="but-div">
                    <button
                      id="signupButton"
                      onClick={e => this.onSubmit(e, 'new')}
                      className="cmn-btn newbtnStyle"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              ) : (
                  <div className="but-div">
                    <button
                      id="signupButton"
                      onClick={e => this.props.auth.isAuthenticated ? this.onSubmit2(e, 'old') : this.onSubmit(e, 'old')}
                      className="cmn-btn newbtnStyle"
                    >
                      Add site
                    </button>
                  </div>
                )}
            </div>

            <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ padding: '10px 12px 10px 10px' }}>
          <h1 className="my-4">
          {/* Back Like They Never Left */}
            {/* <small>Secondary Text</small> */}
          </h1>
          <div className="card mb-4 boxshadow" style={{padding: '15px', marginTop: "-23px" }}>
          <div className="col-md-12">
          <p style={{marginTop: '0px', textAlign: 'justify', padding: '0px', fontSize:"small" }}>
          <font color="red"><b>*</b></font>22% fee discount does not apply when trades are made using the "Social Trading" feature.
          </p>
          <br /><br />
          <p style={{marginTop: '0px', textAlign: 'center', padding: '0px' }}>
          <b>Instantly Margin Trade Forex, Stocks, Commodities, and Indices (Up to 100x Leverage)</b>
          </p>
          <br />
          <a target="_blank" href="https://1broker.com/?r=55129">
          <img style={{width:"90%", height:"auto" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-1broker-rebate-fee-return-derivatives-leverage-margin-more-info.png" alt="1Broker Rebate Fee Return Derivatives Leverage Margin More Info" />
          </a>
          <br /><br /><br />
          <p style={{marginTop: '0px', textAlign: 'center', padding: '0px' }}>
          <b>Providing "bullet-proof" Software Since 2012</b>
          </p>
          <br />
          <a target="_blank" href="https://1broker.com/?r=55129">
          <img style={{width:"90%", height:"auto" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-1broker-rebate-fee-return-derivatives-leverage-margin-info.png" alt="1Broker Rebate Fee Return Derivatives Leverage Margin Info" />
          </a>
          <br />
            </div>
            <div className="card-body">
              {/* <a href="https://static.nytimes.com/email-content/MSB_2515.html?nlid=77721223" className="btn btn-primary">Read More &rarr;</a> */}
            </div>
            {/* <div className="card-footer text-muted">
              Posted on January 1, 2017 by
              <a href="#">New York Times</a>
            </div>            */}

            </div>
            </div>




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
  admin: state.admin,
  page: state.pageInfo
});

export default connect(mapStateToProps, { addSite, addSite2})(Broker);
