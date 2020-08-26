import React from 'react';
import Aux from '../../../HOC/Auxx';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = props.ingredients;
    let ingredientLi = Object.keys(ingredients)
        .map(igKey => {
            return <li key={igKey} > <span> {igKey} </span> : {ingredients[igKey]} </li>
        })

    return (
        <Aux>
            <h3>Đơn hàng:</h3>
            <p>Tổng các phần mà bạn đã đặt là:</p>
            <ul>
                { ingredientLi }
            </ul>
            <p>Thành tiền: <b> {props.totalPrice.toLocaleString("zh-HK")} VNĐ </b> </p>
            <p>Bạn đã sẵn sàng thưởng thức hương vị ngon tuyệt của bánh chưa?</p>
            <Button btnType='Danger' clicked={props.closePurchase} >Hủy</Button>
            <Button btnType='Success' clicked={props.continuePurchase} >Tiếp tục</Button>
        </Aux>
    );
}

export default OrderSummary;
