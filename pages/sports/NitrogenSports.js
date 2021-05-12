import React, { Component } from 'react'
import Join from "../../components/pages/Join";

export default class NitrogenSports extends Component {
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
                  <li>● 0.28% Return of all sports wagers (Exclusive)</li>
                  <li>● Highly Competitive Odds</li>
                  <li>● Continuous Weekly Promotions</li>
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
                  <li>● 100% Anonymous</li>
                  <li>● Bitcoin Only</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/nitrogensports.png"
                style={{ width: '25%', marginTop: '10px' }}
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
                  href="https://coinrewards.org/?ref=gnnt5ir"
                  className="cmn-btn newAStyle"
                >
                  Visit Sportsbook
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
                <b>Important</b>: Make sure to use the provided links on this
                page or else you will not qualify for our exclusive bet-back.
              </p>
              <p
                style={{
                  marginTop: '0px',
                  textAlign: 'justify',
                  padding: '25px',
                  fontSize: 'small'
                }}
              >
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
                Proceed through the sign-up process:
              </p>
              <a target="_blank" href="https://coinrewards.org/?ref=gnnt5ir">
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-nitrogen-sports-poker-signup-highest-rakeback.png"
                  height="auto"
                  width="320px"
                />
              </a>
            </div>
            <Join>
              Verify User # (Example: 5000004){' '}
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
                          Top-rated Bitcoin sportsbook; smooth and easy-to-use
                          platform, comprehensive cashier and history
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=gnnt5ir"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-nitrogen-sports-bet-back-exclusive-reward-discount.png"
                          alt="NitrogenSports BetBack Exclusive Reward Discount"
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
                        <b>Tournaments and freeroll availability, overlays</b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=gnnt5ir"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-nitrogen-sports-bet-back-exclusive-reward-discount-info.png"
                          alt="NitrogenSports BetBack Exclusive Reward Info"
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
