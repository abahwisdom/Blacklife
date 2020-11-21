import {ADD_ORDER, REMOVE_ORDER, CLEAR_ORDERS, FETCH_ORDERS, FINISH_ORDERS} from '../actions/types'

const initialState = {
    unfinishedOrder: JSON.parse(localStorage.getItem('unfinishedOrder'))?JSON.parse(localStorage.getItem('unfinishedOrder')):[],
    fetchedOrder: [],
    latest_order_id:''
  };


export default function (state=initialState, action){
    switch(action.type){
        case ADD_ORDER:
        case REMOVE_ORDER:
            localStorage.setItem('unfinishedOrder', JSON.stringify(action.payload));
            return{
                ...state,
                unfinishedOrder:action.payload
            };
        case FINISH_ORDERS:
            localStorage.removeItem('unfinishedOrder');
            return{
                ...state,
                unfinishedOrder:null
                // latest_order_id: action.payload
            };
        case CLEAR_ORDERS:
            localStorage.removeItem('unfinishedOrder');
            return{
                ...state,
                unfinishedOrder:null
            };
        case FETCH_ORDERS:
            return{
                ...state,
                fetchedOrder: action.payload
            };
        default:
            return state;

    }
}