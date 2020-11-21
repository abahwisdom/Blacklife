import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import {Container, Modal, Button, Spinner} from 'react-bootstrap'

import {fetchProduct} from '../../redux/actions/productActions'
import {addOrder} from '../../redux/actions/orderActions'
import {connect} from 'react-redux'

function ProductPage ({
    fetchProduct,
    product,
    addOrder
}){

     let { id } = useParams();

    useEffect(()=>{
        // load Product from product.id match params
        fetchProduct(id)
    },[]);
   
    function addToCart(){
        addOrder(product);
        handleShow();

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history= useHistory();

    return(
        <>
        {product.name!==undefined?
        <>
            <Container className='grid-1-2 mt-2 mb-2'>
            <img src={product.image_url} className='product-image' alt={product.name} ></img>
                <div className='item-2'>
                    <div className='product-name h1 oswald'>{product.name}</div>
                    <div className='product-collection oswald'>{product.title && product.title.toUpperCase()}</div>
                    <div className='product-old-price mr-2 oswald'><s>${product.price}</s></div>
                    <div className='product-new-price oswald'>${product.discount_price}</div>
                    
                    <button className='add-cart mt-2' onClick={addToCart}>Add To Cart</button>
                    <hr/>
                    <div>
                        <h4 className='oswald'>DETAILS</h4>
                        <div className='product-description'>{product.details}</div>
                    </div>
                    <div className='reviews'>{product.reviews}</div>
                    <hr/>
                    <div className='social oswald'>
                        SHARE:
                        <div >
                        <div> <i className='fa fa-facebook' style={{color:'blue'}}> </i>Facebook</div>
                        <div> <i className='fa fa-instagram ' style={{color:'#f00066'}}> </i>Instagram</div>
                        <div> <i className='fa fa-twitter ' style={{color:'#00a2e4'}}> </i>Twitter</div>
                        </div>
                        
                    </div>
                </div>
        
        
        </Container>
        <Modal show={show} onHide={handleClose} centered className='oswald' size='lg' >
            <Container>
                <Modal.Header closeButton className='oswald'>
                   {product.name} added to cart
                   
                </Modal.Header>
                <div className='text-center pb-4 pt-4'>
                    <Button size='sm' variant='danger' onClick={handleClose} style={{display:'inline'}} className='mr-4 text-center'>CONTINUE SHOPPING</Button>
                    <Button size='sm' variant='dark' onClick={()=>history.push('/cart')}  >VIEW CART</Button>
                </div>
            </Container>

        </Modal>
        </>
        :<div className='m-auto text-center spinner-div' ><Spinner animation="grow" variant='dark'></Spinner></div>}
        
        </>
    )
}

const mapStateToProps = (state) => ({
    product: state.product.product_details
  });
  
export default connect(mapStateToProps, { fetchProduct, addOrder })(ProductPage);