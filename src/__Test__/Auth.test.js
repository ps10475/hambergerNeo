import authReducer from '../Store/Reducers/authReducer';
import * as actionTypes from '../Store/Action/actionTypes';

describe('Check Redux Reducer Auth, Check Func dont need Render, we dont need to import Enzyme', () => {
    it('Check initState ', () => {
        expect(authReducer(undefined,{})).toEqual({
            token : null,
            userId :null,
            error : null,
            loading : false,
            redirectPath: '/'
        })
    });
    it('Check Token, userId', () => {
        expect(authReducer({
            token : null,
            userId :null,
            error : null,
            loading : false,
            redirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            tokenId: 'some-token',
            userId: 'some-user',
        })).toEqual({
            token : 'some-token',
            userId :'some-user',
            error : null,
            loading : false,
            redirectPath: '/'
        })
    });
    
    
});
