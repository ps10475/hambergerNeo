import React from 'react';
import classes from './Sidedraw.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxx';

const Sidedraw = (props) => {
    let attachedClasses  = [classes.Sidedraw, classes.Close]
    if(props.opened){
        attachedClasses = [classes.Sidedraw, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.opened} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <Logo type='Sidedraw' />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default Sidedraw;
