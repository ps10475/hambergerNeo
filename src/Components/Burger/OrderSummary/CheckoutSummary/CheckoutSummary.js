import React from 'react';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';


const CheckoutSummary = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Chúc bạn ngon miệng</h1>
            <Burger ingredients={props.ingredients} />
            <div >
                <Button 
                    btnType='Danger'
                    clicked={props.cancelCheckout}
                >Trở lại</Button>
                <Button 
                    btnType='Success' 
                    clicked={props.continueCheckout}
                >XÁC NHẬN</Button>
            </div>
            
        </div>
    );
}

export default CheckoutSummary;
