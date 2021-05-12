import React, { Component } from 'react';
import { withRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import apiUrl from '../lib/config';

class Confirmtoken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 7,
      success: '',
      error: '',
      response: false
    };
  }

  async componentWillMount() {
    const token = this.props.router.query.token;
    if (token) {
      try {
        await jwt.decode(token, 'aaaa123');
        axios
          .post(`${apiUrl}/api/finance/confirm-payout${window.location.search}`)
          .then(res => {
            console.log(res);
            if (res.data.success) {
              this.setState({
                response: true,
                success: res.data.success
              });
            } else this.setState({ response: true, error: res.data.error });
          })
          .catch(err => {
            this.setState({
              response: true,
              error: 'An error has occured'
            });
            window.location.assign('/');
          });
      } catch (e) {
        this.props.router.push('/');
      }
    } else {
      this.props.router.push('/');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ count: this.state.count - 1 });
      setTimeout(() => {
        this.setState({ count: this.state.count - 1 });
        setTimeout(() => {
          this.setState({ count: this.state.count - 1 });
          setTimeout(() => {
            this.setState({ count: this.state.count - 1 });
            setTimeout(() => {
              this.setState({ count: this.state.count - 1 });
              window.location.assign('/');
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  render() {
    return this.state.response ? (
      <div>
        {/* <Navbar /> */}

        <div className="row" style={{ margin: '0px' }}>
          <div
            className="col-sm-6 offset-sm-3"
            style={{ padding: '100px 0px 100px', textAlign: 'center' }}
          >
            <h5 className="pay-text">
              {' '}
              {this.state.success || this.state.error}
            </h5>
            <p>
              {this.state.error ? 'Withdrawal request was not succesful' : null}
              {this.state.success
                ? 'Congratulations! your withdrawal request has successfully been sent for approval'
                : null}
            </p>
            <div>
              {this.state.success ? (
                <i
                  className="material-icons green-text"
                  style={{ fontSize: '5em' }}
                >
                  check_circle
                </i>
              ) : (
                <i
                  className="material-icons green-text "
                  style={{ fontSize: '5em' }}
                >
                  close
                </i>
              )}
            </div>
            <div>Redirecting {this.state.count}</div>
          </div>
        </div>
        <style>
          {`
                    body{
                        //  background:linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.1)),url('../../images/EventsHeader.jpg');
                        background:#fff;
                        background-size:cover
                    
                    }
                 
                    input.soon::placeholder{
                        color:#eee
                    }
                    .pay-text{
                        font-size:3.3em;
                        font-weight:800;
                    }
                `}
        </style>
        {/* <Footer /> */}
      </div>
    ) : (
      <div
        className=""
        style={{ padding: '100px 0px', width: '10%', margin: 'auto' }}
      >
        <i className="fa fa-spin fa-spinner fa-3x" />
      </div>
    );
  }
}

export default withRouter(Confirmtoken);
