import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Mua Burger</NavigationItem>
            <NavigationItem link='/orders' >Kiểm hàng</NavigationItem> 
        </ul>
    );
}

export default NavigationItems;
