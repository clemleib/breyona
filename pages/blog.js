import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import apiUrl from "../lib/config";
import _ from 'lodash';

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogposts: [],
      recent: [],
      title: "",
      result: [],
      search: false,
      searching: false,
      changeIcon: {},
      blogCategories: [],
      blogArchives: [],
      blogCountByMonth: [],
      blogArchiveByMonth: [],
      blogs: [],
      blogArcRefac: {}
    }
    this.archive = this.archive.bind(this)
  }
  componentWillMount() {
    axios.get(`${apiUrl}/api/blog`).then((res) => {
      if (res.data.success) {
        const date = function (d) {
          return moment(d.date).format('YYYY');
        }
        let blogArc = _(res.data.success).countBy(date).map((count, date) => ({ date, count })).value();
        this.setState({
          blogposts: res.data.success,
          blogs: res.data.success,
          blogCategories: _(res.data.success).countBy('category').map((count, name) => ({ name, count })).value(),
          blogArchives: blogArc.reverse()
        });
        blogArc.map(val=>{
          this.setState({
            changeIcon:{
              [val.date]:false
            }
          })
        })
      } else console.log(res)
    })
    axios.get(`${apiUrl}/api/blog/recent`).then((res) => {
      if (res.data.success) {
        this.setState({ recent: res.data.success })
        // this.props.setUserProfile(res.data.success)
      } else console.log(res)

    })
    if (window.location.search !== "")
      axios.get(`${apiUrl}/api/blog/search${window.location.search}`).then((res) => {
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
      axios.get(`${apiUrl}/api/blog/search?title=${this.state.title}`).then((res) => {
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
    if (text.length > 100) {
      var StrippedString =  text.replace(/(<([^>]+)>)/ig,"");
      var split = StrippedString.substr(0, 180)
      const alink2 = "single?slug=" + slug;
      split += "..."
      split += '<a href=' + alink2 + '> Read more</a>';
      return split
    }
    else return text
  }
  getBlogByCategory(blogCategory) {
    const fliterBlog = this.state.blogs.filter(function (blog) {
      return blog.category == blogCategory;
    });
    this.setState({ blogposts: fliterBlog });
  }
  getArchiveBlogByDate = (e)=> {
    console.log("getArchiveBlogByDate");
    let year = e.currentTarget.dataset.year;
    const month = function (d) {
      return moment(d.date).format('MMMM');
    }
    const fliterBlog = this.state.blogs.filter(function (blog) {
      return moment(blog.date).format('YYYY') == year;
    });
    let newval = this.state.changeIcon[year]
    newval={[year] : !this.state.changeIcon[year]}
    this.setState({
      blogposts: fliterBlog,
      blogCountByMonth: _(fliterBlog).countBy(month).map((count, date) => ({ date, count })).value(),
      blogArchiveByMonth: fliterBlog,
      changeIcon: newval
    });
  }
  getArchiveBlogByMonth = (e)=>{
    console.log("getArchiveBlogByMonth");
    let month = e.currentTarget.dataset.month;
    const fliterBlog = this.state.blogArchiveByMonth.filter(function (blog) {
      return moment(blog.date).format('MMMM') == month;
    });
    this.setState({ blogposts: fliterBlog });
  }
  render() {
    return (
      <section id="main" className="sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <form action={`/blog?title=${this.state.title}`}>
                <input type="text" name="title" placeholder="search" required className="search-input" onChange={this.typing.bind(this)} />
                <button type="submit" className="cmn-btn search-btn">Search</button>
              </form>
            </div>
          </div>
          <div className="row" style={{paddingTop:"15px"}}>
            <div className="col-md-10" style={{borderRight: '1px solid #000080'}}>
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
                            <a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>
                              <img src={`${post.imgUrl}`} />
                            </a>
                          </div>
                          <div className="post-content">
                            <h4 className="post-title"><a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>{post.title}</a></h4>
                            <h6 className="date">{moment(post.date).format("LL")}<span style={{ float: 'right' }}></span></h6>
                            <p className="blog-desc" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                          </div>
                        </div>
                      </div>
                    ))
                    : window.location.search === "" ?
                      this.state.blogposts.map((post, key) => (
                        <div className="col-sm-12" key = {Math.random(key*10000)}>
                          <div className="post-list" key={key}>
                            <div className="post-thumbnail">
                              <a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>
                                <img src={`${post.imgUrl}`} />
                              </a>
                            </div>
                            <div className="post-content">
                              <h4 className="post-title"><a href={`blog/${post.slug}`} style={{ textTransform: "capitalize" }}>{post.title}</a></h4>
                              <h6 className="date">{moment(post.date).format("LL")}<span style={{ float: 'right' }}></span></h6>
                              <p id="desc" className="blog-desc" dangerouslySetInnerHTML={{ __html: this.splice(post.description, post.slug) }}></p>
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
            <div className="col-md-2">
              <div className="blog-sidebar">
                <div className="archive">
                  <h3 className="sidebar-title">
                    Go to Archive
                  </h3>
                  <ul>
                    {this.state.blogArchives.map((post, key) => (
                      <li onClick={this.getArchiveBlogByDate} data-year={post.date}
                      key={Math.random(key*100000)}>
                        {this.state.changeIcon[post.date] ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-right" />}
                        <a>{`  ${post.date} (${post.count})`}</a>
                        {/*this.state.changeIcon[post.date] &&
                          <ul>
                            {this.state.blogCountByMonth.map((post,k) => (
                              <li onClick={this.getArchiveBlogByMonth}
                              data-month={post.date} key={k*6341684/58441}>
                                <i className="fa fa-hand-o-right" />
                                <a>{`  ${post.date} (${post.count})`}</a>
                              </li>
                            ))}
                          </ul>
                        */}
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {this.state.blogArchives.map((post, key) => (
                      <React.Fragment>
                        {this.state.changeIcon[post.date] &&
                          <ul>
                            {this.state.blogCountByMonth.map((post,k) => (
                              <li onClick={this.getArchiveBlogByMonth}
                              data-month={post.date} key={k*6341684/58441}>
                                <i className="fa fa-hand-o-right" />
                                <a>{`  ${post.date} (${post.count})`}</a>
                              </li>
                            ))}
                          </ul>
                        }
                      </React.Fragment>
                    ))}
                  </ul>
                  {/* <DatePicker
                    dateFormat="YYYY/MM/DD"
                    placeholderText="YYYY/DD/MM"
                    onChange={this.archive}
                    minDate={moment('2000-01-02')} /> */}
                  {/* <input type="date" onChange={this.archive} name= "bday" min="2000-01-02" /> */}

                </div>
                {/* Recent Post */}
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
                      <li onClick={() => this.getBlogByCategory(post.name)} key={key*Math.random(15321)}>
                        <i className="fa fa-hand-o-right" />
                        <a href="#!">{`  ${post.name} (${post.count})`}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
                   .post-content .blog-desc a{
                    color:blue;

                    }
                    .post-content .blog-desc a:hover{
                    text-decoration: underline;

                    }

                `}
        </style>
      </section>
    );
  }
}


export default Blog;
