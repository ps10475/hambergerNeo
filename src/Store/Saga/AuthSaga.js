import { put, delay, call } from "@redux-saga/core/effects";

import axios from 'axios';
import * as actions from '../Action/actionRoot';

export function* logoutSaga(action) {
    yield call([localStorage,'removeItem'],'token');
    yield call([localStorage,'removeItem'],'expiresDate');
    yield call([localStorage,'removeItem'],'userId');
    yield put(actions.authLogoutSuccessed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiresTime)
    yield put(actions.authLogout())
}

export function* authSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfFNa0ixZH_tSPT98xcFx4HxK97MKcVN8';
    if (action.isSignin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfFNa0ixZH_tSPT98xcFx4HxK97MKcVN8'
    }
    const response = yield axios.post(url, authData);
    try {
        yield localStorage.setItem('token', response.data.idToken);
        let expiresDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('expiresDate', expiresDate);
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn * 1000));
    } catch (error) {
        yield put(actions.authFail(error))
    }
}

export function* checkAuthSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.authLogout());
    } else {
        const expiresDate = yield localStorage.getItem('expiresDate');
        if( expiresDate <= new Date() ){
            yield put(actions.authLogout());
        }else{
            yield (actions.checkAuthTimeout(new Date(expiresDate).getTime() - new Date().getTime()))
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId))
        }
        
    }
}