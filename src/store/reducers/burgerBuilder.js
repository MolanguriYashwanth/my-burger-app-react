import * as actionTypes from '../actions/actions';

const initialState={
    ingredients: null,
    error:false,
    totalPrice: 4,
}
const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    meat: 1.3,
    cheese: 0.7
}
const reducer = (state=initialState,action)=>{
    switch(action.type){

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.ingredients,
                error:false
            }    
        case actionTypes.ADD_INGREDIENT:
            return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName]+1
                    },
                    totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }    
        default:
            return state;    


    }
}

export default reducer