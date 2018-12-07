import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

//Lecture 145: Performance - turn Modal in Class component so we control when 
//       it should update & implicitly the OrderSummary component as well
//       because otherwise they are always rendered&updated, even if not visible(show=false)

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        //checking to see if the show prop has changed, basically if I should open the modal
        //add the second check for displaying the spinner
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[MODAL] WillUpdate');
    }

    render () {
        return (
            <Aux>
                <Backdrop show={ this.props.show } clicked={this.props.modalClosed}/>
                <div className={ classes.Modal }
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;