import * as actionTypes from '../Action/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseBurgerInit = (state, action) => {
    return {
        ...state,
        purchased: false
    }
}
const purchaseBurgerStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    }
}
const purchaseBurgerFail = (state, action) => {
    return {
        ...state,
        loading: false
    }
}
const fetchOrderStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}
const fetchOrderSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        orders: action.fetchOrders
    }
}
const fetchOrderFail = (state, action) => {
    return {
        ...state,
        loading: false
    }
}
const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(action, state)
        default: return state
    }
} 
export default orderReducer