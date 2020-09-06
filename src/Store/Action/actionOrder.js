import * as actionTypes from './actionTypes';


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

export const sendPurchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.CALL_SEND_PURCHASE_BURGER_SAGA,
        token: token,
        orderData: orderData
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
    return {
        type: actionTypes.CALL_FETCH_ORDER_SAGA,
        token: token,
        userId: userId
    }
}