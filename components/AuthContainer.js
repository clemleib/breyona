import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Auth container class
 * @class AuthContainer
 * @extends {Component}
 */
class AuthContainer extends Component {
  /**
   * Creates an instance of AuthContainer.
   * @param {any} props
   * @memberOf AuthContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.auth.isAuthenticated,
      user: this.props.auth.user
    };
    // if (this.props.location.search) {
    //   window.localStorage.setItem("referral", this.props.location.search);
    // }
  }

  /**
   * Fired when component will receive new props
   * @param {any} nextProps
   * @returns {void}
   * @memberOf AuthContainer
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user
    });
  }

  /**
   * Renders the Auth component
   * @returns {void}
   * @memberOf AuthContainer
   */
  render() {
    const { name, Comp, path } = this.props;
    const { isAuthenticated, user } = this.state;
    if (name === 'login' && isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else if (name === 'login' && !isAuthenticated) {
      return <Route exact path={path} render={() => <Comp />} />;
    } else if (name === 'reset' && isAuthenticated) {
      return <Redirect to="/dashboard" />;
    } else if (name === 'reset' && !isAuthenticated) {
      return <Route exact path={path} render={() => <Comp />} />;
    } else if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else if (isAuthenticated) {
      if (
        name === 'admin' ||
        name === 'users' ||
        name === 'search' ||
        name === 'types' ||
        name === 'students'
      ) {
        if (user.roleId !== 1) {
          return <Redirect to="/dashboard" />;
        }
        return (
          <Route
            exact
            path={path}
            render={() => <Comp />}
          />
        );
      }
      return (
        <Route
          exact
          path={path}
          render={() => <Comp />}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// AuthContainer.propTypes = {
//   auth: PropTypes.shape({
//     isAuthenticated: PropTypes.bool.isRequired,
//     user: PropTypes.shape({}).isRequired
//   }).isRequired,
//   name: PropTypes.string.isRequired,
//   Comp: PropTypes.func.isRequired,
//   path: PropTypes.string.isRequired
// };

export default connect(mapStateToProps, {})(withRouter(AuthContainer));
