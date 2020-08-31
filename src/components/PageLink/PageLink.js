import React from 'react';
import './PageLink.css'

function PageLink( {destination, message} ) {
    return(
        <div id="link-container">
        <a id="page-link" href={destination}>{message}</a>
        </div>
    )
}

export default PageLink;