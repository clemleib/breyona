
const express = require('express')
const next = require('next')
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use(compression());

  server.get('/blog/:slug', (req, res) => {
    const actualPage = '/single'
    const queryParams = { slug: req.params.slug }
    app.render(req, res, actualPage, queryParams)
  })
/*
  server.get("/poker/", (req, res) => {
    const actualPage = "/poker";
    app.render(req, res, actualPage, {});
  });*/

  server.get("/home/", (req, res) => {
    const actualPage = "/home";
    app.render(req, res, actualPage, {});
  });
  server.get("/", (req, res) => {
    const actualPage = "/home";
    app.render(req, res, actualPage, {});
  });
  // Sports line
  server.get("/IntertopSports", (req, res) => {
    const actualPage = "/sports/IntertopSports";
    app.render(req, res, actualPage, {});
  });
  server.get("/Fairlay", (req, res) => {
    const actualPage = "/sports/Fairlay/";
    app.render(req, res, actualPage, {});
  });
  server.get("/NitrogenSports", (req, res) => {
    const actualPage = "/sports/NitrogenSports";
    app.render(req, res, actualPage, {});
  });
  server.get("/SportsBet", (req, res) => {
    const actualPage = "/sports/SportsBet";
    app.render(req, res, actualPage, {});
  });
  server.get("/5Dimes", (req, res) => {
    const actualPage = "/sports/5Dimes";
    app.render(req, res, actualPage, {});
  });
  server.get("/BitcoinRush", (req, res) => {
    const actualPage = "/sports/BitcoinRush";
    app.render(req, res, actualPage, {});
  });
  server.get("/CloudBet", (req, res) => {
    const actualPage = "/sports/CloudBet";
    app.render(req, res, actualPage, {});
  });

  //trading
  server.get("/Binancej", (req, res) => {
    const actualPage = "/trading/Binancej";
    app.render(req, res, actualPage, {});
  });
  server.get("/Binance", (req, res) => {
    const actualPage = "/trading/Binance";
    app.render(req, res, actualPage, {});
  });
  server.get("/Mercatox", (req, res) => {
    const actualPage = "/trading/Mercatox";
    app.render(req, res, actualPage, {});
  });
  server.get("/BtcBit", (req, res) => {
    const actualPage = "/trading/BtcBit";
    app.render(req, res, actualPage, {});
  });
  server.get("/Livecoin", (req, res) => {
    const actualPage = "/trading/Livecoin";
    app.render(req, res, actualPage, {});
  });
  server.get("/LBC", (req, res) => {
    const actualPage = "/trading/LBC";
    app.render(req, res, actualPage, {});
  });
  server.get("/Changelly", (req, res) => {
    const actualPage = "/trading/Changelly";
    app.render(req, res, actualPage, {});
  });
  server.get("/Paybis", (req, res) => {
    const actualPage = "/trading/Paybis";
    app.render(req, res, actualPage, {});
  });
  server.get("/Virwox", (req, res) => {
    const actualPage = "/trading/Virwox";
    app.render(req, res, actualPage, {});
  });
// TOOLS
server.get("/TradingView", (req, res) => {
  const actualPage = "/tools/TradingView";
  app.render(req, res, actualPage, {});
});
server.get("/Torguard", (req, res) => {
  const actualPage = "/tools/Torguard";
  app.render(req, res, actualPage, {});
});
server.get("/Orange", (req, res) => {
  const actualPage = "/tools/Orange";
  app.render(req, res, actualPage, {});
});
server.get("/CoinTracking", (req, res) => {
  const actualPage = "/tools/CoinTracking";
  app.render(req, res, actualPage, {});
});


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
