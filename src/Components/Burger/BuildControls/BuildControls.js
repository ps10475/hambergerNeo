import React from 'react';
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'Meat' },
    { label: 'Salad', type: 'Salad' },
    { label: 'Bacon', type: 'Bacon' },
    { label: 'Cheese', type: 'Cheese' }
]
const BuildControls = (props) => {
    let price = props.totalPrice.toLocaleString("zh-HK");
    console.log(!props.purchasable);
    return (
        <div className={classes.BuildControls}>
            <p className={classes.TotalPrice}> Tổng tiền: { price } VNĐ </p>
            {controls.map((ctrl, index) => (
                <BuildControl 
                    key={ index } 
                    label={ ctrl.label } 
                    add = { () => props.addIngredient(ctrl.type) } 
                    remove = { ()=> props.removeIngredient(ctrl.type) }
                    disable = { props.disableBtn[ctrl.type] }
                    />
            ))}
            <button onClick={props.purchasing} disabled={!props.purchasable} className={classes.OrderButton}>ĐẶT HÀNG</button>
        </div>
    );
}

export default BuildControls;
