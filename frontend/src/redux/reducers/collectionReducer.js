import {FETCH_COLLECTION, FETCH_ALL_COLLECTIONS} from '../actions/types';

const initialState={
    allCollections:[],
    collection_products:[]
}

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_COLLECTION:
        return {
          ...state,
          collection_products: action.payload
        };
      case FETCH_ALL_COLLECTIONS:
        return {
            ...state,
            allCollections: action.payload
        };

      default:
        return state;
    }
}
  