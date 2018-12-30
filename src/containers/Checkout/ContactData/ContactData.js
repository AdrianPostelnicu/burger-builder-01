import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
         // this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState( { loading: false} );
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState( { loading: true} );
            })
            ;
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/> 
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/> 
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/> 
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
            </div>
        )
    }
}

export default ContactData;