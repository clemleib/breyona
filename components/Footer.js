import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{ padding: "5px 0px" }}>
                <section id="footer-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <ul className="nav">
                                   

                                    <li className="nav-item">
                                        <a className="nav-link" href="/trading">
                                            <font size="2">Trading</font>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/sports">
                                            <font size="2">Sports</font>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/tools">
                                            <font size="2">Tools</font>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="main-menu-socail">
                                <li>
                                        <a href="https://www.reddit.com/" target="_blank"
                                        style={{ margin: "0px 5px",color:"#FF4500" }}>
                                            <i className="fab fa-reddit-alien"></i>
                                        </a>
                                    </li>
                              
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank"
                                        style={{ margin: "0px 5px",color:"#3b5998" }}>
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.youtube.com/" target="_blank" style={{ margin: "0px 5px",color:"#db4437" }}>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://twitter.com/" target="_blank"
                                        style={{ margin: "0px 5px",color:"#1da1f2" }}>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>

                                  

                                     <li>
                                     <a href="mailto:support@coinrewards.org"
                                     className="custom-hover2"
                                     style={{ fontSize:16 }}
                                     >
                                        support@coinrewards.org
                                    </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="main-menu-right nav">
                                    <li>
                                        <a className="nav-link" href="/blog">
                                            <font size="2">Blog</font>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/faq">
                                            <font size="2">FAQ</font>
                                        </a>
                                    </li>
                                    {/*<li>
                                        <a className="nav-link" href="/affiliate">
                                            <font size="2">Affiliate</font>
                                        </a>
                                    </li>*/}
                                    <li style={{padding:" 0px"}}>
                                        <a className="nav-link" href="https://bitcoin.org" target="_blank">
                                            <font size="2">Discussion</font>
                                        </a>
                                    </li>
                                      <li style={{padding:" 0px"}}>
                                        <a className="nav-link" href="https://coinrewards.org/blog/Terms-of-Use-and-Privacy-Policy">
                                            <font size="2">Terms & Privacy</font>
                                        </a>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </section>
                <section id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                            <br /><br />
                           {/* <a href="https://www.gamcare.org.uk/" target="_blank">
                            <img style={{width:"33px", height:"36px" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cares-gamcare-help-support1.png" alt="Btcgrinders Cares Gamcare Help" />
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.gamblersanonymous.org" target="_blank">
                            <img style={{width:"39px", height:"36px" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-cares-ga-help-support1.png" alt="Btcgrinders Cares GA Help" />
                            </a>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.digicert.com/" target="_blank">
                            <img style={{width:"81px", height:"36px" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-rewards-rakeback-crypto-rebate-exchanges-sports-ssl-secure1.png" alt="Btcgrinders Rewards Rakeback Crypto Rebate Exchanges SSL Secure" />
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img style={{width:"36px", height:"36px" }} className="card-img-top" src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-rewards-rakeback-crypto-rebate-exchanges-tools-over-18-1.png" alt="Btcgrinders Rewards Rakeback Crypto Rebate Exchanges Over18" />
                                <br /><br />*/}
                            &copy; 2020 Coin Rewards. All Rights Reserved.
                            <br />



                    </div>
                        </div>
                    </div>
                </section>


                <center> <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1568965420/mobile-app.png" height="auto" width="23" /> 
            </center>
            </div>
        );
    }
}

export default Footer;