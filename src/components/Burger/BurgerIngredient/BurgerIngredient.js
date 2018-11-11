import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

//in order to validate the props type using the PropTypes I need to define this component as a class
class BurgerIngredient extends Component {
    render () {
        let ingredient = null;
        //in order to validate the prop types we need to install the prop-types package from npm
        //npm install --save prop-types and then use it for doing the needed validations
        //--save is needed in order to update the package.json file with this dependency
    
        switch (this.props.type) {
            case('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case('bacon'):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default: 
                ingredient = null;
        };
    
        return ingredient;
    }
} 

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;