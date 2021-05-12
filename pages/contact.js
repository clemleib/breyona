import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from '../lib/config';
import Captcha from 'react-captcha';
import swal from 'sweetalert2';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      message: '',
      success: '',
      error: '',
      category: '',
      additionalInfo: '',
      showBtn: false,
      url: '',
    };
    this.typing = this.typing.bind(this);
    this.submit = this.submit.bind(this);
    this.crecaptcha = this.crecaptcha.bind(this);
  }

  typing(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  crecaptcha(value) {
    axios.post(`${apiUrl}/api/users/confirmRecaptcha`, { value: value }).then(res => {
      if (res.data.success) this.setState({ showBtn: true });
    });
  }
  submit(e) {
    e.preventDefault();

    {
      this.state.showBtn
        ? (this.setState({ isLoading: true, success: '', error: '' }),
          axios
            .post(`${apiUrl}/api/users/contact`, this.state)
            .then(res => {
              console.log(res);
              if (res.data.success) {
                this.setState({ success: true, isLoading: false });
                setTimeout(() => {
                  this.setState({ success: false });
                }, 3000);
              } else this.setState({ error: true, isLoading: false });
              this.setState({ isLoading: false });
            })
            .catch(err => {
              this.setState({ error: true, isLoading: false });
              setTimeout(() => {
                this.setState({ error: false });
              }, 3000);
            }, e.target.reset()))
        : swal.fire({
            title: 'Alert',
            html: 'Please verify that you are not a robot! by selecting the captcha',
            type: 'warning',
            allowOutsideClick: false,
          });
    }
  }
  render() {
    return (
      <section id="main" className="sec-pad">

<div className="container">
       
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <div className="contact-form">
              <br /> <br />
                <h2 className="contact-title">Let's work together! We can expand your business.</h2>

                 <div className="partner-img">
        
              
              </div>
                <div className="contac-info">
                 
                </div>
                <h5>Please complete this form to the best of your abilities. We will contact you within one business day.</h5> <br />
                {this.state.success === true ? (
                  <div className="alert alert-success">This has been sent successfully!</div>
                ) : null}
                {this.state.error === true ? (
                  <div className="alert alert-danger">An error has occured. Please try again or contact support!</div>
                ) : null}
                <form onSubmit={this.submit}>
                  <div className="full-input">
                    <input required type="email" onChange={this.typing} name="email" placeholder="Enter Your Email" />
                  </div>
                  <div className="full-input">
                    <input
                      type="text"
                      onChange={this.typing}
                      name="subject"
                      placeholder="Subject (optional)"
                    />
                  </div>
                  <div className="full-input">
                    <input
                      type="text"
                      onChange={this.typing}
                      name="url"
                      placeholder="Enter Your Website URL (optional)"
                    />
                  </div>
                  <div className="full-input form-group" style={{ padding: 0, marginBottom: 0 }}>
                    <select name="category" onChange={this.typing} id="category" className="form-control">
                      <option>Select Your Service Category</option>
                      <option value="exchange">Exchange</option>
                      <option value="sports">Sports</option>
                      <option value="tools">Tools</option>
                      <option value="others">Other</option>
                    </select>
                  </div>
                  <div className="full-input">
                    <input
                      type="text"
                      onChange={this.typing}
                      name="additionalInfo"
                      placeholder="Enter the % commission you want to give (optional)"
                    />
                  </div>
                  <div className="full-input">
                    <textarea
                      rows="7"
                      required
                      name="message"
                      onChange={this.typing}
                      placeholder="Enter Your Message"
                    />
                  </div>

                  {/* <!-- Replace data-sitekey with your own one, generated at https://www.google.com/recaptcha/admin --> */}
                  <center>
                    {' '}
                    <Captcha
                      sitekey="6LdUlpYUAAAAAJfpbB2j74ZY4X5DTbhF0HtqmXI3"
                      lang="en"
                      theme="light"
                      type="image"
                      callback={value => this.setState({ rvalue: value }, () => this.crecaptcha(value))}
                    />
                  </center>
                  {/* {this.state.showBtn ? ( */}
                  <button className="cmn-btn">
                    {this.state.isLoading ? (
                      <span>
                        <i className="fa fa-spin fa-spinner" style={{ marginRight: '5px' }} /> Sending
                      </span>
                    ) : (
                      'Send'
                    )}
                  </button>
                  {/* ) : null} */}
                </form>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
        
      </section>
    );
  }
}

export default Contact;