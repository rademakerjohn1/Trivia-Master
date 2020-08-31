import React from 'react';
import './PageLink.css'

function PageLink( {destination, message} ) {
    return(
        <a className="page-link" href={destination}>{message}</a>
    )
}

export default PageLink;