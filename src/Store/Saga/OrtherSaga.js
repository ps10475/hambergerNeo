import { put } from "@redux-saga/core/effects";
import axios from '../../axionOrder';
import * as actions from "../Action/actionRoot";

export function* sendPurchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    const response = yield axios.post('/order.json?auth=' + action.token, action.orderData)
    try {
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
        yield put(actions.initIngredient())
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    }
}
export function* fetchOrderSaga(action) {
    yield put(actions.fetchOrderStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    const response = yield axios.get('order.json' + queryParams)
    try {
        let fetchOrders = [];
        for (let p in response.data) {
            fetchOrders.push({ ...response.data[p], id: p })
        }
        yield put(actions.fetchOrderSuccess(fetchOrders))
    } catch (error) {
        yield put(actions.fetchOrderFail(error))
    }
}
