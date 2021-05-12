import App, { Container } from 'next/app'
import React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import jsCookie from 'js-cookie';
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { withRouter } from 'next/router';
import 'jquery';
import 'es6-shim';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
// import 'sweetalert2/dist/sweetalert2.min.css';
import NoScriptMessage from '../components/NoScriptMessage';
import Header from '../components/Header';
import Subnav from '../components/Subnav';
import Footer from '../components/Footer';
import '../styles/styles.scss';
import processLogin from '../lib/utils/processLogin';
import Meta from '../components/Meta';
import PageLoader from '../components/PageLoader';
import io from 'socket.io-client';
import JsCookie from 'js-cookie';
import config from '../lib/config';
import setAuthorizationToken from '../lib/utils/setAuthorizationToken';
import SocialShare from '../components/SocialSide';
import { getUserTheme } from '../lib/actions/userAction';

const socket = io.connect(config);

const clearAuth = function () {
  JsCookie.remove('jwtTokenBTCGrinders')
  setAuthorizationToken(null);
}

socket.on('checkPriviledge', (data) => {
  const previousToken = JsCookie.get('jwtTokenBTCGrinders');
  if (previousToken) {
    try {
      const decoded = jwt.verify(previousToken, 'idontgiveadamn');
      const userId = decoded.id;
      if (data.userId === userId) {
        JsCookie.set('jwtTokenBTCGrinders', data.token);
        setAuthorizationToken(data.token);
        window.location.reload();
      }
    } catch (e) {
      clearAuth()
    }
  }
});

socket.on('deleteUser', (data) => {
  const previousToken = JsCookie.get('jwtTokenBTCGrinders');
  if (previousToken) {
    try {
      const decoded = jwt.verify(previousToken, 'idontgiveadamn');
      const userId = decoded.id;
      if (data._id === userId) {
        clearAuth()
        window.location.reload();
      }
    } catch (e) {
      clearAuth();
    }
  }
});

socket.on('logout', async (email) => {
  const previousToken = JsCookie.get('jwtTokenBTCGrinders');
  if (previousToken) {
    try {
      const decoded = await jwt.verify(previousToken, 'idontgiveadamn');
      const userEmail = decoded.email;
      if (email === userEmail) {
        clearAuth()
        window.location.replace('/login');
      }
    } catch (e) {
      clearAuth();
    }
  }
})


class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentPage: "",
      subPage: "",
      hasJs: false
    }
  }

  componentWillMount() {

    //console.log(this.props.router.query.noscript);
    const splitPath = this.props.router.pathname.trim().split("/");
    let { currentPage, subPage } = this.state;
    if (splitPath[1] !== "_error") {
      currentPage = splitPath[1] ? splitPath[1].toLocaleLowerCase() : "";
      subPage = splitPath[2] ? splitPath[2].toLocaleLowerCase() : "";
      //console.log("path stuff ===> ",{currentPage ,subPage});
      this.setState({
        currentPage,
        subPage,
      })
    }
    if (this.props.router.query.slug) {
      //console.log("/*************** slug found ***************/");
      this.setState({
        loading: false
      })
    }

  }

  async componentDidMount() {
  
    this.setState({
      hasJs: true
    });
    /********************* */
    let body = document.querySelector('body');
    if (JsCookie.get('btc_theme')) {
      body.setAttribute('theme', JsCookie.get('btc_theme'));
    } else {
      body.setAttribute('theme', 'light');
    }
    /********************* */
    //const query = this.props.router.asPath.split('?');
    const query = this.props.router.query.ref;

    if (query) {
      jsCookie.set("referral", `?ref=${query}`, { expires: 30 });
    }
    const { dispatch } = this.props.reduxStore;
    if (jsCookie.get('jwtTokenBTCGrinders')) {
      const token = jsCookie.get('jwtTokenBTCGrinders');
      await processLogin(token, dispatch)
    }

    /***
     *
     */
    //check if !logged in
    //JsCookie.get('jwtTokenBTCGrinders')
    if (JsCookie.get('jwtTokenBTCGrinders')) {
      getUserTheme(dispatch).then(({ success, data: theme }) => {
        if (success) {
          // setting data
          if (jsCookie.get("btc_theme") !== theme) {
            body.setAttribute('theme', theme);
            jsCookie.set("btc_theme", theme)
          }
        }
      }).catch(() => {
        // setting data
        /*body.setAttribute('theme', "light");
        jsCookie.set("btc_theme","light")*/
      })
    }/*else{
      if(JsCookie.get('btc_theme')){
        body.setAttribute('theme', JsCookie.get('btc_theme'));
      }else{

        body.setAttribute('theme', 'light');
      }
    }*/
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 300);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { loading, currentPage, subPage, hasJs } = this.state;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Meta />
          {hasJs ?
            <React.Fragment>
              {loading ? (
                <PageLoader />
              ) : (
                  <React.Fragment>
                    <Header />
                    <SocialShare />
                    <Subnav currentPage={currentPage} subPage={subPage} />
                    <Component {...pageProps} />
                    <Footer />
                  </React.Fragment>
                )}
            </React.Fragment> :
            <noscript>
              <Header />
              <NoScriptMessage />
              <Footer />
            </noscript>
          }

        </Provider>
      </Container>
    )
  }
}
/**

 */

export default withRouter(withReduxStore(MyApp))
