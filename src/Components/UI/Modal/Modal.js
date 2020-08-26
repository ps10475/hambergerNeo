import React from 'react';
import classes from './Modal.module.scss'
import Aux from '../../../HOC/Auxx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show}  clicked = {props.closePurchase}/>
            <div className={classes.Modal}
                style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' }}
            >
                {props.children}
            </div>
        </Aux>
    );  
}

export default Modal;
