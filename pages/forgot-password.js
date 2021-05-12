import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from "../lib/config"
import Captcha from "react-captcha"
class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email:"",
      success:"",
      error:"",
      rvalue:"",
      showBtn:false,
      captcha1: "",
      answer: "",
      question: "",
      isLoading:false,
    }
    this.gen = this.gen.bind(this);
    this.onChange = this.onChange.bind(this);
    this.typing = this.typing.bind(this)
    this.submit = this.submit.bind(this)
    this.crecaptcha = this.crecaptcha.bind(this)
  }
  componentWillMount(){
    this.gen();
  }
  typing(e){
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }
  crecaptcha(value){
    axios.post(`${apiUrl}/api/users/confirmRecaptcha`, {value : value}).then((res) => {
      if(res.data.success) this.setState({showBtn:true})
    })
  }
  gen() {
    var x = Math.round(Math.random() * 6) + 1
    var y = Math.round(Math.random() * 6) + 1;
    var question = `What is ${Math.floor(x)} x ${Math.floor(y)}?`;
    var answer = Math.floor(x) * Math.floor(y);
    this.setState({ answer, question })
    return "question"
  }
  submit(e){
    e.preventDefault();
    this.setState({isLoading:true,success:"",error:"" })
    if(this.state.answer === parseInt(this.state.captcha1)){
      console.log("cap true")
      axios.post(`${apiUrl}/api/users/resetPassword`,this.state).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.setState({ success: true,isLoading:false});
          setTimeout(() => {
            this.setState({ success: false })
            this.props.router.push("/login")
          }, 3000);
        } else this.setState({ error: true,isLoading:false });
        this.setState({ isLoading: false })
        
      }).catch((err) => {
        this.setState({ error: true,isLoading:false })
        setTimeout(() => {
          this.setState({ error: false })
        }, 3000);
      })

    }else{
      console.log("ans ",this.state.answer)
      console.log("cap " ,this.state.captcha1)
      this.setState({
        error: "Captcha verification failed",
        isLoading: false
      });
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(){
return (
  <section id="main" className="sec-pad" style={{padding:"100px 0px 0px"}}>
    <div className="container">
      <div className="row text-center">
        <div style={{ width: '40%', margin: '0 auto' }}>
        {this.state.error &&
                <div className="alert alert-danger">
                  {this.state.error}
                </div>
              }
          {this.state.success === true ? <div className="alert alert-success">Password reset was successful</div> : null}
        <form onSubmit={this.submit}>
          <input type="email" required onChange={this.typing} name="email" placeholder="Enter Your User Email" />
          <div className="form-group">
              <label htmlFor="loginPassword">
                {this.state.question}
              </label>
              <input
                      type="number"
                      className="form-control"
                      id="captcha1"
                      placeholder="Enter the answer here"
                      name="captcha1"
                      onChange={this.onChange}
                    />
          </div>
          {this.state.isLoading? 
          <button className="cmn-btn newbtnStyle" style={{marginTop:"5px"}} >
              <span><i className="fa fa-spin fa-spinner" style={{ marginRight: "5px" }}></i> Resetting</span>
          </button>:
          <button className="cmn-btn newbtnStyle" style={{marginTop:"5px"}} >
              Reset
          </button>
          }
          </form>
        </div>
      </div>
    </div>
  </section>
);
  }
}
export default ForgotPassword;
