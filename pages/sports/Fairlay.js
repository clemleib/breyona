import React, { Component } from 'react'
import Join from "../../components/pages/Join";

export default class Fairlay extends Component {
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
                  <li>● 45% Return on all fees (Exclusive)</li>
                  <li>
                    ● 0 - 25% VIP fees discount (Additional)
                  </li>
                  <li>● Lowest Fees and Best Odds</li>
                  <li>● P2P Betting Exchange</li>
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
                  <li>● USA Welcomed</li>
                  <li>● Create Your Own Markets</li>
                  <li>● Bet on Any Event</li>
                  <li>● Sports, Politics, News, etc </li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sportsbook-bitcoin-crypto-betback-cashback.png"
                style={{ width: '47%', marginTop: '23px' }}
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
                  href="https://coinrewards.org/?ref=flay4"
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
                Create an Instant Account or Sign-up Normally:
              </p>
              <a target="_blank" href="https://coinrewards.org/?ref=flay4">
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sports-bitcoin-crypto-betback-cashback-register.png"
                  height="auto"
                  width="300px"
                />
              </a>
              <br />
              <br />
            </div>
            
            <Join>
              Enter Your Fairlay Referral # (find it  <a target="_blank" href="https://btcgrinders.com/images/btc-grinders-fairlay-sports-bitcoin-crypto-betback-cashback-verification.png" target="_blank"><font color="#1070E0"><b>here</b></font></a>):{' '}
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
                          The Ultimate Bitcoin Prediction Market; P2P Betting Exchange; Sports, Futures, Financial Derivatives....
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=flay4"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sports-bitcoin-crypto-betback-cashback-info1.png"
                          alt="BitcoinrushIO Exclusive Sports Bet Back Info"
                        />
                      </a>
                      <br />
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=flay4"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sports-bitcoin-crypto-betback-cashback-info2.png"
                          alt="BitcoinrushIO Exclusive Sports Bet Back Rewards"
                        />
                      </a>
                      <br />
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=flay4"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sports-bitcoin-crypto-betback-cashback-info.png"
                          alt="BitcoinrushIO Exclusive Sports Bet Back Info Discount"
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
