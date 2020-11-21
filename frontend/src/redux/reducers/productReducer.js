import {FETCH_PRODUCT} from '../actions/types'

const initialState={
    product_details:{}
}

export default function(state=initialState, action){
    switch(action.type){
        case FETCH_PRODUCT:
            return {
                ...state,
                product_details: action.payload
            };
        default:
            return state
    }
}