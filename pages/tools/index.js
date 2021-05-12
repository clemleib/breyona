import React, { Component } from "react";

class Sports extends Component {
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
          <div
              className="col-md-4 bg-transparent shadow-none border-10 flex "

            ><br /> <br /><br /><br /><br />
              <a href="/contact" className="hover-link-underline" style={{color:"#000080"}}>
              <br /> <br /><br /> <b>     Add your <br /> Service/Tool <br /> to our <br />Rewards Platform  <br /> <i class="material-icons">&#xe148;</i></b>

              </a>
            </div>
            {/****************************** */}
           {/* <div
              className="col-md-4"
              onClick={() => window.location.assign("/tools/TradingView")}
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
                  bottom: "10%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/tools/TradingView">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "26px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1557875139/bitcoin-crypto-trading-rewards-poker-rakeback-tradingview.png"
                    style={{ width: "55%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Advanced Charting</li>
                    <li>▪ Unparalled Tools</li>
                    <li>▪ View and publish ideas</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Discount</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 25% rebate for all plans (Exclusive)*</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Bonus</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 30 Day Free Trial for all plans</li>
                  </ul>
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> 
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
                </div>*/}

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/tools/Torguard")}
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
                  bottom: "10%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/tools/Torguard">
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
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/torguard4.png"
                    style={{ width: "42%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Top Online Privacy Protection</li>
                    <li>▪ 100% Anonymous, No logs</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Discount</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 50% Lifetime discount (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Bonus</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 25% Additional lifetime Rebate (Exclusive)*</li>
                  </ul>
                  <br />
                  <br />
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
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
            </div>
           {/* <div
              className="col-md-4"
              onClick={() =>
                window.location.assign("https://shop.trezor.io/?a=604d54f6413b")
              }
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
                  bottom: "10%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;&nbsp;Visit Merchant
              </div>
              <a href="https://shop.trezor.io/?a=604d54f6413b" target="_blank">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "18px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1557875445/bitcoin-rakeback-rewards-trezor-cashback.png"
                    style={{ width: "50%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Secure Hardware Wallet</li>
                    <li>▪ Supports over 100+ Cryptos</li>
                    <li>▪ CE and RoHS Certified</li>
                  </ul>
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> 
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
            <div
              className="col-md-4"
              onClick={() => window.location.assign("/tools/Orange")}
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
                  bottom: "8%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;Add to Dashboard
              </div>
              <a href="/Orange">
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
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/orange.png"
                    style={{ width: "53%" }}
                  />{" "}
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Top Anonymous Free Speech Web Host</li>
                    <li>▪ Top Privacy Protection</li>
                    <li>▪ 24/7 support</li>
                    <li>▪ 100% Green Energy and Reliable</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Bonus</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ $10 Credit after 1st purchase (Exclusive)*</li>
                  </ul>
                  <br />
                  <br />
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> 
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
            <div
              className="col-md-4"
              onClick={() =>
                window.location.assign("https://www.ledgerwallet.com/r/13ca")
              }
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
                  bottom: "10%",
                  left: "0%"
                }}
              >
                &nbsp;&nbsp;&nbsp;Visit Merchant
              </div>
              <a href="https://www.ledgerwallet.com/r/13ca" target="_blank">
                <div
                  style={{
                    height: "120px",
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingTop: "13px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/ledger1.png"
                    style={{ width: "64%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Secure Hardware Crypto Wallet</li>
                    <li>▪ Supports 30+ Cryptos</li>
                    <li>▪ FIDO Certified U2F</li>
                    <li>▪ Integrations</li>
                  </ul>
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" />
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
                </div>*/}

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/tools/CoinTracking")}
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
              <a href="/CoinTracking">
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
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/cointracking.png"
                    style={{ width: "59%" }}
                  />{" "}
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Info</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Top Cryptocurrency Tracking and Reporting</li>
                    <li>▪ 300k+ Active Users</li>
                    <li>▪ Historical Data for all 5710 Cryptos</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Discount</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 10% Lifetime Discount (Exclusive)</li>
                  </ul>
                  <br />
                  <br />
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
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
          </div>
        </div>
      </section>
    );
  }
}

export default Sports;
