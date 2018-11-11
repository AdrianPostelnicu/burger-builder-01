import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';

const layout = ( props ) => (
    <Aux> 
        {/* this is a wrapper component that we will use to display all needed content
        it will have a div and a main, for now.
        Toolbar, SideDrawer and Backdrop are components that we will add later on */}
        <div>Toolbar, SideDrawer, Backdrop</div> 
        {/* in the main section I want to output the component I am wrapping with the layout comp
        and for this I am passin on the props received in the layout comp as param */}
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;