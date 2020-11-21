import {FETCH_COLLECTION, FETCH_ALL_COLLECTIONS} from './types';
import Axios from 'axios';


export const fetchCollection=(id)=>(dispatch)=>{
    Axios.get(`/api/product/by-collection/${id}`)
    .then((res)=>{
        dispatch({
            type:FETCH_COLLECTION,
            payload:res.data
        })
      })
}

export const fetchAllCollections=()=>(dispatch)=>{
    Axios.get('/api/collection/all')
    .then((res)=>{
        dispatch({
            type:FETCH_ALL_COLLECTIONS,
            payload:res.data
        })
      })
}