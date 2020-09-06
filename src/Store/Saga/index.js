import { takeEvery, all, takeLatest } from '@redux-saga/core/effects'
import * as actionTypes from '../Action/actionTypes';

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authSaga,
    checkAuthSaga
} from './AuthSaga';
import { initIngredientSaga } from './BurgerBuilderSaga';
import { sendPurchaseBurgerSaga, fetchOrderSaga } from './OrtherSaga';

export function* watchAuthSaga() {
    yield all([
        takeEvery(actionTypes.CALL_AUTH_LOGOUT_SAGA, logoutSaga),
        takeEvery(actionTypes.CALL_CHECK_AUTH_TIMEOUT_SAGA, checkAuthTimeoutSaga),
        takeEvery(actionTypes.CALL_AUTH_SAGA, authSaga),
        takeEvery(actionTypes.CALL_CHECK_AUTH_SAGA, checkAuthSaga)
    ])
}
export function* watchBurgerBuilderSaga() {
    yield takeEvery(actionTypes.CALL_INIT_INGREDIENT_SAGA, initIngredientSaga);
}
export function* watchOrderSaga() {
    yield takeLatest(actionTypes.CALL_SEND_PURCHASE_BURGER_SAGA, sendPurchaseBurgerSaga);
    yield takeEvery(actionTypes.CALL_FETCH_ORDER_SAGA, fetchOrderSaga)
}

