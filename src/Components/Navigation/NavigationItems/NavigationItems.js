import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Mua Burger</NavigationItem>
            {props.isAuth ? <NavigationItem link='/orders' >Kiểm hàng</NavigationItem> : null}
            {props.isAuth ?
                (
                    <NavigationItem link='/logout' >Logout</NavigationItem>
                ) : (
                    <NavigationItem link='/auth' >Auth</NavigationItem>)
            }

        </ul >
    );
}

export default NavigationItems;
