import React from 'react';

// the image for the logo cannot be referenced via the foldere structure 
// because Webpack will bundle it for production deployment and the folder structure will be different
// so, we will have to import the image from the assets folder here in order to tell Wbpack where to get the image from
import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = ( props ) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;