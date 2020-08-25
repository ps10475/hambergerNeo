import React from 'react';
import classes from './BuildControl.module.scss';

const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                disabled={props.disable} 
                onClick={ props.remove } 
                className={classes.Less}
            >Giảm</button>
            <button 
                onClick={ props.add } 
                className={classes.More}
            >Thêm</button>
        </div>
    );
}

export default BuildControl;
