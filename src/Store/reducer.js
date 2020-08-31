import * as actionTypes from './actionTypes';

const initState = {
    ingredients: {
        Meat: 0,
        Bacon: 0,
        Salad: 0,
        Cheese: 0,
    },
    totalPrice: 5000,
}

const INGREDIENT_PRICE = {
    Meat: 5000,
    Salad: 1000,
    Bacon: 5000,
    Cheese: 3000
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        }
        case actionTypes.RESET_INGREDIENT: {
            return {
                ingredients: {
                    Meat: 0,
                    Bacon: 0,
                    Salad: 0,
                    Cheese: 0,
                },
                totalPrice: 5000,
            }
        }
        default:
            return state
    }
}

export default reducer;