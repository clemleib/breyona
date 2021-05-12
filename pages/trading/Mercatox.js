import React, { Component } from 'react'
import Join from '../../components/pages/Join';

export default class Mercatox extends Component {
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
                    <b>√</b>&nbsp;&nbsp;12.5% return on all fees (Exclusive)
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Margin Trading
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;P2P Lending
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Merchant and Public API
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
                    <b>√</b>&nbsp;&nbsp;Decentralized P2P Exchange
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;User-to-user transfers
                  </li>
                  <li>
                    <b>√</b>&nbsp;&nbsp;Accept payments on your website*
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', minHeight: '0' }}
            >
              <img
                src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/mercatox.png"
                style={{ width: '50%', marginTop: '21px' }}
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
                  href="https://coinrewards.org/?ref=murztw"
                  className="cmn-btn newAStyle"
                >
                  Visit Platform
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
                <b>Important</b>: please use the sign-up link we provide so that
                you will be tracked for the 12.5% exclusive discount.
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
                <span>Complete the registration process:</span>
              </p>
              <a target="_blank" href="https://coinrewards.org/?ref=murztw">
                <img
                  src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-mercatox-trading-exchange-lending-exclusive-rebate-discount-signup.png"
                  height="auto"
                  width="320px"
                />
              </a>
            </div>
            <Join>
              Verify your user ID # (located in account)
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
                        *Please select the merchant api for more information{' '}
                        <a
                          target="_blank"
                          href="https://coinrewards.org/?ref=murztw"
                        >
                          <u>here</u>
                        </a>.
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
                          Digital Platform for all your crypto financial needs
                        </b>
                      </p>
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=murztw"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-mercatox-trading-exchange-lending-exclusive-rebate-discount-platform.png"
                          alt="Mercatox Trading Exchange Lending Exclusive Rebate Discount Platform"
                        />
                      </a>
                      <br />
                      <br />
                      <a
                        target="_blank"
                        href="https://coinrewards.org/?ref=murztw"
                      >
                        <img
                          style={{ width: '90%', height: 'auto' }}
                          className="card-img-top"
                          src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-mercatox-trading-exchange-lending-exclusive-rebate-discount-info.png"
                          alt="Mercatox Trading Exchange Lending Exclusive Rebate Discount Info"
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
