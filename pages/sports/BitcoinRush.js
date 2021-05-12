import React, { Component } from 'react'
import Join from "../../components/pages/Join";

export default class Bitcoinrush extends Component {
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
                  <li>● 0.175% Return on all sports bets (Exclusive)</li>
                  <li>
                    ● 0.10-0.25% Additional VIP Bet-back (more info
                    &nbsp;&nbsp;&nbsp;&nbsp;below)
                  </li>
                  <li>● Bitcoin denominations only</li>
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
                  <li>● Since 2013</li>
                  <li>● Competitive Odds</li>
                  <li>● High Limits</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/bitcoinrush.png"
                style={{ width: '20%', marginTop: '20px' }}
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
                  href="https://coinrewards.org/?ref=baytam"
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
                not qualify for our exclusive reward.
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
                Select “register” at the top right:
              </p>
              <a target="_blank" href="https://coinrewards.org/?ref=baytam">
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-bitcoinrush.io-exclusive-sports-bet-back-discount-rewards-register.png"
                  height="auto"
                  width="320px"
                />
              </a>
            </div>
            <Join>
              Enter your full BitcoinRush affiliate link (located in{' '}
              <a target="_blank" href="https://coinrewards.org/?ref=baytam">
                <u>your account</u>
              </a>):{' '}
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
                          Since 2013, the highest sportsbook bet-back available
                          in the market
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=baytam"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-bitcoinrush.io-exclusive-sports-bet-back-discount-info3.jpg"
                          alt="BitcoinrushIO Exclusive Sports Bet Back Info"
                        />
                      </a>
                      <br />
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=baytam"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-bitcoinrush.io-exclusive-sports-bet-back-discount-rewards1.png"
                          alt="BitcoinrushIO Exclusive Sports Bet Back Rewards"
                        />
                      </a>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=baytam"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-bitcoinrush.io-exclusive-sports-bet-back-discount-info2.png"
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
