import React from 'react';
import classes from './Order.module.scss';

const Order = (props) => {
    let ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }
    let ingredientsSpan = ingredients.map( ( ing, key) => {
        return (
            <span 
                className={classes.Span}
                key={key} 
                > {ing.name} ( <b>{ing.amount}</b> ) 
            </span>
        )
    })
    return (
        <div className={classes.Order}>
            <h3>Đơn hàng:</h3>
            <p>Thành phần bánh: {ingredientsSpan} </p>
            <p>Tổng tiền: <b>{props.totalPrice.toLocaleString('zk-HK')} VNĐ</b> </p>
        </div>
    );
}

export default Order;
