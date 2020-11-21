import React, { useState, useEffect } from 'react'

import {fetchOrders} from '../redux/actions/orderActions'
import {connect} from 'react-redux'
import { Form, Button, Jumbotron } from 'react-bootstrap'

function CartItem({
    product
}){

    return(
        <>
        <div className='cart-contain oswald ml-2 mr-auto mt-auto mb-auto pb-2'>
            <img src={product.image_url} className='cart-image mr-2' alt={product.name} ></img>
            <div className='cart-content'>
                <div className='mr-4' style={{width:'200px'}}>
                    <div className='product-name h3  text-uppercase '>{product.name}</div>
                    <div className='product-collection'>{product.title}</div>
                </div>
                <div style={{display:'flex', width:'227px', justifyContent:'space-between'}}>
                    <div className='count-contain mr-4 ' style={{width:'100px'}}>
                        <div className='product-count'>${product.selling_price} × {product.count}</div>
                    </div>
                
                <div className='product-total ml-4'>${(product.selling_price)*product.count}</div>
                </div>
                
            </div>
        </div>
        <hr/>
        
        </>
    )
}

function Order({
    fetchedOrder,
    fetchOrders,
}){


    // useEffect(()=>{
    //     fetchOrders('718ca2df-4a84-454c-b0be-0fb1f6071684')
    // },[])

 useEffect(()=>{
    try {
                if (fetchedOrder!==undefined&&fetchedOrder!==null&&fetchedOrder.length>0){
                    const prices= fetchedOrder.map(item=> {return (item.selling_price)*item.count});
                    const sum= prices.reduce((total, num)=>total+num);
                    setSum(sum);
                }
                
            } catch (error) {
                console.log(error)
            }
 },[fetchedOrder])
       
       
    

    const [sum, setSum]= useState('');

    const [searchValue, setSearch]= useState('');
    function loadOrder(){
        fetchOrders(searchValue)
    }

    return(
        <>
        <Form className='oswald text-center pl-3 pr-3 mb-2 mt-2 text-uppercase' style={{maxWidth: '400px', margin: 'auto'}}>
                   <Form.Group className='mt-auto mb-auto'>
                   <Button size='sm' variant='dark' onClick={loadOrder} style={{float:'right', width:'17%', height:'38px', padding: '5px'}}>SUBMIT</Button>
                       <Form.Control variant='danger' style={{width:'82%'}} onChange={(e)=>setSearch(e.target.value)}type='search' placeholder='Enter Your Order ID' className='mt-auto mb-auto merriweather'>
                       </Form.Control>
                   </Form.Group>
                   
        </Form>
        <div>
            {
                fetchedOrder.length>0 &&(
                    <>
                    <div className='text-center mt-4'>Email: {fetchedOrder[0].email} </div>
                    <div className='text-center mb-4'>Date: {fetchedOrder[0].date} </div>
                    </>
                ) 
            }
            
            {
            fetchedOrder!==undefined&&fetchedOrder!==null&&fetchedOrder.length>0?fetchedOrder.map(item=>{
                return(
                    <CartItem product={item}/>
                )
            }): <Jumbotron className='oswald text-center h3'>NO ORDER LOADED</Jumbotron>
            
        }
        {
                fetchedOrder.length>0 &&(
                    <>
                    <div className='text-center h4 mt-4 oswald'>TOTAL: ${sum} </div>
                    </>
                ) 
            }
        </div>

        
        </>
    )
}

const mapStateToProps = (state) => ({
    orderId: state.order.latest_order_id.order_id,
    fetchedOrder: state.order.fetchedOrder
  });
  
export default connect(mapStateToProps, { fetchOrders })(Order);