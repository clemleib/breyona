import React from 'react';

export default function NoScriptMessage() {
    return (
        <div className= "noscriptMessWrapper">
            <div className= "noscriptMessWrapper">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title"><i className="fa fa-exclamation-triangle"></i>JavaScript Required</h2>
                        </div>
                        <div className="modal-body ">
                            <p>It seems like you have NoScript enabled or a similar extension. Unfortunately our rewards platform cannot function without JavaScript. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
