import React from 'react';
import Aux from '../../HOC/Aux';
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
