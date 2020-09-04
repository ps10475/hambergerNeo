import React from 'react';
import classes from './Navigation.module.scss';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawToggle from './Sidedraw/DrawToggle/DrawToggle';

const Navigation = (props) => {
    return (
        <div className={classes.Navbar}>
            <DrawToggle clicked={ props.sideDrawToggle } >Menu</DrawToggle>
            <Logo type='Navigation' />
            <nav className={classes.displayNoneNav}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </div>
    );
}

export default Navigation;
