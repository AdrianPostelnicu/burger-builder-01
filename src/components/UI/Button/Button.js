import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')} // we are joining this array because we have to have a string as className
        onClick={props.clicked}>

        {props.children}
    </button>

);

export default button;