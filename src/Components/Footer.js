import React from 'react';

const Footer = () => {
    return(
        <div className="container-fluid bg-dark">
            <div className="row">
                <div className="col-2">
                <i class="fa fa-github-alt" onClick={() => window.open('https://github.com/mohit2308jain', "_blank")}></i>
                </div>
                <div className="col-2">
                <i class="fa fa-github-alt" onClick={() => window.open('https://github.com/mohit2308jain', "_blank")}></i>
                </div>
                <div className="col-2">
                <i class="fa fa-linkedin-square" onClick={() => window.open('https://github.com/mohit2308jain', "_blank")}></i>
                </div>
            </div>
        </div>
    )
}

export default Footer;