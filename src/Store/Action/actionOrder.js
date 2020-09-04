import * as actionTypes from './actionTypes';
import axios from '../../axionOrder';
import { initIngredient } from './actionBurgerBuilder';

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const sendPurchaseBurger = (orderData) => {
    return (dispatch,getState) => { 
        dispatch(purchaseBurgerStart());
        let token = getState().auth.token;
        axios.post('/order.json?auth=' + token , orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
                dispatch(initIngredient())
            }).catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}
export const fetchOrderSuccess = ( fetchOrders )=>{
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        fetchOrders : fetchOrders
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
export const fetchOrder = ( token,userId ) => {
    return dispatch => {
        dispatch( fetchOrderStart() );
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId +'"';
        axios.get('order.json'+ queryParams)
        .then(res => {
            let fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({ ...res.data[key], id: key })
            }
            dispatch( fetchOrderSuccess(fetchOrders) )
        })
        .catch(error => {
            dispatch( fetchOrderFail(error) )
        })
    }
}