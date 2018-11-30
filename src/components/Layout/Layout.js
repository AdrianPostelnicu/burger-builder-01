import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => { 
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Aux> 
                {/* this is a wrapper component that we will use to display all needed content
                it will have a div and a main, for now.
                Toolbar, SideDrawer and Backdrop are components that we will add later on */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/> 
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                {/* in the main section I want to output the component I am wrapping with the layout comp
                and for this I am passing on the props received in the layout comp as param */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;