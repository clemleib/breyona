import React from 'react'

export default function InlineSocial({url}) {
    //URL from current page
    const desc = `CoinRewards.org - Crypto Rakeback, Cashback, Rebates and more`
    //URL patterns for Social media sites share functionalities
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${url}`;
    //https://www.linkedin.com/sharing/share-offsite/?url=
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
    const g = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=${desc}&body=${url}&ui=2&tf=1`;
    return (
        <div className="inline-sociamedia-wrapper">

            <a href= {facebookUrl} className="inline-socialmediaBtn inline-face" target="_blank">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href= {twitterUrl} className="inline-socialmediaBtn inline-tw" target="_blank">
                <i className="fab fa-twitter"></i>
            </a>
            <a href= {g} className="inline-socialmediaBtn inline-gmail" target="_blank">
                <i className="fa fa-envelope"></i>
            </a>
            <a href= {linkedinUrl} className="inline-socialmediaBtn inline-linin" target="_blank">
                <i className="fab fa-linkedin"></i>
            </a>
        </div>
    )
}
