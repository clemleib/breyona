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
              <br /> <br /><br /> <b>     Add your <br /> Sportsbook <br /> to our <br />Rewards Platform  <br /> <i class="material-icons">&#xe148;</i></b>

              </a>
            </div>
            {/****************************** */}
            
            <div
              className="col-md-4"
              onClick={() => window.location.assign("/sports/Fairlay")}
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
              <a href="/sports/Fairlay">
                <div
                  style={{
                    height: "100px",
                    overflow: "hidden",
                    width: "83%",
                    position: "relative",
                    marginLeft: "22px",
                    paddingTop: "24px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btc-grinders-fairlay-sportsbook-bitcoin-crypto-betback-cashback.png"
                    style={{ width: "66%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Cashback</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 45% Discount on all fees (Exclusive)!</li>
                    <li>▪ 0 - 25% VIP Discount (Additional)!</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ P2P Betting Exchange</li>
                    <li>▪ 100% Anonymous</li>
                    <li>▪ From Sports to Politics</li>
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
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                </small>
              </a>
            </div>

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/sports/NitrogenSports")}
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
              <a href="/sports/NitrogenSports">
                <div
                  style={{
                    height: "100px",
                    overflow: "hidden",
                    width: "60%",
                    position: "relative",
                    marginLeft: "40px",
                    paddingTop: "20px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/nitrogensports.png"
                    style={{ width: "66%" }}
                  />
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Bet Back</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 0.28% Return on all wagers (Exclusive)</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Competitive Odds</li>
                    <li>▪ 100% Anonymous</li>
                    <li>▪ Continuous Weekly Promotions</li>
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
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                </small>
              </a>
            </div>

            <div
              className="col-md-4"
              onClick={() => window.location.assign("/sports/BitcoinRush")}
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
              <a href="/sports/BitcoinRush">
                <div
                  style={{
                    height: "100px",
                    overflow: "hidden",
                    width: "60%",
                    position: "relative",
                    margin: "auto",
                    paddingTop: "19px"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/bitcoinrush.png"
                    style={{ width: "65%" }}
                  />{" "}
                </div>
                <small>
                  <u>
                    <b>
                      <font face="verdana">Bet Back</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ 0.275 - 0.425% Return on all wagers (Exclusive)*</li>
                  </ul>
                  <u>
                    <b>
                      <font face="verdana">Other</font>
                    </b>
                  </u>
                  <br />
                  <ul>
                    <li>▪ Competitive Odds</li>
                  </ul>
                  {/* <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/197484.png" /> */}
                  <br />
                  <br />
                  <div className="flag" />
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
