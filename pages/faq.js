import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../lib/config"
import YouTube from "react-youtube"
import {Helmet} from "react-helmet";
import Head from "next/head";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faq: [],
      title: "",
      search: false,
      searching: false,
      result: [],
    }
    this.general = this.general.bind(this)
    this.poker = this.poker.bind(this)
    this.trading = this.trading.bind(this)
    this.sports = this.sports.bind(this)
    this.tools = this.tools.bind(this)
  }
  componentWillMount() {
    axios.get(`${apiUrl}/api/faq`).then((res) => {
      if (res.data.success) {
        this.setState({ faq: res.data.success })
      }
    })
    if (window.location.search !== "")
      axios.get(`${apiUrl}/api/faq/search${window.location.search}`).then((res) => {
        if (res.data.result) {
          this.setState({ result: res.data.result, search: true });
        }
      });
  }

  myFunc (arr) {
    let rev = [];
    rev = arr.reverse();
    return rev;
  }
  general() {

    var general = [];
    let sortFaq = [];
    sortFaq = this.myFunc(this.state.faq);
    sortFaq.map((faq, key) => {

      if (faq.category === "general" || faq.category === "" || faq.category === undefined) {
        general.push(
          <div className="col-md-6">
            <div id="accordion">

              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                      {faq.title}
                    </button>
                  </h5>
                </div>

                <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>
                    {/* {faq.description} */}
                  </div>
                  {faq.link ?
                      <YouTube
                        videoId={faq.link}
                        opts={{
                          width: '100%',
                          playerVars: { // https://developers.google.com/youtube/player_parameters,
                            autoplay: 0
                          }
                        }}
                        onReady={this._onReady}
                      />
                      : null
                    }
                </div>
              </div>
            </div>
          </div>
        )
      }
    });
    return general;
  }
  poker() {
    var poker = [];
    this.state.faq.map((faq, key) => {

      if (faq.category === "poker") {
        poker.push(<div className="col-md-6">
          <div id="accordion">

            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                    {faq.title}
                  </button>
                </h5>
              </div>

              <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>

                </div>
                {faq.link ?
                      <YouTube
                        videoId={faq.link}
                        opts={{
                          width: '100%',
                          playerVars: { // https://developers.google.com/youtube/player_parameters,
                            autoplay: 0
                          }
                        }}
                        onReady={this._onReady}
                      />
                      : null
                    }
              </div>
            </div>
          </div>
        </div>
        )
      }
    });
    return poker
  }
  trading() {
    var trading = [];
    this.state.faq.map((faq, key) => {

      if (faq.category === "trading") {
        trading.push(<div className="col-md-6">
          <div id="accordion">

            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                    {faq.title}
                  </button>
                </h5>
              </div>

              <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>

                </div>
                {faq.link ?
                      <YouTube
                        videoId={faq.link}
                        opts={{
                          width: '100%',
                          playerVars: { // https://developers.google.com/youtube/player_parameters,
                            autoplay: 0
                          }
                        }}
                        onReady={this._onReady}
                      />
                      : null
                    }
              </div>
            </div>
          </div>
        </div>
        )
      }
    });
    return trading
  }
  sports() {
    var sports = [];
    this.state.faq.map((faq, key) => {

      if (faq.category === "sports") {
        sports.push(<div className="col-md-6">
          <div id="accordion">

            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                    {faq.title}
                  </button>
                </h5>
              </div>

              <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>

                </div>
                {faq.link ?
                      <YouTube
                        videoId={faq.link}
                        opts={{
                          width: '100%',
                          playerVars: { // https://developers.google.com/youtube/player_parameters,
                            autoplay: 0
                          }
                        }}
                        onReady={this._onReady}
                      />
                      : null
                    }
              </div>
            </div>
          </div>
        </div>
        )
      }
    });
    return sports
  }
  tools() {
    var tools = [];
    this.state.faq.map((faq, key) => {

      if (faq.category === "tools") {
        tools.push(<div className="col-md-6">
          <div id="accordion">

            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                    {faq.title}
                  </button>
                </h5>
              </div>

              <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>

                </div>
                {faq.link ?
                      <YouTube
                        videoId={faq.link}
                        opts={{
                          width: '100%',
                          playerVars: { // https://developers.google.com/youtube/player_parameters,
                            autoplay: 0
                          }
                        }}
                        onReady={this._onReady}
                      />
                      : null
                    }
              </div>
            </div>

          </div>
        </div>
        )
      }
    });
    return tools;
  }
  typing(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, searching: true }, (state) => {
      axios.get(`${apiUrl}/api/faq/search?title=${this.state.title}`).then((res) => {
        if (res.data.result) {
          this.setState({ result: res.data.result, search: true });
          this.setState({ searching: false })
        }
      });
    })
  }

  render() {

    return (
      <React.Fragment>

        <Head>
          <title>Bitcoin & Crypto Cashback, Trading, Tools & Sports Rewards</title>
            <link rel="shortcut icon" type="image/x-icon" href="https://res.cloudinary.com/btcgrinders/image/upload/v1559953935/bitcoin-grinders-logo-rakeback-cashback-crypto.jpg" />
            <meta name="description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!"
            />

            <meta name="keywords" content="Bitcoin, crypto, cryptocurrency, crypto trading, cryptocurrency trading, bitcoin trading, bitcoin exchanges, margin trading, litecoin, ethereum, dash, bitcoin cash, sports betting discount, bitcoin free bitcoin, dash, bitcoin sports, litecoin sports, bitcoin cash, ether, ether free bitcoin, ethereum savings, ethereum trading"
            />

            <meta name="robots" content="index, follow" />

            <meta name="revisit-after" content="7 days" />
            <meta name="google-site-verification" content="ZSBhlzoympbif6myYvHGYYPi7wbzkra6hYw8uE5G7RQ" />

            <meta property="og:image" content= "https://res.cloudinary.com/btcgrinders/image/upload/v1559953935/bitcoin-grinders-logo-rakeback-cashback-crypto.jpg" />
            <meta property="og:title" content= "Highest Rakeback, Rebates...Fast Crypto Payouts" />
            <meta property="og:url" content= "https://coinrewards.org/faq" />
            <meta property="og:description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!" />
            <meta property="og:type" content="website" />
          </Head>
        <section id="main" className="sec-pad">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form action={`/faq?title=${this.state.title}`}>
                  <input type="text" name="title" placeholder="search" required className="search-input" onChange={this.typing.bind(this)} />
                  <button type="submit" className="cmn-btn search-btn">Search</button>
                </form>
              </div>
            </div>
            <h2 className="text-center" style={{ paddingBottom: '20px' }}>Our FAQ</h2>
            <div className="row">
              {this.state.search === true && this.state.result.length > 0 ?
                <div className="col-sm-12">
                  <h5>{this.state.result.length} search result found </h5>
                </div> : null}

              {
                this.state.search ?
                  this.state.result.map((faq, key) => (
                    <div className="col-md-6">
                      <div id="accordion">

                        <div className="card">
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                              <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${key}`} aria-expanded="true" aria-controls={`collapseOne${key}`}>
                                {faq.title}
                              </button>
                            </h5>
                          </div>

                          <div id={`collapseOne${key}`} className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                            <div className={`div${key}`} className="card-body" dangerouslySetInnerHTML={{ __html: faq.description }}>
                              {/* {faq.description} */}
                            </div>
                            {faq.link ?
                        <YouTube
                          videoId={faq.link}
                          opts={{
                            width: '100%',
                            playerVars: { // https://developers.google.com/youtube/player_parameters,
                              autoplay: 0
                            }
                          }}
                          onReady={this._onReady}
                        />
                        : null
                      }
                          </div>
                        </div>



                      </div>
                    </div>
                  ))
                  : window.location.search === "" ?
                    <div className="col-md-12" style={{ padding: "0px" }}>
                      <div className="row">
                        <div className="col-md-12" style={{padding:"20px 10px"}} >
                          <h5>General</h5>
                        </div>
                        {this.general()}
                      </div>

                      <div className="row">
                        <div className="col-md-12" style={{ padding: "20px 10px" }} >
                          <h5>Trading</h5>
                        </div>
                        {this.trading()}
                      </div>
                      <div className="row">
                        <div className="col-md-12" style={{ padding: "20px 10px" }} >
                          <h5>Sports</h5>
                        </div>
                        {this.sports()}
                      </div>
                      <div className="row">
                        <div className="col-md-12" style={{ padding: "20px 10px" }} >
                          <h5>Tools</h5>
                        </div>
                        {this.tools()}
                      </div>
                    </div>
                    : <div className="center-align">
                      No search result found
                                          </div>
              }

            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}


export default Faq;
