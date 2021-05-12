import React from 'react'

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {

        return (

            <div className= "_erroe404Wrapper">
                {this.props.statusCode ?
                    <div className= "errorWrapper">
                        <h1>404</h1>
                        <div className= "errorText">
                            <h2>This page could not be found. What you are looking for is probably located in {<a href="/trading">Trading</a>} , {<a href="/sports">eSports</a>} , or {<a href="/tools">Tools</a>}.</h2>
                        </div>
                    </div>
                :
                    <div className= "errorWrapper">
                        <div className= "errorText">
                            <h2>An unexpected error has occurred.</h2>
                        </div>
                    </div>
            }
            </div>
        )
    }
}

export default Error