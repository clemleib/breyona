import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux"
import Router, { withRouter } from "next/router"
import apiUrl from "../lib/config"
import axios from "axios"
class Affiliate extends Component {
    componentWillMount() {
    }
    join() {
        if (this.props.auth.isAuthenticated === true) {
            axios.post(`${apiUrl}/api/affiliate/register`, { email: this.props.auth.user.email }).then((res) => {
                if (res.data.success) {
                    Router.push("/dashboard")
                }
            })
        } else this.setState({ error: "Please register to continue" })
    }
    // style={{ background: "#f7f7f7" }}
    render() {
        return (
            <div className="awefawefawew"  >

                {/* <div className="row" style={{ background: "url('../../images/hero.jpg')", minHeight: "610px" }}>
                    <div className="col-sm-6 ">
                    </div>
                    <div className="col-sm-6 ">
                        <div style={{marginTop:"25%",color:"#fff"}}>
                        <div className="text-lg"> PROFIT FROM OUR <br />AFFILIATE PROGRAM</div>
                        <div style={{margin:"10px 0px 20px",color:"#eee"}}> Make unbilievable amount of money by join the home market affliate</div>
                        <div> <a className="btn btn-default" href="/" role="button"> 
                        <i className="fa fa-sign-in"></i>
                         <span> SIGN IN </span></a> 
                          <a className="btn btn-default" href="/" role="button">
                                    <i className="fa fa-user"></i>
                                    <span> REGISTER</span></a></div>
                        </div>
                    </div>
                </div> */}
                {/* <div style={{ background: "url('../../images/hero.jpg')",padding:"100px 0px"}}>
                    <div className="container" >
                        <div className="row">
                            <div className=" col-md-4 zero" style={{color:"#fff"}}>
                                <span style={{fontSize:"2.4em"}}>Why join our <br/> Affiliate <br />Program?</span>
                            </div>
                            <div className=" col-md-4 zero text">
                                <p><span>☆ </span> Lorem  consectetur adip elit. ur adip elit</p>
                                <p><span>☆ </span> Lorem  consectetur adip elit. ur adip elit</p>
                                <p><span>☆ </span> Lorem  consectetur adip elit ur adip elit.</p>
                                <p><span>☆ </span> Lorem  consectetur adip elit.ur adip elit</p>
                                <p><span>☆ </span> Lorem  consectetur adip elit.</p>
                            </div>
                            <div className=" col-md-4 zero text">
                                <p><span>☆ </span> Lorem   consectetur adip elit. ur adip elit  consectetur adip elit. ur adip elit</p>
                               
                                <p><span>☆ </span> Lorem  consectetur adip elit   consectetur adip elit. ur adip elit .ur adip elit</p>
                                <p><span>☆ </span> Lorem  consectetur   consectetur adip elit. ur adip elit adip elit.</p>
                            </div>
                            <style>
                                {`
                                    .text p span{margin:0px 5px 0px 0px;font-weight:800;font-size:1.3em;}
                                `}
                            </style>
                        </div>
                    </div>
                </div> */}
                <div >

                    <div className="row" style={{ padding: "30px 10px" }}>
                        <div className="col-md-10 offset-md-1" style={{ padding: "5% 0px 5%", background: "#fff" }}>
                            <div style={{padding:"20px"}}>
                            <center>
                            <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1549890464/images/btcgrinders.com-rakeback-poker-fee-return-trading-cryptocurrency-bitcoin-rewards-referral-affiliate-program.png" style={{width:"32%", marginTop: "-75px" }} />
                            </center>    
                            </div>
                            <div className="row">

                                {/* <div className="col-md-4" style={{ textAlign: "center", margin: "5% 0px", padding: "0px 5%" }}>
                                    <img src="../../images/register.png" width="60%" class="img-responsive" alt="img" />
                                    <p style={{ margin: "7% 0px" }}><b>REGISTER</b></p>
                                    <p> It is free to join, simply register and subscribe to our channel </p>
                                </div>
                                <div className="col-md-4" style={{ textAlign: "center", margin: "5% 0px", padding: "0px 5%" }}>
                                    <img src="../../images/advertise.png" width="60%" class="img-responsive" alt="img" />
                                    <p style={{ margin: "7% 0px" }}><b>ADVERTISEMENT</b></p>
                                    <p>Display our advertisement on your site, blog or social media platform </p>
                                </div>
                                <div className="col-md-4" style={{ textAlign: "center", margin: "5% 0px", padding: "0px 5%" }}>
                                    <img src="../../images/make-money.png" width="60%" class="img-responsive" alt="img" />
                                    <p style={{ margin: "7% 0px" }}><b>MAKE MONEY</b></p>
                                    <p>Receive commission on every user that registers with your link</p>
                                </div> */}

                                <div className="col-xs-12 col-sm-12 ">
                                    <center>
                                    {this.props.auth.isAuthenticated === false?   
                                     <a className="btn btn-primary" href="/register" role="button" style={{ padding: "10px 70px" }}>Register</a>
                                   :null}
                                   </center>
                                   <br /><br />
                                   <center><h5><b>Become an affiliate of Coin Rewards and receive up to 90% of all your referral's net payments. Contact admin@coinrewards.org for more info.<br /> Your referral link and data will be located in your <a href="/dashboard"><u>user dashboard</u></a>.</b></h5></center>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>

            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(withRouter(Affiliate));