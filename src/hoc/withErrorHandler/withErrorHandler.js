import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            //reseting the error message for the request - clear any errors
            //we save the reference in a class attr in order to be able to dismiss it afterwards
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState( { error: null } );
                return req;
            });

            //I am interrrested in the error received and not in the response
            //we save the reference in a class attr in order to be able to dismiss it afterwards
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState( { error: error } );
            });
        }

        //remove the interceptors in order to not continue living after the component wrapped
        //has unmounted
        componentWillUnmount () {
            //we free up the stored interceptors by the references we stored as class attr
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null });
        }
        render() {

            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
                
            );
        }
    } 
} 

export default withErrorHandler;