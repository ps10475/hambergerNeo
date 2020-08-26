import React from 'react';
import logo from '../../asset/images/burger-logo.png'
import classes from './Logo.module.scss'

const Logo = (props) => {
    return (
        <div className={[classes.Logo, classes[props.type]].join(' ') }>
            <img src={logo} alt="LogoBurger"/>
        </div>
    );
}

export default Logo;
