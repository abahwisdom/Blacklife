import {ADD_ORDER, REMOVE_ORDER, CLEAR_ORDERS, FETCH_ORDERS, FINISH_ORDERS} from './types'
import Axios from 'axios';

export const addOrder =(newOrder)=>(dispatch, getState)=>{

    const orderList= getState().order.unfinishedOrder;
    const order={...newOrder, count:1};
    const index= orderList.findIndex((product)=>{
        return product.product_uid===newOrder.product_uid
    })
    if (index===-1){
        const newOrderList= orderList.concat(order);
    dispatch({
        type:ADD_ORDER,
        payload:newOrderList
    })
    }else{
        const newOrderList=[...orderList];
        newOrderList[index].count+=1;
        dispatch({
            type:ADD_ORDER,
            payload:newOrderList
        })

    }
    
}

export const removeOrder= (newOrder)=>(dispatch, getState)=>{
    const orderList= getState().order.unfinishedOrder;
    // const order={...newOrder, count:1};
    const index= orderList.findIndex((product)=>{
        return product.product_uid===newOrder.product_uid
    })
    if (orderList[index].count===1){
        const newOrderList= orderList.filter(currentOrder=>currentOrder!==newOrder);
    dispatch({
        type:REMOVE_ORDER,
        payload:newOrderList
    })
    }else{
        const newOrderList=[...orderList];
        newOrderList[index].count-=1;
        dispatch({
            type:REMOVE_ORDER,
            payload:newOrderList
        })
    }
    
    
}

export const clearOrders= ()=>(dispatch)=>{
    dispatch({
        type:CLEAR_ORDERS
    })
}

export const finishOrders= ()=>(dispatch, getState)=>{
    // const order_list= getState().order.unfinishedOrder;
    // Axios.post('/api/order/create', {
    //     email,
    //     address,
    //     order_list
    // }).then((res)=>dispatch({
    //     type:FINISH_ORDERS,
    //     payload:res.data
    // }))

    dispatch({
        type:FINISH_ORDERS
    })
    
}

export const fetchOrders= (uid)=>(dispatch)=>{
    Axios.get(`/api/order/get/${uid}`).then((res)=>dispatch({
        type:FETCH_ORDERS,
        payload:res.data
    }))
    
}