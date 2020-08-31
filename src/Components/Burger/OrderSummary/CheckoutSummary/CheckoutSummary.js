import React from 'react';
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';


const CheckoutSummary = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Chúc bạn ngon miệng</h1>
            <Burger ingredients={props.ingredients} />
            <div style={{boxShadow:'0 0 3px rgba(0,0,0,0.1)'}}>
                <Button 
                    btnType='Danger'
                    clicked={props.cancelCheckout}
                >HỦY</Button>
                <Button 
                    btnType='Success' 
                    clicked={props.continueCheckout}
                >XÁC NHẬN</Button>
            </div>
            
        </div>
    );
}

export default CheckoutSummary;
