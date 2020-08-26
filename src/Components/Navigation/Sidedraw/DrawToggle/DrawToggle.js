import React from 'react';
import classes from './DrawToggle.module.scss'

const DrawToggle = (props) => {
    return (
        <div 
            onClick={props.clicked}
            className={classes.DrawerToggle}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default DrawToggle;
