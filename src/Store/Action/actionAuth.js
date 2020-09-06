import * as actionTypes from './actionTypes';
 

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
    return {
        type: actionTypes.CALL_AUTH_LOGOUT_SAGA
    }
}
export const authLogoutSuccessed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresTime) => {
    return {
        type: actionTypes.CALL_CHECK_AUTH_TIMEOUT_SAGA,
        expiresTime: expiresTime
    }
}


export const auth = (email, password, isSignin) => {
    return {
        type: actionTypes.CALL_AUTH_SAGA,
        email: email,
        password: password,
        isSignin: isSignin
    }

}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        redirectPath: path
    }
}

export const checkAuth = () => {
    return{
        type: actionTypes.CALL_CHECK_AUTH_SAGA
    }
}