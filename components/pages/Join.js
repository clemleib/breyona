import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import swal from 'sweetalert2';
import queryString from 'query-string';
import { addSite, addSite2 } from '../../lib/actions/userAction';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      error: '',
      tos: false,
      captcha: '',
      answer: "", captcha1: '',
      question: '',
      referralCode: null,
      currentPage: null,
      subPage: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
  }
  componentWillMount() {

    //console.log(this.props.router.query.noscript);
    const splitPath = this.props.router.pathname.trim().split("/");
    let { currentPage, subPage } = this.state;
    if (splitPath[1] !== "_error") {
      currentPage = splitPath[1] ? splitPath[1].toLocaleLowerCase() : "";
      subPage = splitPath[2] ? splitPath[2].toLocaleLowerCase() : "";
      //console.log("path stuff ===> ",{currentPage ,subPage});
      this.setState({
        currentPage,
        subPage,
      })
    }
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
        if (!this.state.username || !this.state.email) {
          /*this.setState({
            error: 'Please fill all fields'
          });*/
          swal.fire({
            title: 'Error',
            text: 'Please fill all fields',
            type: 'error',
            allowOutsideClick: false
          });
          return;
        }
        if (!filter.test(this.state.email)) {
          /*this.setState({
            error: 'Please input a valid email address'
          });*/
          swal.fire({
            title: 'Error',
            text: 'Please input a valid email address',
            type: 'error',
            allowOutsideClick: false
          });
          return;
        }
        if (!this.state.currentPage) {

          swal.fire({
            title: 'Error',
            text: 'cann\'t detect site type',
            type: 'error',
            allowOutsideClick: false
          });
          return;
        }
        this.props
          .addSite2({
            email: this.state.email,
            username: this.state.username,
            siteName: this.props.page.subPage,
            siteType: this.state.currentPage,
            referral
          })
          .then((res) => {
            if (res.success) {
              console.log(res)
              swal.fire({
                title: 'Success',
                html: 'Site added successfully!',
                type: 'success',
                allowOutsideClick: false
              });
              if (res.res.data.type === "new") {
                jsCookie.set("rsuccess", `Your password has been sent to ${res.res.data.email}`)
                setTimeout(() => {
                  //Router.push("/dashboard")
                  window.location.href = "/dashboard";
                }, 2000);
              }
            } else {
              console.log(res)

              swal.fire({
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
        if (!this.state.currentPage) {
          this.setState({
            error: 'cann\'t detect site type'
          });
          return;
        }
        this.props
          .addSite({
            email: this.props.auth.user.email,
            username: this.state.username,
            siteName: this.props.page.subPage,
            siteType: this.state.currentPage
          })
          .then((res) => {
            if (res) {
              swal.fire({
                title: 'Success',
                html: 'Site added successfully!',
                type: 'success',
                allowOutsideClick: false
              }).then(() => {
                window.location.href = "/home"
              });
              window.location.href = '/home'
            } else {
              swal.fire({
                title: 'Error',
                html: 'You already added this name. Please hold for confirmation or contact support@coinrewards.org',
                type: 'error',
                allowOutsideClick: false
              });
            }
          });
      }
    } else {
      swal.fire({
        title: 'Error',
        html: this.state.tos === false ? "Please agree with the Terms of Service" : 'Captcha validation failed',
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
    if (!this.state.currentPage) {
      this.setState({
        error: 'cann\'t detect site type'
      });
      return;
    }

    console.log("ser =>", {
      email: this.props.auth.user.email,
      username: this.state.username,
      siteName: this.props.page.subPage,
      siteType: this.state.currentPage
    });
    this.props
      .addSite({
        email: this.props.auth.user.email,
        username: this.state.username,
        siteName: this.props.page.subPage,
        siteType: this.state.currentPage
      })
      .then((res) => {
        if (res) {
          swal.fire({
            title: 'Success',
            html: 'Site added successfully!',
            type: 'success',
            allowOutsideClick: false
          }).then(() => {
            window.location.href = "/home"
          });
        } else {
          swal.fire({
            title: 'Error',
            html: 'You already added this. Please hold for confirmation or contact support@coinrewards.org',
            type: 'error',
            allowOutsideClick: false
          });
        }
      });
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const { error } = this.state;
    let referral = jsCookie.get("referral") ? queryString.parse(jsCookie.get("referral")).ref : null;
    return (
      <div className="col-md-4 step-3 ">
        <h4 style={{ marginTop: '0px' }}>Step 3</h4>
        <p style={{ paddingTop: '25px', fontSize: "small" }}>To ensure you are properly tracked:</p>
        <br />
        <p style={{ marginTop: '0px', fontSize: "small" }}>{this.props.children}</p>
        {error && (
          <div className="error">{error}</div>
        )}
        <input
          style={{ height: '27px', width: '70%', margin: "0 auto" }}
          id="signupUsername"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
        />
        <br />
        {!isAuthenticated ? (
          <div>
            {referral ?
              <React.Fragment>
                <p style={{ fontSize: "small", marginTop: 5 }}><i><b><font color="FF6A00">Referral Code</font></b></i></p>
                <input
                  style={{ height: '27px', width: '70%' }}
                  id=""
                  disabled
                  type="text"
                  name="referral"
                  value={referral}
                />
              </React.Fragment> :
              <React.Fragment>
                <label style={{ fontSize: "small", marginTop: 5 }}><i><b><font color="FF6A00">Referral Code</font></b></i> (optional)</label>
                <input
                  style={{ height: '27px', width: '70%' }}
                  id="referralCode"
                  type="text"
                  name="referralCode"
                  onChange={this.onChange}
                />
              </React.Fragment>
            }
            <p style={{ fontSize: "small" }}>Join <i><b><font color="FF6A00">BTC Grinders</font></b></i></p>
            <input
              style={{ height: '27px', width: '70%' }}
              id="signupEmail"
              type="text"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <div className="form-group" style={{ marginBottom: '0px' }}>
              <label >{this.state.question}</label>
              <input
                style={{ height: '27px', width: '70%', marginLeft: '53px' }}
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
                <input className="form-check-input" name="tos" style={{ left: '63px', top: '0px' }} onChange={() => this.setState({ tos: !this.state.tos })} type="checkbox" />I agree with the <a href="/blog/Terms-of-Use-and-Privacy-Policy"><u>Terms of Service</u></a>.
              </label>
            </div>
            <div className="but-div" style={{ marginBottom: 20, marginTop: 10 }}>
              <button
                id="signupButton"
                onClick={e => this.onSubmit(e, 'new')}
                className="cmn-btn newbtnStyle"
              >
                Join!
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
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  page: state.pageInfo
});

export default withRouter(connect(mapStateToProps, { addSite, addSite2 })(Join));