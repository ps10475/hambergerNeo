import React from 'react';
import Aux from '../../HOC/Auxx';
import classes from './Layout.module.scss'

const Layout = (props) => {
    return (
        <Aux>
            <div> Toolbar </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;
