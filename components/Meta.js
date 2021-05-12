import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Head from "next/head";

class Meta extends Component {
  render() {
    return (

      //user "Helmet" the same as "Head"
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" type="image/x-icon" href="https://res.cloudinary.com/btcgrinders/image/upload/v1549890347/images/favicon2.ico" />

          <title>Bitcoin & Crypto FX cashback and Rewards</title>
          <meta name="description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!"
          />

          <meta name="keywords" content="Bitcoin, crypto, cryptocurrency, crypto trading, cryptocurrency trading, bitcoin trading, bitcoin exchanges, margin trading, litecoin, ethereum, dash, bitcoin cash, sports betting discount, bitcoin free bitcoin, dash, bitcoin sports, litecoin sports, bitcoin cash, ether, ether free bitcoin, ethereum savings, ethereum trading"
          />

          <meta name="robots" content="index, follow" />

          <meta name="revisit-after" content="7 days" />
          <meta name="google-site-verification" content="ZSBhlzoympbif6myYvHGYYPi7wbzkra6hYw8uE5G7RQ" />
          <meta property="og:image" content="https://res.cloudinary.com/btcgrinders/image/upload/v1595574788/85.jpg" />
          <meta property="og:title" content="Bitcoin & Crypto FX Cashback, Margin Trading and eSports" />
          <meta property="og:url" content="https://coinrewards.org" />
          <meta property="og:description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!" />
          <meta property="og:type" content="website" />
          {/********************** twitter share meta  ************************* */}
          <meta name="twitter:title" content="Bitcoin & Crypto FX Cashback, Margin Trading and eSports" />

          <meta name="twitter:description" content="bitcoin & Crypto FX cashback, rewards, margin trading, eSports and more!" />

          <meta name="twitter:image" content="https://res.cloudinary.com/btcgrinders/image/upload/v1595574788/85.jpg" />

          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato|Open+Sans|Roboto" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="/static/css/video-react.css" />

          <link rel="stylesheet" href="/static/css/slick.css" />
          <link rel="stylesheet" href="/static/css/slick-theme.css" />

          <link rel="stylesheet" href="/static/lib/owl-carousel/owl.carousel.min.css" />
          <link rel="stylesheet" href="/static/lib/owl-carousel/owl.theme.default.min.css" />
          <link rel="stylesheet" href="/static/lib/simplemodal/lightbox.css" />
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="/static/css/style.css" />
          <link rel="stylesheet" href="/static/css/responsive.css" />
          {/*<link rel="stylesheet" href="/static/css/main.css" />*/}
          <script src="https://kit.fontawesome.com/66e342be89.js" crossOrigin="anonymous"></script>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </Head>

      </React.Fragment>
    );
  }
}

export default Meta;
/**
  <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" type="image/x-icon" href="https://res.cloudinary.com/btcgrinders/image/upload/v1549890347/images/favicon2.ico" />

          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato|Open+Sans|Roboto" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="/static/css/video-react.css" />

          <link rel="stylesheet" href="/static/css/slick.css" />
          <link rel="stylesheet" href="/static/css/slick-theme.css" />

          <link rel="stylesheet" href="/static/lib/owl-carousel/owl.carousel.min.css" />
          <link rel="stylesheet" href="/static/lib/owl-carousel/owl.theme.default.min.css" />
          <link rel="stylesheet" href="/static/lib/simplemodal/lightbox.css" />
          <link rel="stylesheet" href="/static/css/style.css" />
          <link rel="stylesheet" href="/static/css/responsive.css" />
          {/*<link rel="stylesheet" href="/static/css/main.css" />*}

          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </Head>
        <Helmet>

          <title>Bitcoin & Crypto Crypto Rewards, Trading, Tools & Sports Rewards</title>

          <meta name="description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!"
          />

          <meta name="keywords" content="Bitcoin, crypto, cryptocurrency, crypto trading, cryptocurrency trading, bitcoin trading, bitcoin exchanges, grinders, grinder, litecoin, ethereum, dash, bitcoin cash, poker, free bitcoin, rb, online poker, btc poker, sports betting discount, bitcoin free bitcoin, dash poker, bitcoin sports, litecoin sports, bitcoin cash poker, ether poker, ether free bitcoin, ethereum sports, ethereum poker"
          />

          <meta name="robots" content="index, follow" />

          <meta name="revisit-after" content="7 days" />
          <meta name="google-site-verification" content="ZSBhlzoympbif6myYvHGYYPi7wbzkra6hYw8uE5G7RQ" />

          <meta property="og:image" content="https://res.cloudinary.com/btcgrinders/image/upload/v1595574788/85.jpg" />
          <meta property="og:title" content="Bitcoin & Crypto FX Cashback, Margin Trading and eSports" />
          <meta property="og:url" content="https://coinrewards.org" />
          <meta property="og:description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!" />
          <meta property="og:type" content="website" />
          {/********************** twitter share meta  ************************* *}
          <meta name="twitter:title" content="Bitcoin & Crypto FX Cashback, Margin Trading and eSports" />

          <meta name="twitter:description" content=" Bitcoin & Crypto FX cashback, rewards, margin trading, eSports and more!

          <meta name="twitter:image" content=" https://res.cloudinary.com/btcgrinders/image/upload/v1595574788/85.jpg" />

          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
 */