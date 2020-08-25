import React from 'react';
import Aux from '../../../HOC/Aux';

const OrderSummary = (props) => {
    const ingredients = props.ingredients;
    let ingredientLi = Object.keys(ingredients)
        .map(igKey => {
            return <li> <span> {igKey} </span> : {ingredients[igKey]} </li>
        })

    return (
        <Aux>
            <h3>Đơn hàng:</h3>
            <p>Tổng các phần mà bạn đã đặt là:</p>
            <ul>
                { ingredientLi }
            </ul>
            <p>Thành phần trong bánh đã đúng chưa?</p>
        </Aux>
    );
}

export default OrderSummary;
