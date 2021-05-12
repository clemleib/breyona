import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import apiUrl from "../lib/config"
import YouTube from "react-youtube"
import {withRouter} from 'next/router';
import {Helmet} from "react-helmet";
import Head from "next/head";
import _ from 'lodash';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
} from "react-share";

class Single extends Component {

  constructor(props) {
    super(props)
    this.state = {
      blogpost: {},
      blogposts: [],
      recent: [],
      changeIcon: false,
      blogCategories: [],
      blogArchives: [],
      blogCountByMonth: [],
      blogArchiveByMonth: [],
      blogs: [],
      error: false,
      href :""
    }
    this.archive = this.archive.bind(this)
  }

  componentWillMount() {
    axios.get(`${apiUrl}/api/blog`).then((res) => {
      if (res.data.success) {
        const date = function (d=moment().format("YYYY")) {
          return moment(d.date).format('YYYY');
        }
        this.setState({
          blogposts: res.data.success,
          blogs: res.data.success,
          blogCategories: _(res.data.success).countBy('category').map((count, name) => ({ name, count })).value(),
          blogArchives: _(res.data.success).countBy(date).map((count, date) => ({ date, count })).value()
        });
      }
    })

    axios.get(`${apiUrl}/api/blog/postById?slug=${this.props.router.query.slug}`).then((res) => {
      if (res.data.success) {
        this.setState({ blogpost: res.data.success })
        // this.props.setUserProfile(res.data.success)
      } else this.setState({ error: true })
    })

    axios.get(`${apiUrl}/api/blog/recent`).then((res) => {
      if (res.data.success) {
        this.setState({ recent: res.data.success })
      }
    })
  }
  componentDidMount(){
    this.setState({
      href: window.location.href
    })
  }
  archive(date) {
    if(!date) return
    var day = moment(date).date();
    var month = moment(date).month() + 1;
    var year = moment(date).year();
    if (day != '' && month != '' && year != '') {
      window.location.assign(`/archive?day=${day}&month=${month}&year=${year}`)
    }
  }
  getBlogByCategory(blogCategory) {
    const fliterBlog = this.state.blogs.filter(function (blog) {
      return blog.category == blogCategory;
    });
    this.setState({ blogposts: fliterBlog });
  }
  getArchiveBlogByDate(year) {
    const month = function (d=moment().format("YYYY")) {
      return moment(d.date).format('MMMM');
    }
    const fliterBlog = this.state.blogs.filter(function (blog) {
      if(blog.date)
      return moment(blog.date).format('YYYY') == year;
      else return
    });
    this.setState({
      blogposts: fliterBlog,
      blogCountByMonth: _(fliterBlog).countBy(month).map((count, date) => ({ date, count })).value(),
      blogArchiveByMonth: fliterBlog,
      changeIcon: !this.state.changeIcon
    });
  }
  getArchiveBlogByMonth(month) {
    const fliterBlog = this.state.blogArchiveByMonth.filter(function (blog) {
      if(blog.date)
      return moment(blog.date).format('MMMM') == month;
      else return
    });
    this.setState({ blogposts: fliterBlog });
  }
  render() {
    const { title, description, link, imgUrl } = this.state.blogpost;
    const slug = this.props.router.query.slug;
    return (
      //user "Helmet" the same as "Head"
      <React.Fragment>
        <Head>
          {/******meta here  */}
          <title>Bitcoin & Crypto FX cashback and Rewards</title>
          <link rel="shortcut icon" type="image/x-icon" href="https://res.cloudinary.com/btcgrinders/image/upload/v1559953935/bitcoin-grinders-logo-rakeback-cashback-crypto.jpg" />
          <meta name="description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!"
          />

          <meta name="keywords" content="Bitcoin, crypto, cryptocurrency, crypto trading, cryptocurrency trading, bitcoin trading, bitcoin exchanges, margin trading, litecoin, ethereum, dash, bitcoin cash, sports betting discount, bitcoin free bitcoin, dash, bitcoin sports, litecoin sports, bitcoin cash, ether, ether free bitcoin, ethereum savings, ethereum trading"
          />

          <meta name="robots" content="index, follow" />

          <meta name="revisit-after" content="7 days" />
          <meta name="google-site-verification" content="ZSBhlzoympbif6myYvHGYYPi7wbzkra6hYw8uE5G7RQ" />

          <meta property="og:image" content= {this.state.blogpost.imgUrl} />
          <meta property="og:title" content= {this.state.blogpost.title}/>
          <meta property="og:url" content= {this.state.href} />
          <meta property="og:description" content="Bitcoin and Crypto Cashback, Exchange Fee Rebate, eSports cashback, betback, sports betting cashback, bonuses, rebates, bitcoin rewards & more!" />
          <meta property="og:type" content="website" />
          {/************* twitter share meta **************/}
          <meta name="twitter:title" content= {this.state.blogpost.title} />
          <meta name="twitter:image" content= {this.state.blogpost.imgUrl} />
          <meta name="twitter:description" content="Exclusive Crypto Crypto Rewards, Exchange Fee Rebate, Sports betting cashback, betback, bonuses, rebates, bitcoin rewards & more!"/>

        </Head>
          {this.state.error === false ?
            <section id="main" className="sec-pad">
              <div className="container">
                <div className="row">
                  <div className="col-md-10" style={{ borderRight: '1px solid #000080' }}>
                    <div className="single-post">
                      <div className="post-thumbnail">
                        {link ?
                          <YouTube
                            videoId={link}
                            opts={{
                              width: '100%',
                              playerVars: { // https://developers.google.com/youtube/player_parameters,
                                autoplay: 0
                              }
                            }}
                            onReady={this._onReady}
                          />
                          : <img src={`${imgUrl}`} style={{maxWidth:"100%"}}/>
                        }

                      </div>
                      <div className="post-content">
                        <h4 className="post-title"><a href="">{this.state.blogpost.title}</a></h4>
                        <h6 className="date"> {moment(this.state.blogpost.date).format("LL")} <span style={{ float: 'right' }}></span></h6>
                        <p className="post" dangerouslySetInnerHTML={{ __html: this.state.blogpost.description }}></p>
                        <style>{`
                          .post img{max-width:100% !important}

                        `}
                        </style>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="blog-sidebar">
                      <div className="archive">
                        <h3 className="sidebar-title">
                          Go to  Archive
                      </h3>
                        <ul>
                          {this.state.blogArchives.map((post,key) => (
                            <li key={key*Math.random(15321)}
                            onClick={() => this.getArchiveBlogByDate(post.date)}>
                              {this.state.changeIcon ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-right" />}
                              <a href='/blog'>{`  ${post.date} (${post.count})`}</a>
                            </li>
                          ))}
                          {this.state.changeIcon &&
                            <ul>
                              {this.state.blogCountByMonth.map((post) => (
                                <li onClick={() => this.getArchiveBlogByMonth(post.date)}>
                                  <i className="fa fa-hand-o-right" />
                                  <a href='/blog'>{`  ${post.date} (${post.count})`}</a>
                                </li>
                              ))}
                            </ul>
                          }
                        </ul>
                        {/* <DatePicker
                        dateFormat="YYYY/MM/DD"
                        placeholderText="YYYY/DD/MM"
                        onChange={this.archive}
                        minDate={moment('2000-01-02')} /> */}
                        {/* <input type="date" onChange={this.archive} name= "bday" min="2000-01-02" /> */}
                      </div>
                      {/* <!-- Recent Post --> */}
                      <div className="recent-post">
                        <h3 className="sidebar-title">
                          Recent Posts
                        </h3>
                        <ul>
                          {this.state.recent.map((post, key) => (
                            <li key={key}><a href={`/blog/${post.slug}`}>{post.title}</a></li>
                          ))}
                        </ul>
                      </div>
                      {/* blog category */}
                      <div className="blog-category">
                        <h3 className="sidebar-title">
                          Blog Categories
                      </h3>
                        <ul>
                          {this.state.blogCategories.map((post,key) => (
                            <li key={key*Math.random(15321)}
                            onClick={() => this.getBlogByCategory(post.name)}>
                              <i className="fa fa-hand-o-right" />
                              <a href='/blog'>{`  ${post.name} (${post.count})`}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section> :
            <div className="row">
              <div className="col-sm-12 align-center" style={{ marginTop: '80px' }}>
                <center>
                  <h1>404</h1>
                  <h5>This post has been moved or does not exits</h5>
                </center>
              </div>
            </div>
        }
      </React.Fragment>
    );
  }
}

export default withRouter(Single);
