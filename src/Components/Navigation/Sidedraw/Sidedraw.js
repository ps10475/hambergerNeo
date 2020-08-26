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
            <div className={attachedClasses.join(' ')}>
                <Logo type='Sidedraw' />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default Sidedraw;
