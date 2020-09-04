import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expiresTime );
    }
}


export const auth = (email, password, isSignin) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfFNa0ixZH_tSPT98xcFx4HxK97MKcVN8';
        if (isSignin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfFNa0ixZH_tSPT98xcFx4HxK97MKcVN8'
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                let expiresDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expiresDate', expiresDate);
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message))
            })
    }

}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        redirectPath: path
    }
}

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId))
            const expiresDate = localStorage.getItem('expiresDate');
            dispatch(checkAuthTimeout(new Date(expiresDate).getTime() - new Date().getTime()))
        }

    }
}