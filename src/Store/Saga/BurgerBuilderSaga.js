import { put } from '@redux-saga/core/effects';
import * as actions from '../Action/actionRoot';
import axios from '../../axionOrder';

export function* initIngredientSaga(action) {
    const response = yield axios.get('ingredients.json');
    try {
        yield put(actions.setIngredient(response.data))
    } catch (error) {
        yield put(actions.fetchIngredientFail())
    }
}