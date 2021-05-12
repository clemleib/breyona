import React, { Component } from 'react'
import Join from '../../components/pages/Join';

export default class Binancej extends Component {
  render() {
    return (
      <section id="main" className="poker">
        <div className="container">
          <div className="row text-left">
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
                  <li>
                    <b>√</b>&nbsp;&nbsp;60% return on all trading fees
                    (Exclusive)
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;50% fee discount**
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Binance plus Fiat Services!
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;High Liquidity
                  </li>
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
                  <li>
                    <b>√</b>&nbsp;&nbsp;USA Welcomed
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Top 3 Crypto Exchange in the World
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Continuous Promos
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1558165405/binancej.png"
                style={{ width: '50%', margin: 'auto', marginTop: '12px' }}
              />
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
                  href="https://coinrewards.org/?ref=bjuss"
                  className="cmn-btn newAStyle"
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
                <b>Important</b>: make sure to use the sign-up link we provide so that you will be tracked for 17.5% fee-return.
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
                <span>
                  Enter <b>35054627</b> as the referral ID:
                </span>
              </p>
              <a
                target="_blank"
                href="https://coinrewards.org/?ref=bjuss"
              >
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1558172216/4d043b96a1fab27a369821766b694c49.png"
                  height="auto"
                  width="320px"
                />
              </a>
            </div>
            <Join>
              Enter the Email you just registered at Binance.je:
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
                          textAlign: 'justify',
                          padding: '0px',
                          fontSize: 'small'
                        }}
                      >
                        *Receive an additional 50% discount on trading fees when
                        you activate the BNB option in your account.
                      </p>
                      <br />
                      <br />
                      <p
                        style={{
                          marginTop: '0px',
                          textAlign: 'center',
                          padding: '0px'
                        }}
                      >
                        <b>
                          Regarded as the top crypto exchange in the world, in
                          both quality and liquidity
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=bjuss"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-binance-crypto-exchange-exclusive-discount-fee-return.jpg"
                          alt="Binance Crypto Exchange Exclusive Discount Fee Return"
                        />
                      </a>
                      <br />
                      <br />
                      <br />
                      <p
                        style={{
                          marginTop: '0px',
                          textAlign: 'center',
                          padding: '0px'
                        }}
                      >
                        <b>Advanced charting, mobile, and desktop clients</b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=bjuss"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-binance-exchange-exclusive-discount-advanced.png"
                          alt="Binance Exchange Exclusive Discount Advanced"
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
