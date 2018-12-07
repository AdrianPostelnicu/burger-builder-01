import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    bacon: 1,
    meat: 2,
    ketchup: 0.1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount () {
        axios.get('https://react-my-burger-7d1e5.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients) //here I get the array of keys; in order to get the values i will use map
            .map(igKey => {
                return ingredients[igKey]; //in this way I obtained the array of values; next I need to add the values with reduce
            })
            .reduce((sum, el) => {
                return sum + el;
            } , 0);
        this.setState({purchasable: sum > 0});
    }
    
    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount ;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

            this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        } else {
            return;
        }
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState( { loading: true } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Adi Eu',
                adress: {
                    city: 'Vol',
                    street: 'oarecare strada',
                    country: 'Romania',
                    zipCode: '12345'
                }
            },
            deliveryMethod: 'fastest'
        };

        //when using Firebase we need to provide it with the second level of the (data)
        //structure and it will automatically create it in the backend/DB 
        //must have ".json"
        axios.post('/orders.json', order)
            .then(response => {
                this.setState( { loading: false, purchasing: false } );
            })
            .catch(error => {
                this.setState( { loading: true, purchasing: false } );
            })
            ;
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);