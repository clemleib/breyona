import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import apiUrl from "../lib/config"
import DatePicker from 'react-datepicker';

class Archive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogposts: [],
      recent: [],
      title: "",
      result: [],
      search: false,
      searching: false
    }
    console.log(this.props, this.state);
    this.archive = this.archive.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillMount() {
    axios.get(`${apiUrl}/api/blog/recent`).then((res) => {
      if (res.data.success) {
        this.setState({ recent: res.data.success })
        // this.props.setUserProfile(res.data.success)
      } else console.log(res)
    })
    axios.get(`${apiUrl}/api/blog/searchByDate${window.location.search}`).then((res) => {
      console.log(window.location.search, res)
      if (res.data.result) {
        this.setState({ result: res.data.result, search: true });
      }
    });
  }

  typing(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, searching: true }, (state) => {
      console.log(this.state.title)
      axios.get(`${apiUrl}/api/blog/searchByDate${window.location.search}&title=${this.state.title}`).then((res) => {
        if (res.data.result) {
          console.log(res)
          this.setState({ result: res.data.result, search: true });
          this.setState({ searching: false })
        }
      });
    })
  }
  archive(date) {
    var day = moment(date).date();
    var month = moment(date).month() + 1;
    var year = moment(date).year();
    if (day != '' && month != '' && year != '') {
      window.location.assign(`/archive?day=${day}&month=${month}&year=${year}`)
    }
  }
  splice(text, slug) {
    if (text.length > 80) {
      var split = text.substr(0, 80)
      split += "... Read more"
      return split;
    }
    else return text;
  }
  submit(e) {
    e.preventDefault();
    window.location.assign(`/archive${window.location.search}&title=${this.state.title}`)


  }
  render() {
    var s = "this is a sample string"
    var sub = s.substr(0, 10)
    console.log(sub + "...")
    return (
      <section id="main" className="sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.submit}>
                <input type="text" name="title" placeholder="search" required className="search-input" onChange={this.typing.bind(this)} />
                <button type="submit" className="cmn-btn search-btn">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9" style={{ borderRight: '1px solid #000080' }}>
              <div className="row">
                {this.state.search && this.state.result.length > 0 ?
                  <div className="col-sm-12">
                    <h5>{this.state.result.length} search result found for "{this.state.title}"</h5>
                  </div> : null}
                {
                  this.state.search ?
                    this.state.result.map((post, key) => (
                      <div className="col-sm-12">
                        <div className="post-list" key={key}>
                          <div className="post-thumbnail">
                            <img src={`${post.imgUrl}`} />
                          </div>
                          {/* <span style={{ float: 'right' }}><i className="fa fa-comments"> 20</i></span> */}
                          <div className="post-content">
                            <h4 className="post-title"><a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>{post.title}</a></h4>
                            <h6 className="date">{moment(post.date).format("LL")}</h6>
                            <p className="post" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                            <style>{`
                              .post img{width:100% !important}
                            `}
                            </style>
                            {/* <p>{post.description}</p> */}
                          </div>
                        </div>
                      </div>
                    ))
                    : window.location.search === "" ?
                      this.state.blogposts.map((post, key) => (
                        <div className="col-sm-12">
                          <div className="post-list" key={key}>
                            <div className="post-thumbnail">
                              <img src={`${post.imgUrl}`} />
                            </div>
                            <div className="post-content">
                              <h4 className="post-title"><a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>{post.title}</a></h4>
                              <h6 className="date">{moment(post.date).format("LL")}<span style={{ float: 'right' }}><i className="fa fa-comments"> 20</i></span></h6>
                              <p className="post" dangerouslySetInnerHTML={{ __html: this.splice(post.description) }}></p>
                              {/* <p id="desc">{this.splice(post.description)}</p> */}
                            </div>
                          </div>
                        </div>
                      ))
                      : <div className="center-align">
                        No search result found
                        </div>
                }
                {this.state.search && this.state.result.length === 0 ?
                  <div className="center-align">
                    <h5>No search result found for "{this.state.title}"</h5>
                  </div> : null}
              </div>

            </div>
            <div className="col-md-3">
              <div className="blog-sidebar">
                <div className="archive">
                  <h3 className="sidebar-title">
                    Go to  Archive
              </h3>
                  <DatePicker
                    dateFormat="YYYY/MM/DD"
                    placeholderText="YYYY/DD/MM"
                    onChange={this.archive}
                    minDate={moment('2000-01-02')} />
                  {/* <input type="date" onChange={this.archive} name="bday" min="2000-01-02" /> */}

                </div>
                {/* <!-- Recent Post --> */}
                <div className="recent-post">
                  <h3 className="sidebar-title">
                    Recent Posts
              </h3>
                  <ul>
                    {this.state.blogposts.map((post, key) => (
                      <li key={key}><a href={`/blog/${post.slug}`}>{post.title}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default Archive;

