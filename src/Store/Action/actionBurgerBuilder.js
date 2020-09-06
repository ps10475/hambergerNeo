import * as actionTypes from './actionTypes';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name 
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name 
    }
}

export const setIngredient = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ings
    }
}
export const fetchIngredientFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL
    }
}

export const initIngredient = () => {
    return {
        type: actionTypes.CALL_INIT_INGREDIENT_SAGA
    }
}