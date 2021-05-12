import React, { Component } from 'react'
import Join from "../../components/pages/Join";

export default class Torguard extends Component {
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
                  <li>■ 50% Lifetime discount (Exclusive)</li>
                  <li>■ 25% Additional Lifetime Rebate (Exclusive)*</li>
                  <li>■ 7 Day Free-trial</li>
                  <li>■ 3000+ Servers, 55+ Countries</li>
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
                  <li>■ Top Online Privacy Protection</li>
                  <li>■ Dedicated IP’s Available</li>
                  <li>■ 99.99% up time</li>
                  <li>■ 100% Anonymous (no logs)</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/torguard4.png"
                style={{ width: '50%' }}
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
                Please clear your browsers’ cookies first.
              </p>
              <div>
                <a
                  target="_blank"
                  href="https://coinrewards.org/?ref=ttyw"
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
                <b>Important</b>: Be sure to use the provided link or you will
                not qualify for our exclusive rebate.
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
                Complete the registration by selecting a plan. Enter{' '}
                <b>BTC50</b> at checkout for an additional 50% lifetime
                discount:
              </p>
              <a
                target="_blank"
                href="https://coinrewards.org/?ref=ttyw"
              >
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-torguard-vpn-exclusive-super-discount-code-BTC50.png"
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
                        <b>The top online privacy protection service</b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=ttyw"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-torguard-vpn-exclusive-super-discount-top-provider.jpg"
                          alt="Torguard VPN Exclusive Super Discount Top Provider"
                        />
                      </a>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=ttyw"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-torguard-vpn-exclusive-super-discount-info.png"
                          alt="Torguard VPN Exclusive Super Discount Info"
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
