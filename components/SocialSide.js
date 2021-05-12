import React, { Component } from 'react'
import jsCookie from 'js-cookie';

class SocialSide extends Component {
    state = {
        url: '',
        dark: false
    }
    componentDidMount() {
        //URL from current page
        this.setState({
            url: window.location.href
        })

        this.checkingThemeMode()
    }

    checkingThemeMode = () => {
        setInterval(() => {
            const darkMode = jsCookie.get("btc_theme")
            if (darkMode == 'dark' && !this.state.dark) {
                this.setState({ dark: true })
            }
            else if (darkMode == 'light' && this.state.dark) {
                this.setState({ dark: false })
            }
        }, 200)
    }
    render() {
        const { url, dark } = this.state;
        const darkClass = dark ? 'social-dark-class' : ''
        const desc = `CoinRewards.org Highest Crypto Cashback for Crypto Earners`
        //URL patterns for Social media sites share functionalities
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${url}`;
        //https://www.linkedin.com/sharing/share-offsite/?url=
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
        const g = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=${desc}&body=${url}&ui=2&tf=1`;
        return (
            <div className={"sociamedia-wrapper " + darkClass}>
                {
                    dark ?
                        <>
                            <a href={facebookUrl} className="socialmediaBtn " style={{ borderWidth: 1, borderColor: "rgba(0,0,0,.2)", borderStyle: "solid", margin: 0, background: "none", backgroundColor: "none" }} target="_blank">
                                <i class="fab fa-facebook-f" style={{ color: '#010180' }}></i>
                            </a>
                            <a href={twitterUrl} className="socialmediaBtn " style={{ borderWidth: 1, borderColor: "rgba(0,0,0,.2)", borderStyle: "solid", margin: 0, background: "none", backgroundColor: "none" }} target="_blank">
                                <i className="fab fa-twitter" style={{ color: '#010180' }}></i>
                            </a>
                            <a href={g} className="socialmediaBtn " style={{ borderWidth: 1, borderColor: "rgba(0,0,0,.2)", borderStyle: "solid", margin: 0, background: "none", backgroundColor: "none" }} target="_blank">
                                <i className="fa fa-envelope" style={{ color: '#010180' }}></i>
                            </a>
                            <a href={linkedinUrl} className="socialmediaBtn " style={{ borderWidth: 1, borderColor: "rgba(0,0,0,.2)", borderStyle: "solid", margin: 0, background: "none", backgroundColor: "none" }} target="_blank">
                                <i className="fab fa-linkedin" style={{ color: '#010180' }}> </i>
                            </a>
                        </>
                        :
                        <>
                            <a href={facebookUrl} className="socialmediaBtn face" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href={twitterUrl} className="socialmediaBtn tw" target="_blank">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href={g} className="socialmediaBtn gmail" target="_blank">
                                <i className="fa fa-envelope"></i>
                            </a>
                            <a href={linkedinUrl} className="socialmediaBtn linin" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </>
                }

            </div>
        )
    }
}


export default SocialSide;