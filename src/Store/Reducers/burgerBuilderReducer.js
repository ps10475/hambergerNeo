import * as actionTypes from '../Action/actionTypes';

const initState = {
    ingredients: null,
    totalPrice: 5000,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    Meat: 5000,
    Salad: 1000,
    Bacon: 5000,
    Cheese: 3000
}

const addIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
}
const removeIngredient = (state,action)=> {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building:true
    }
}
const setIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            Salad: action.ingredients.Salad,
            Meat: action.ingredients.Meat,
            Bacon: action.ingredients.Bacon,
            Cheese: action.ingredients.Cheese
        },
        error: false,
        totalPrice: 5000,
        building:false
    }
}
const fetchIngredientFail = (state,action) => {
    return {
        ...state,
        error: true
    }
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action)
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action)
        case actionTypes.SET_INGREDIENT: return setIngredient(state,action)
        case actionTypes.FETCH_INGREDIENT_FAIL: return fetchIngredientFail(state,action)
        default: return state
    }
}

export default reducer;