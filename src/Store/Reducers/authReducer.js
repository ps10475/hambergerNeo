import * as actionTypes from '../Action/actionTypes'; 
 

const initState = {
    token : null,
    userId :null,
    error : null,
    loading : false,
    redirectPath: '/'
}

const authStart = (state,action) => {
    return {
        ...state,
        loading: true
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        token: action.tokenId,
        userId : action.userId,
        error : null
    }
}
const authFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}
const authLogout = (state,action)=>{
    return {
        ...state,
        token: null,
        userId: null,
    }
}
const setRedirectPath = (state, action) => {
    return {
        ...state,
        redirectPath: action.redirectPath
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_REDIRECT_PATH: return setRedirectPath(state, action);
        default : return state
    }
}
export default reducer
