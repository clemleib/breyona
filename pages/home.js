import React, { Component } from 'react';
import Slider from "react-slick";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import Trading from './trading';
import Sports from './sports';
import Tools from './tools';


const style = {
    padding: "2em 0",
    background: "var(--bg-primary-color)",
}
const style2 = {
    color: 'var(--text-color-secondary)'
}
export default class Home extends Component {
    state = {
        slick: {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 7000,
            prevArrow: <button className="btn red"> <i className="material-icons">chevron_left</i></button>,
            nextArrow: <button className="btn red"> <i className="material-icons">chevron_right</i></button>,
        }
    };
    render() {
        return (
            <div>
                <style jsx>
                    {`
                        .back {
                        background-color: #F7F7F7;
                        }
                        .color1 {
                        color:  #FF6A00;   
                        }
                        .color2 {
                            color: rgb(0, 255, 98);
                        }
.color3{
    color: rgb(226, 51, 153);
}
                    `}
                </style>
                <section style={style} className="home-slick-wrapper back pt-5 pb-3">
                    <div className="container">
                        <div className="row mx-0 py-3 boxshadow info-poker-top">
                            <div className="col-md-9 border-right">
                                <div>
                                    <Slider {...this.state.slick}>
                                        <div className="item">


                                            <div className='overlay' />
                                            <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1593550356/Ebi25WiUcAAfODn.jpg" />
                                            <div className='content'>
                                                <div className='content-inner'>
                                                    <div>
                                                        <h3><a href="https://www.bitmex.com/register/Lqu4mf" target="_blank">Crypto Trading</a></h3>
                                                        <p><a href="https://coinrewards.org/BitMex" target="_blank">High Leverage and Cashback</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className='overlay' />
                                            <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1577410898/Bitfinex-Enables-Bitcoin-Cash-Margin-Trading-1520x1024.png" />
                                            <div className='content'>
                                                <div className='content-inner'>
                                                    <div>
                                                        <h1><a href="https://www.bitfinex.com/?refcode=pnG55B03r" className="color2">Bitfinex Trading Platform and Funding</a></h1>.
                                                        <p><p><a href="https://coinrewards.org/bitfinex" target="_blank" className="color2">15% Cashback</a></p></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className='overlay' />
                                            <img src="https://res.cloudinary.com/btcgrinders/image/upload/v1593550462/E4355_01.jpg" />
                                            <div className='content'>
                                                <div className='content-inner white'>
                                                    <div>
                                                        <h2><a href="http://coinrewards.org">Comprehensive Dashboard</a></h2> 
                                                        <p><a href="http://coinrewards.org">Crypto Wallet</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className='content'>
                                                <div className='content-inner black'>
                                                    Need to take advantage of bitcoin price changes but don't have enough to buy a bitcoin? Get up to 100x
                                               <a href="https://www.bitmex.com/register/Lqu4mf" target="_blank">leverage</a> and 15% cash back!


                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TwitterTimelineEmbed
                                    sourceType="profile"
                                    screenName="ThinkingUSD"
                                    options={{ height: 300 }}
                                />
                            </div>

                        </div>
                    </div>
                </section>


                
                <section style={style} id="trading" name="trading">
                    <h2 className="container" style={style2}>Cryptocurrency Trading</h2>
                    <Trading />
                </section>

                <section style={style} id="sports" name="sports">
                    <h2 className="container" style={style2}>Bitcoin eSports</h2>
                    <Sports />
                </section>
                <section style={style} id="tools" name="tools">
                    <h2 className="container" style={style2}>Tools</h2>
                    <Tools />
                </section>


            </div>
        )
    }
}