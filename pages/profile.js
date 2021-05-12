import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { editUser } from '../lib/actions/userAction';
import apiUrl from "../lib/config"
/**
 * Profile Component
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberOf Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: false,
      user: this.props.auth.user,
      userDetails: {},
      lname: '',
      fname: '',
      streetAddress: '',
      btcAddress: '',
      password: '',
      passwordConfirmation: '',
      username: '',
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  /**
   * Loads user's details on load
   * @method componentDidMount
   * @returns {void}
   * @memberOf DaProfilehboard
   */
  componentDidMount() {
    axios.get(`${apiUrl}/api/users/${this.state.user.uuid}`).then(({ data }) => {
      this.setState({
        userDetails: data,
        lname: data.lname,
        fname: data.fname,
        streetAddress: data.streetAddress,
        btcAddress: data.btcAddress,
        username: data.username,
        email: data.email
      });
    });
  }

  /**
   * Handles change event
   * @param {any} e
   * @returns {void}
   * @memberOf Admin
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editProfile() {
    this.setState({
      form: true
    });
  }

  cancelChanges() {
    const { userDetails } = this.state;
    this.setState({
      form: false,
      lname: userDetails.lname,
      fname: userDetails.fname,
      streetAddress: userDetails.streetAddress,
      btcAddress: userDetails.btcAddress,
      username: userDetails.username,
      email: userDetails.email,
      password: '',
      passwordConfirmation: ''
    });
  }

  saveChanges() {
    const {
      email,
      username,
      fname,
      lname,
      btcAddress,
      streetAddress,
      password,
      passwordConfirmation
    } = this.state;

    if (password) {
      if (password !== passwordConfirmation) {
        this.setState({
          errors: {
            passwordConfirmation: 'Password does not match'
          }
        });
      } else {
        const data = {
          fname,
          lname,
          btcAddress,
          streetAddress,
          password,
          passwordConfirmation
        };
        this.props.editUser(this.state.user.uuid, data).then((res) => {
          if (res) {
            swal.fire({
              title: 'Success',
              html: 'Profile edited successfully!',
              type: 'success',
              allowOutsideClick: false
            }).then(() => {
              axios
                .get(`${apiUrl}/api/users/${this.state.user.uuid}`)
                .then(({ data }) => {
                  this.setState({
                    userDetails: data,
                    lname: data.lname,
                    fname: data.fname,
                    streetAddress: data.streetAddress,
                    btcAddress: data.btcAddress,
                    username: data.username,
                    email: data.email,
                    form: false
                  });
                });
            });
          } else {
            swal.fire({
              title: 'Error',
              html: 'There is an error with your request. Please try again',
              type: 'error',
              allowOutsideClick: true
            });
          }
        });
      }
    } else {
      const data = {
        fname,
        lname,
        btcAddress,
        streetAddress
      };
      this.props.editUser(this.state.user.uuid, data).then((res) => {
        if (res) {
          swal.fire({
            title: 'Success',
            html: 'Profile edited successfully!',
            type: 'success',
            allowOutsideClick: false
          }).then(() => {
            axios.get(`${apiUrl}/api/users/${this.state.user.uuid}`).then(({ data }) => {
              this.setState({
                userDetails: data,
                lname: data.lname,
                fname: data.fname,
                streetAddress: data.streetAddress,
                btcAddress: data.btcAddress,
                username: data.username,
                email: data.email,
                form: false
              });
            });
          });
        } else {
          swal.fire({
            title: 'Error',
            html: 'There is an error with your request. Please try again',
            type: 'error',
            allowOutsideClick: true
          });
        }
      });
    }
  }

  /**
   * Renders the Profile Component
   * @method render
   * @returns {void}
   * @memberOf Profile
   */
  render() {
    const {
      errors,
      form,
      email,
      username,
      fname,
      lname,
      btcAddress,
      streetAddress,
      password,
      passwordConfirmation
    } = this.state;
    return (
      <div>
        <div className="uk-container uk-container-small uk-position-relative p0">
          <section id="1" className="b-profile">
            <div className="uk-section uk-section-default">
              <div className="uk-container">
                <h3 className="bb">
                  {form ? 'EDIT PROFILE' : 'PROFILE OVERVIEW'}
                </h3>
                {form ? (
                  <div className="">
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        First Name:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="fname"
                          value={fname}
                          onChange={this.onChange}
                          className="uk-input"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <span>{errors.fname && errors.fname}</span>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Last Name:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="lname"
                          value={lname}
                          onChange={this.onChange}
                          className="uk-input"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                      <span>{errors.lname && errors.lname}</span>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Street Address:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="streetAddress"
                          value={streetAddress}
                          onChange={this.onChange}
                          className="uk-input"
                          type="text"
                          placeholder="Street Address"
                        />
                      </div>
                      <span>
                        {errors.streetAddress && errors.streetAddress}
                      </span>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        BTC Address:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="btcAddress"
                          value={btcAddress}
                          onChange={this.onChange}
                          className="uk-input"
                          type="text"
                          placeholder="Bitcoin Address"
                        />
                      </div>
                      {errors.btcAddress && errors.btcAddress}
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Password:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="password"
                          value={password}
                          onChange={this.onChange}
                          className="uk-input"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <span>{errors.password && errors.password}</span>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Confirm Password:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="passwordConfirmation"
                          value={passwordConfirmation}
                          onChange={this.onChange}
                          className="uk-input"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <span>
                        {errors.passwordConfirmation &&
                          errors.passwordConfirmation}
                      </span>
                    </div>
                    <p className="uk-text-right">
                      <button
                        className="uk-button uk-button-default uk-modal-close"
                        type="button"
                        onClick={this.cancelChanges}
                      >
                        Cancel
                      </button>
                      <button
                        className="uk-button uk-button-primary"
                        type="button"
                        onClick={this.saveChanges}
                      >
                        Save
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="">
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        First Name:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="fname"
                          value={fname}
                          className="uk-input"
                          type="text"
                          placeholder="First Name"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Last Name:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="lname"
                          value={lname}
                          className="uk-input"
                          type="text"
                          placeholder="Last Name"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Username:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="username"
                          value={username}
                          className="uk-input"
                          type="text"
                          placeholder="Username"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Email:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="email"
                          value={email}
                          className="uk-input"
                          type="text"
                          placeholder="Email"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        Street Address:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="streetAddress"
                          value={streetAddress}
                          className="uk-input"
                          type="text"
                          placeholder="Street Address"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <p style={{ display: 'block', marginBottom: '10px' }}>
                        BTC Address:{' '}
                      </p>
                      <div className="uk-inline">
                        <span className="uk-form-icon" uk-icon="icon: user" />
                        <input
                          name="btcAddress"
                          value={btcAddress}
                          className="uk-input"
                          type="text"
                          placeholder="Bitcoin Address"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="uk-margin">
                      <div className="uk-inline">
                        <p className="uk-text-right">
                          <button
                            className="uk-button uk-button-primary"
                            type="button"
                            onClick={this.editProfile}
                          >
                            Edit profile
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

Profile.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired
  }).isRequired
};

export default connect(mapStateToProps, { editUser })(Profile);
