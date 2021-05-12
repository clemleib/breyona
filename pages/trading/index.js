import React, { Component } from "react";

class Trading extends Component {
  constructor(props) {
    super(props); //
    this.state = {};
  }
  render() {
    return (
      <section id="main">
        <div className="container">
          <div className="row brand">

          {/****************Custom box************** */}
          <style jsx>
                                      {`
                                         .wtf {
                                          text-align: center;
                                          box-shadow: none;
                                          outline: none;
                                          border: 1px solid #e0e0e0;
                                          background: #f7f7f7;
                                        }
                                        .wtf:hover {
                                          box-shadow: 0px 3px 5px 0px #777;
                                          border: 2px;
                                          transform: scale(1.02);
                                          background: #ffffff;
                                          position: relative;
                                          bottom: 3px;
                                        }
                                       
                                      `}
                                    </style>
 {/*
                                        .wtf:hover {
                                          box-shadow: 0px 3px 5px 0px rgb(214, 214, 214);
                                          border: 2px;
                                          transform: scale(1.02);
                                          background: #ffffff;
                                          position: relative;
                                          bottom: 2px;
                                        } */}
          <div
              className="col-md-4 wtf flex"

            ><br /> <br /><br /><br /><br />
              <a href="/contact" className="hover-link-underline" style={{color:"#000080"}}>
              <br /> <br /><br /> <b>     Add your <br /> Exchange <br /> to our <br />Rewards Platform  <br /> <i class="material-icons">&#xe148;</i></b>

              </a>
            </div>
            {/****************************** */}

  {/*<div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Binancej")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Bitit">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1570312673/1502035338.png"
                    style={{ width: "55%" }}
                  />
                </div>
                <small>
                <code className="dcodegreen newfont">7.5&#8198;<font size="2">%</font></code>
<br />
<font size="2px">
                    <font face="arial">
                      <font color="C2C2C2">
                        <b>Cashback</b>
                      </font>
                    </font>
                  </font>
                  <br /><br />
                  <font face="verdana">
                    <b>
                      <u>Info</u>
                    </b>
                  </font>

                  <ul>
                    <li>▪ Purchase Cryptocurrency with Fiat</li>
                    <li>▪ Additional Promotions</li>
                  </ul>
                  <br />
                  <br />

                   <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" />
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
                </div>*/}

<div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/bitfinex")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/bitfinex">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "30px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1577194491/bfx.png"
                    style={{ width: "81%" }}
                  />
                </div>
                <small>
                <b>
                      <font face="verdana"><u>Trading Fee Return</u></font>
                    </b>
                  <br />
                
                  <ul>
                    <li>&nbsp;▪ 15% Discount on every trade (Exclusive)</li>
                    <li>&nbsp;▪ Margin trading</li>
                    <li>&nbsp;▪ High liquidity</li>
                    <li>&nbsp;▪ High interest p2p lending</li>
                    <li>&nbsp;▪ Over 100 cryptocurrencies</li>
                  </ul>

                  
                   

                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                 
                </small>
              </a>
            </div>


            <div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Binancej")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Binancej">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1558165405/binancej.png"
                    style={{ width: "55%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>&nbsp;▪ 60% Discount on every trade* (Exclusive)</li>
                    <li>&nbsp;</li>
                  </ul>

                  <font face="verdana">
                    <b>
                      <u>Other</u>
                    </b>
                  </font>

                  <ul>
                    <li>▪ Purchase Cryptocurrency with Fiat</li>
                    <li>▪ Additional Promotions</li>
                  </ul>
                  <br />
                  <br />

                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Binance")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Binance">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/binance.png"
                    style={{ width: "55%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>&nbsp;▪ 17.5% Discount on every trade* (Exclusive)</li>
                    <li>&nbsp;▪ 50% Discount when using BNB to pay fees</li>
                  </ul>

                  <font face="verdana">
                    <b>
                      <u>Other</u>
                    </b>
                  </font>

                  <ul>
                    <li>▪ Top Exchange in the World</li>
                    <li>▪ Over 100 Crypto Currencies</li>
                  </ul>
                  <br />
                  <br />

                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>

            {/* <div className="col-md-4" onClick={() => window.location.assign("/trading/1fox")}>
            <div className="moreInfo" style={{backgroundColor: '#000080', color: 'white', width: '209px', fontSize: 'small', margin: '0px auto', padding: '0px 1px', position: 'absolute', bottom: "9%", left: '0%' }}>&nbsp;&nbsp;Add to Dashboard</div>
              <a href="/trading/1fox">
                <div style={{ height: "120px", overflow: "hidden", width: "100%", position: "relative", paddingTop: '27px' }}>
              <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/1fox.png" style={{ width: "56%" }}/>
              </div>
              <small><u><b><font face="verdana">Trading Fee Return</font></b></u>
                <br />
                <ul>
                  <li>▪ 45% Discount on every trade (Exclusive)</li>
                </ul>
                <font face="verdana"><b><u>Other</u></b></font>
                <ul>
                  <li>▪ Up to 10x Leverage</li>
                  <li>▪ Unique System</li>
                  <li>▪ Reliable Platform</li>
                </ul>
<br /><br />
                <div className="flag">
                   
                     
                    <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png" height="28px" width="auto" />
                  </div>
              </small>
              </a>
    </div>*/}

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Mercatox")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Mercatox">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "22px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/mercatox.png"
                    style={{ width: "55%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ 12.5% Discount on every trade (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ Over 100 Cryptocurrencies</li>
                    <li>▪ Margin Trading</li>
                    <li>▪ P2P Lending and Exchange</li>
                  </ul>
                  <br />
                  <br />
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>

          
            {/*<div className="col-md-4" onClick={() => window.location.assign("/trading/1broker")}>
            <div className="moreInfo" style={{backgroundColor: '#000080', color: 'white', width: '209px', fontSize: 'small', margin: '0px auto', padding: '0px 1px', position: 'absolute', bottom: "9%", left: '0%' }}>&nbsp;&nbsp;Add to Dashboard</div>
              <a href="/trading/1broker">
                <div style={{ height: "120px", overflow: "hidden", width: "100%", position: "relative" ,paddingTop:"20px"}}>
                  <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/1broker.png" style={{ width: "47%" }} />
                    </div>
                    <small><u><b><font face="verdana">Trading Fee Return</font></b></u>
                    <ul>
                  <li>▪ 22% Discount on all trades* (Exclusive)</li>
                </ul>
                <u><b><font face="verdana">Other</font></b></u>
                <ul>
                  <li>▪ Up to 100x Leverage on Forex, Stocks, Indices, Commodities, and Bitcoin</li>
                </ul>
                <br /><br />
                <div className="flag">
                    
                     
                    <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png" height="28px" width="auto" />
                  </div>
              </small>
              </a>
    </div>*/}

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Livecoin")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Livecoin">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/livecoin.png"
                    style={{ width: "58%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ 7.5% Discount on every trade* (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ Over 100 Cryptocurrencies</li>
                  </ul>
                  <br />
                  <br />
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-rakeback-poker-rewards-trading-crypto-cashouts-credit-card-accepted.png"
                      height="28px"
                      width="auto"
                    />
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>

            {/*        <div className="col-md-4" onClick={() => window.location.assign("/trading/bitmex")}>
                        <div className="moreInfo" style={{backgroundColor: '#000080', color: 'white', width: '209px', fontSize: 'small', margin: '0px auto', padding: '0px 1px', position: 'absolute', bottom: "9%", left: '0%' }}>&nbsp;&nbsp;Add to Dashboard</div>
              <a href="/trading/bitmex">
                <div style={{ height: "120px",overflow:"hidden", width: "100%", position: "relative", paddingTop: '35px' }}>
                <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/bitmex.png"  style={{width:"63%"}}/></div>
                 <small><u><b><font face="verdana">Trading Fee Return</font></b></u>
                 <ul>
                  <li>&nbsp;▪ 28.5% Discount on every trade* (Exclusive)</li>
                </ul>
                <u><b><font face="verdana">Other</font></b></u>
                <ul>
                  <li>▪ Up to 100x Leverage for BTC, ADA, BCH, ETH, LTC, XRP</li>
</ul>
<br /><br />
                <div className="flag">
                    
                  </div>
              </small>
              </a>
            </div>*/}

            {/*<div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/LBC")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/LBC">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/localbitcoins.png"
                    style={{ width: "60%" }}
                  />
                </div>{" "}
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>&nbsp;▪ 17.5% Discount on every trade* (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ Largest P2P Exchange in the World</li>
                    <li>▪ Top Escrow Provider</li>
                  </ul>
                  <br />
                  <br />
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-rakeback-poker-rewards-trading-crypto-cashouts-credit-card-accepted.png"
                      height="28px"
                      width="auto"
                    />
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/paypal2.png"
                      height="28px"
                      width="auto"
                    />
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>*/}

          {/*  <div
              className="col-md-4"
              onClick={() => window.location.assign("/trading/Changelly")}
            >
              <div
                className="moreInfo"
                style={{
                  backgroundColor: "#000080",
                  color: "white",
                  width: "209px",
                  fontSize: "small",
                  margin: "0px auto",
                  padding: "0px 1px",
                  position: "absolute",
                  bottom: "9%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/trading/Changelly">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "29px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-changelly-discount-logo.png"
                    style={{ width: "72%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Trading Fee Return</font>
                    </b>
                  </u>
                  <ul>
                    <li>▪ 45% Discount on all trades* (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <ul>
                    <li>
                      ▪ Instant Wallet-to-Wallet exchange (over 20 cryptos)
                    </li>
                    <li>▪ Virtually no limits</li>
                    <li>▪ Purchase instantly with Visa/Mastercard</li>
                  </ul>
                  <br />
                  <br />
                  <div className="flag">
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-rakeback-poker-rewards-trading-crypto-cashouts-credit-card-accepted.png"
                      height="28px"
                      width="auto"
                    />
                    <img
                      src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-usa-allowed-flag.png"
                      height="28px"
                      width="auto"
                    />
                  </div>
                </small>
              </a>
            </div>
              <div className="col-md-4" onClick={() => window.location.assign("/trading/QuadrigaCx")}>
                        <div className="moreInfo" style={{backgroundColor: '#000080', color: 'white', width: '209px', fontSize: 'small', margin: '0px auto', padding: '0px 1px', position: 'absolute', bottom: "9%", left: '0%' }}>&nbsp;&nbsp;Add to Dashboard</div>
              <a href="/trading/quadrigacx">
                <div style={{ height: "120px", overflow: "hidden", width: "100%", position: "relative", paddingTop: '26px' }}>
                  <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/quadriga.png" style={{ width: "72%" }} />
                    </div>
                    <small><u><b><font face="verdana">Trading Fee Return</font></b></u>
                    <ul>
                  <li>▪ 7.5% Discount on every trade (Exclusive)</li>
                </ul>
                <u><b><font face="verdana">Other</font></b></u>
                <ul>
                  <li>▪ Same day funding and withdrawal via multiple bank transfers</li>
                </ul>
                <br /><br />
                <div className="flag">
                    
                  </div>
              </small>
              </a>
          </div> */}

         
           
          </div>
        </div>
      </section>
    );
  }
}

export default Trading;