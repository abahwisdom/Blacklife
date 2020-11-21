import {FETCH_PRODUCT} from './types'
import Axios from 'axios'

export const fetchProduct=(id)=>(dispatch)=>{
    Axios.get(`/api/product/single/${id}`)
    .then((res)=>{
        dispatch({
            type: FETCH_PRODUCT,
            payload:res.data
        });
      })
}