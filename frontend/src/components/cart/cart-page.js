import React, { useState } from 'react'
import CartItem from './cart-item'
import isEmail from 'validator/lib/isEmail';

import {removeOrder, finishOrders, addOrder} from '../../redux/actions/orderActions'
import {connect} from 'react-redux'
import { Form, Modal, Button, Jumbotron } from 'react-bootstrap'
import emailjs from 'emailjs-com'
import Axios from 'axios';

function CartPage({
    cartItems,
    finishOrders,
    removeOrder,
    addOrder
    // orderId
}){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showId, setShowId] = useState(false);

    const handleCloseId = () => setShowId(false);
    const handleShowId = () => setShowId(true);

    const [emailValue, setEmail]= useState('');
    const [errorValue, setError]= useState('');

    const [addressValue, setAddress]= useState('');
  

    const sum=()=>{
        try {
            if (cartItems!==undefined&&cartItems!==null&&cartItems.length>0){
                const prices= cartItems.map(item=> {return (item.discount_price?item.discount_price: item.price)*item.count});
            const sum= prices.reduce((total, num)=>total+num);
            return sum;
            }
            
        } catch (error) {
            console.log(error)
        }
       
    } 

    // export const finishOrders= (email, address)=>(dispatch, getState)=>{
    //     const order_list= getState().order.unfinishedOrder;
    //     Axios.post('/api/order/create', {
    //         email,
    //         address,
    //         order_list
    //     }).then((res)=>dispatch({
    //         type:FINISH_ORDERS,
    //         payload:res.data
    //     }))
        
    // }
    


    function sendEmail(order_id) {
    
        emailjs.send('service_j14d7l9', 'template_1eyofij', {
            email:emailValue,
            address: addressValue,
            order_id,
            site: window.location.href.substring(0, window.location.href.length - 5)+'/order'
        }, 'user_G8sWm7W7AmtawkQWU0SzN')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }

    function checkOut(){
        if(isEmail(emailValue)){
            if (addressValue===''||addressValue.length<5){
                setError('Address is Invalid');
                return;
            }
            Axios.post('/api/order/create', {
                email:emailValue,
                address:addressValue,
                order_list:cartItems
            }).then((res)=>{
                handleClose();
                setOrderId(res.data.order_id);
                sendEmail(res.data.order_id);
                handleShowId();
                finishOrders();
            }).catch((err)=>console.log(err))
            
            
        }else{
            setError('Email is Invalid')
        }
        
    }
    
    const [orderId, setOrderId]= useState('');

    return(
        <>
        <div>
            {
            cartItems!==undefined&&cartItems!==null&&cartItems.length>0?cartItems.map(item=>{
                return(
                    <CartItem product={item} removeOrder={removeOrder} addOrder={addOrder}/>
                )
            }): <Jumbotron className='oswald text-center h3'>NO ITEMS IN CART</Jumbotron>
            
        }
        {cartItems!==undefined&&cartItems!==null&&cartItems.length>0?
        <div>
            <div className='oswald text-center h3'>
                TOTAL: ${
                    sum()
                }
            </div>
            <button className='save-cart ' onClick={()=>handleShow()}>CHECK OUT</button>
        </div>:''}
        </div>

        {/* enter email modal */}

        <Modal show={show} onHide={handleClose} centered backdrop="static" >
            <Modal.Header closeButton className='oswald'>
                Please Enter Your Email and Address
            </Modal.Header>
            {errorValue && <div className='text-danger ml-2 oswald'>*{errorValue}</div>}
            <Form className='mr-2 ml-2'>
                <Form.Group>
                    <Form.Control
                    type='text' 
                    placeholder='Email'
                    onChange={(e)=>{setEmail(e.target.value); setError('')}}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                    as='textarea'
                    rows={3}
                    type='text' 
                    placeholder='Address'
                    required
                    onChange={(e)=>{setAddress(e.target.value);}}
                    />
                </Form.Group>
            </Form>
            
            <Modal.Footer>
                <Button onClick={checkOut} variant='dark' className='oswald'>CHECKOUT</Button>
            </Modal.Footer>
            
        </Modal>

        {/* view order_id modal */}
        <Modal show={showId} onHide={handleCloseId} centered backdrop="static" >
            <Modal.Header closeButton className='oswald'>
                Order Successful
            </Modal.Header>
            <div className='p-4 h3'>
                Your Order Id: {orderId} has been sent to {emailValue}
            </div>
            
            <Modal.Footer>
                <Button onClick={handleCloseId} variant='dark' className='oswald'>CLOSE</Button>
            </Modal.Footer>
            
        </Modal>
        
        </>
    )
}

const mapStateToProps = (state) => ({
    cartItems: state.order.unfinishedOrder,
    // orderId: state.order.latest_order_id.order_id
  });
  
export default connect(mapStateToProps, { finishOrders, removeOrder, addOrder })(CartPage);