import React, { Component } from 'react';
import Join from "../../components/pages/Join";

export default class CoinTracking extends Component {
  render() {
    return (
      <section id="main" className="poker">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div>
                <ul
                  className=""
                  style={{
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: 'small',
                    float: 'left',
                    width: '49%'
                  }}
                >
                  <li>■ Cryptocurrency Tracking and Reports</li>
                  <li>■ Easily Import/Export Exchange Data</li>
                  <li>■ API</li>
                  <li>■ Historical Data for 5710+ Cryptos</li>
                </ul>
                <ul
                  className=""
                  style={{
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: 'small',
                    float: 'left',
                    width: '49%'
                  }}
                >
                  <li>■ 10% Rebate (Exclusive)</li>
                  <li>■ 300,000+ Users</li>
                  <li>■ Tax Compliance and Guidelines</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/cointracking.png"
                style={{ width: '50%', marginTop: '5px' }}
              />
            </div>
          </div>
          <div className="row text-left">
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
                  href="https://coinrewards.org/?ref=cotes5"
                  className="cmn-btn newAStyle"
                >
                  Visit Site
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
                <b>Important</b>: Be sure to use the provided link or else you
                will not qualify for our exclusive rebate.
              </p>
            </div>
            <div className="col-md-4">
              <h4 style={{ marginTop: '0px' }}>Step 2 </h4>
              <p
                style={{
                  marginTop: '0px',
                  textAlign: 'justify',
                  padding: '25px',
                  fontSize: 'small'
                }}
              >
                After touring the site, charts and features, signup for a free
                account:
              </p>
              <a target="_blank" href="https://cointracking.info?ref=T782299">
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cointracking-exclusive-lifetime-discount-form1.png"
                  height="auto"
                  width="320px"
                />
              </a>
            </div>
            <Join>
              Verify Username
            </Join>
            <div className="container">
              <div className="row">
                <div className="col-md-12" style={{ padding: '10px 12px 10px 10px' }}>
                  <h1 className="my-4">
                    {/* Back Like They Never Left */}
                    {/* <small>Secondary Text</small> */}
                  </h1>
                  <div
                    className="card mb-4 boxshadow"
                    style={{ padding: '15px', marginTop: '-23px' }}
                  >
                    <div className="col-md-12">
                      <p
                        style={{
                          marginTop: '0px',
                          textAlign: 'center',
                          padding: '0px'
                        }}
                      >
                        <b>
                          The Leader for Cryptocurrency Tracking and Reporting{' '}
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=cotes5"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cointracking-exclusive-lifetime-discount-photos2.png"
                          alt="Cointracking Exclusive Lifetime Discount Photos"
                        />
                      </a>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=cotes5"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cointracking-exclusive-lifetime-discount-balances.png"
                          alt="Cointracking Exclusive Lifetime Discount Balances"
                        />
                      </a>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=cotes5"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cointracking-exclusive-lifetime-discount-imports1.png"
                          alt="Cointracking Exclusive Lifetime Discount Imports"
                        />
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
    )
  }
}
