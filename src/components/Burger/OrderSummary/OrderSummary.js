import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

class OrderSummary extends Component {
    //Could very well be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('[ORDER SUMMARY] WillUpdate');  
    }

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform:'capitalize' }} >{igKey} : {this.props.ingredients[igKey]}</span> 
                </li>
            )}
        );
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your burger has the following ingredients: </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Proceed to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number.isRequired,
    purchaseCancelled: PropTypes.func,
    purchaseContinued: PropTypes.func
}

export default OrderSummary;