
import React, { Fragment,Component } from 'react'
import { connect } from 'react-redux';
import {changeUserTheme} from '../lib/actions/userAction';
import jsCookie from 'js-cookie';
class ThemeSetting extends Component {
    state = {
        dark:false
    }
    componentDidMount(){
        let {isAuth,theme} = this.props;
        if(isAuth){
            this.setState({
                dark : Boolean(theme === 'dark')
            })
        }else{
            this.setState({
                dark : Boolean(jsCookie.set("btc_theme") === 'dark')
            })
        }
    }

    handleChange = (e)=>{
        e.preventDefault();

        let body = document.querySelector('body');
        let {isAuth} = this.props;

        //console.log(isAuth);
        if(!isAuth){
            if(jsCookie.get("btc_theme")!== 'dark'){
                console.log("dark");
                jsCookie.set("btc_theme",'dark');
                body.setAttribute('theme', "dark");
                this.setState({
                    dark : true
                })
            }else{
                jsCookie.set("btc_theme",'light');
                body.setAttribute('theme', "light");
                this.setState({
                    dark : false
                })
            }
            return;
        }
        //true === dark
        this.props.changeUserTheme(this.props.theme)
        .then(({success,data:theme})=>{
            if(success){
                // setting data
                body.setAttribute('theme', theme);
                jsCookie.set("btc_theme",theme);
                this.setState({
                    dark : Boolean(theme === 'dark')
                })
            }
        }).catch(()=>{
            // setting data
            body.setAttribute('theme', "light");
            jsCookie.set("btc_theme","light");
            this.setState({
                dark : false
            })
        })
    }
    render() {
        //console.log("this.props.theme ",this.props.theme);
        return (
            <Fragment>
                <button className="change-theme-btn" onClick={this.handleChange}>
                    <i className="fas fa-moon"/>
                </button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state)=>({
    theme: state.theme,
    isAuth: !!jsCookie.get('jwtTokenBTCGrinders')
})
export default connect(mapStateToProps,{changeUserTheme})(ThemeSetting);