import React, { Component } from 'react';
import Slider from "react-slick";


class Homeslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            empty: "",
            count: true
        }
    }

    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            //dots: true,
            arrows: false,
            infinite: true,
            speed: 1400,
            slidesToShow: 1,
            fade: true,
            slidesToScroll: 10,
            autoplay: true,
            autoplaySpeed: 1300,
            prevArrow: prev,
            nextArrow: next,
        };
        return (
            <div className="slick-wrapper">

                <Slider {...settings}>
                    <div className="listing">
                        <font size="6">Welcome!</font>
                    </div>
                    <div className="listing">
                        <font size="6">You</font>
                    </div>
                    <div className="listing">
                        <font size="6">Deserve Better</font>
                    </div>

                    <div className="listing">
                        <font size="6">Secure and </font>
                    </div>
                    <div className="listing">
                        <font size="6">Anonymous</font>
                    </div>
                    <div className="listing">
                        <font size="6">Exclusive</font>
                    </div>
                    <div className="listing">
                        <font size="6">Cryptocurrency Rewards</font>
                    </div>
                    <div className="listing">
                        <font size="6">Platform </font>
                    </div>
        {/*   <div className="listing">
                       <center> <div><img height='55px' src='awefawef.mg' /></div></center>

                    </div> */}
                </Slider>
                <style>{`
                    .listing{
                        padding:0px;
                        text-align:center;
                        font-family: "helvetica", sans-serif;
                    }
                    .ua {
                        text-decoration: underline;
                        color: blue;
                    }
                    .listing a{
                        color:#1070E0;
                    }
                    .listing a:hover{
                        text-decoration: underline;
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Homeslider;