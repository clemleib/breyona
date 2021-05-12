import React, { Component } from 'react'; //
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import axios from 'axios';
import loginAction from '../lib/actions/loginAction';
import apiUrl from "../lib/config"
/**
 * Login component
 * @class Login
 * @extends {Component}
 */
class PasswordReset extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberOf Login
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: '',
      errors: {},
      passwordConfirmation: '',
      success: '',
      legit: false,
      legitError: '',
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.router.push('/');
    }
    const { token, email } = this.props.router.query;
    if (!token || !email) {
      this.props.router.push('/');
    } else {
      this.setState({
        email
      });
      axios.get(`${apiUrl}/api/users/reset/confirm?token=${token}&email=${email}`).then(
        () => {
          this.setState({
            legit: true
          });
        },
        () => {
          this.setState({
            legitError:
              'Opps something went wrong....Please try resetting your password again.'
          });
        }
      );
    }
  }

  /**
   * Handles form change
   * @param {any} e
   * @returns {void}
   * @memberOf Login
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      error: ''
    });
    const { password, email, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      this.setState({
        error: 'Password does not match'
      });
    } else {
      axios
        .post(`${apiUrl}/api/users/reset/change`, {
          password,
          email,
          passwordConfirmation
        })
        .then(() => {
          this.setState({
            success: 'Password reset successful. You can login now'
          });
        });
    }
  }

  /**
   * Renders the component
   * @method render
   * @returns {void}
   * @memberOf Login
   */
  render() {
    const {
      error,
      errors,
      identifier,
      password,
      passwordConfirmation,
      login,
      register,
      forgotPassword,
      success,
      legit,
      legitError
    } = this.state;
    return (
      <div>
        <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
          <nav
            className="uk-navbar-container"
            uk-navbar={true.toString()}
            style={{ position: 'relative', zIndex: 980 }}
          >
            <div className="uk-navbar-left">
              <a className="uk-navbar-item uk-logo" href="#">
                <img src="/imgs/cryto-logo.png" alt="logo" />
              </a>
            </div>
          </nav>
        </div>
        <div
          className="uk-background-blend-overlay uk-background-primary uk-background-cover bg-height uk-panel uk-flex uk-flex-center uk-flex-middle"
          style={{ backgroundImage: 'url(/imgs/header_bg.jpg)' }}
        >
          <div className="">
            <div
              className="uk-child-width-1-2@s uk-child-width-1-2@m uk-child-width-1-3@l uk-text-center uk-flex-center uk-flex-middle"
              uk-grid={true.toString()}
            >
              <div className="p30 login-card">
                {legitError && (
                  <div className="mt-20">
                    <div className="uk-margin">
                      <div className="uk-inline">
                        <div
                          className="uk-alert-danger"
                          uk-alert={true.toString()}
                        >
                          <p>{legitError}</p>
                        </div>
                      </div>
                    </div>
                    <div className="uk-margin">
                      <div className="uk-inline">
                        <Link to="/" href="/">
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {legit && (
                  <div className="uk-card uk-card-large uk-card-body">
                    <img src="/imgs/user.png" alt="user-logo" />
                    {error && (
                      <div className="mt-20">
                        <div className="uk-margin">
                          <div className="uk-inline">
                            <div
                              className="uk-alert-danger"
                              uk-alert={true.toString()}
                            >
                              <p>{error}</p>
                            </div>
                          </div>
                        </div>
                        <div className="uk-margin">
                          <div className="uk-inline">
                            <Link to="/" href="/">
                              Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    {success && (
                      <div className="uk-margin">
                        <div className="uk-inline">
                          <div
                            className="uk-alert-success"
                            uk-alert={true.toString()}
                          >
                            <p>{success}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {!success && (
                      <div className="mt-20">
                        <div className="uk-margin">
                          <div className="uk-inline">
                            <span
                              className="uk-form-icon"
                              uk-icon="icon: lock"
                            />
                            <input
                              name="password"
                              value={password}
                              onChange={this.onChange}
                              className="uk-input"
                              type="password"
                              placeholder="New Password"
                            />
                          </div>
                        </div>
                        <div className="uk-margin">
                          <div className="uk-inline">
                            <span
                              className="uk-form-icon"
                              uk-icon="icon: lock"
                            />
                            <input
                              name="passwordConfirmation"
                              value={passwordConfirmation}
                              onChange={this.onChange}
                              className="uk-input"
                              type="password"
                              placeholder="Confirm New Password"
                            />
                          </div>
                        </div>
                        <div className="uk-margin">
                          <div className="uk-inline">
                            <button
                              className="uk-button uk-button-primary btn-border"
                              onClick={this.onSubmit}
                            >
                              Reset Password
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {success && (
                      <div className="uk-margin">
                        <div className="uk-inline">
                          <Link to="/" href="/">
                            Login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="uk-container uk-flex uk-flex-middle login-footer">
          <p>
            Copyright &copy; {new Date().getFullYear()} Cryptobitloco.
            &nbsp;All&nbsp;rights reserved. &nbsp;
          </p>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  auth: state.auth
});

PasswordReset.propTypes = {
  loginAction: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapPropsToState, { loginAction })(withRouter(PasswordReset));
