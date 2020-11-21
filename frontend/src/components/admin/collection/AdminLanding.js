import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'

import {fetchAllCollections} from '../../../redux/actions/collectionActions'
import CollectionEditForm from './collection-edit-form'
import { Button, Modal, Container, Form, Spinner } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { clearErrors } from '../../../redux/actions/errorActions'


const AdminLanding=({
    collectionList,
    fetchAllCollections,
    isAuthenticated,
    error,
    clearErrors
})=>{

    const history=useHistory();


    const {handleSubmit, errors, register}= useForm();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addNewCollection(data){
        const {
            title,
            description
        }= data;
        Axios.post(`/api/collection/create`, {
            title,
            description
        }).then((res)=>{
            alert(res.data.msg);
            handleClose();
            fetchAllCollections();
        }).catch((err)=>{
            setAxiosError(err.response.data.msg)
            // console.log(err.response.data.msg)
        })
    }
    
    const [axiosError, setAxiosError]= useState('');

    const [showProduct, setShowProduct] = useState(false);

    const handleCloseProduct = () => setShowProduct(false);
    const handleShowProduct = () => setShowProduct(true);

    function AddNewProduct(data){
        const{
            name, 
            details,
            price,
            discount_price,
            collection_uid
        }=data
        Axios.post(`/api/product/create`, {
            name, 
            details,
            price,
            discount_price,
            collection_uid
        }).then((res)=>{
            alert(res.data.msg);
            handleCloseProduct();
            window.location.href=`/admin/product/${res.data.uid}`
        })
    }

    const [searchValue, setSearch]= useState('');

    useEffect(() => {
        if (isAuthenticated===false) {
          // clearErrors();
          // console.log(isAuthenticated)
          setLoading(false);
          history.push('/admin/auth/sign-in')
          // window.location.href='/home'
        }
  
        if (isAuthenticated===null){
          setLoading(true)
      };

      if (isAuthenticated){
          setLoading(false);
          clearErrors();
      };

      
    }, [isAuthenticated]);

    const [loading, setLoading]= useState(true);

  if (loading) {return(
    <Container className='text-center' ><Spinner animation="border" variant="primary" className="align-middle spinner-app" role="status"/></Container>
  )}

    return(
        <>
        <div className='text-center mb-4' >
            <Button size='sm' variant='danger' className='mr-2 oswald' onClick={handleShow} >CREATE NEW COLLECTION</Button> 
            <Button size='sm' variant='danger' className='oswald' onClick={handleShowProduct} >CREATE NEW PRODUCT</Button>
        </div>

        <h1 className='oswald text-center mb-2 text-uppercase'>Collections</h1>
        <Form className=' text-center mb-3 text-uppercase' style={{maxWidth: '400px', margin: 'auto'}}>
                   <Form.Group className='mt-auto mb-auto'>
                       <Form.Control onChange={(e)=>setSearch(e.target.value)}type='search' placeholder='Search For Collection' className='mt-auto mb-auto merriweather'>
                       </Form.Control>
                   </Form.Group>
               </Form>
           
        {
            collectionList.map(collection=>{
               return(
                   <React.Fragment key={collection.title}>
                       <CollectionEditForm collection={collection} fetchAllCollections={fetchAllCollections} searchValue={searchValue} />
                   </React.Fragment>
               )
           }) 
        }

        <Modal show={show} onHide={handleClose} centered  size='lg' >
            <Container>
                <Modal.Header closeButton className='oswald text-uppercase'>
                <h2 className='oswald'>ADD NEW COLLECTION</h2>
                </Modal.Header>
            
                <div className='item-2'>

            <Form onSubmit={handleSubmit(addNewCollection)}>
                {/* <h2 className='oswald'>EDIT PRODUCT</h2> */}
                <Form.Group>
                    <Form.Label className='oswald'>
                        Title
                    </Form.Label>
                    <Form.Control
                        name='title'
                        // defaultValue={collection.title}
                        ref={register({
                            required:{value:true, message:'*required'},
                            maxLength:{value:25, message:'*must not be more than 25'},
                            minLength:{value:3, message:'*must not be less than 3'}
                        })}
                    />
                    {
                        errors.title && 
                        <div className='text-danger' >{errors.title.message} </div>
                    }
                    {axiosError && <div className='text-danger' >{axiosError} </div> }
                </Form.Group>
                <Form.Group className=' pb-2'>
                    <Form.Label className='oswald'>
                        Description
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={4}
                        name='description'
                        // defaultValue={collection.description}
                        style={{whiteSpace: 'pre-wrap'}}
                        ref={register({
                            required:{value:true, message:'*required'},
                            maxLength:{value:300, message:'*must not be more than 300'},
                            minLength:{value:3, message:'*must not be less than 3'}
                        })}

                    />
                    {
                        errors.description && 
                        <div className='text-danger' >*{errors.description.message} </div>
                    }
                </Form.Group>
                <button className='add-cart mt-4' type='submit' >Submit</button>
            </Form>

</div>
            
            <Modal.Footer>
                <Button variant='dark' className='oswald'>Close</Button>
            </Modal.Footer>
            </Container>
            
            
        </Modal>

{/* add product modal */}
        <Modal show={showProduct} onHide={handleCloseProduct} centered size='lg' >
            <Container>
            <Modal.Header closeButton className='oswald text-uppercase'>
                <h2 className='oswald'>ADD NEW PRODUCT</h2>
                </Modal.Header>
            
                <div className='item-2'>

                    <Form onSubmit={handleSubmit(AddNewProduct)}>
                        <Form.Group>
                            <Form.Label className='oswald'>
                                Name
                            </Form.Label>
                            <Form.Control
                                name='name'
                                // defaultValue={product.name}
                                ref={register({
                                    required:{value:true, message:'*required'},
                                    maxLength:{value:25, message:'*must not be more than 25'},
                                    minLength:{value:3, message:'*must not be less than 3'}
                                })}
                            />
                            {
                                errors.name && 
                                <div className='text-danger' >{errors.name.message} </div>
                            }
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className='oswald'>
                                Collection
                            </Form.Label>
                            <Form.Control
                                as='select'
                                name='collection_uid'
                                // defaultValue={product.collection_uid}
                                ref={register({
                                    required:{value:true, message:'*required'}
                                })}
                            >
                                {
                                    collectionList.map(collection=>{
                                        return(
                                            <option value={collection.collection_uid}>{collection.title} </option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='oswald'>
                                Old Price
                            </Form.Label>
                            <Form.Control
                                name='price'
                                type='number'
                                // defaultValue={product.price}
                                ref={register({
                                    required:{value:true, message:'*required'},
                                    max:{value:9999, message:'*invalid'},
                                    min:{value:0, message:'*invalid'}
                                })}
                            />
                            {
                                errors.price && 
                                <div className='text-danger' >{errors.price.message} </div>
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='oswald'>
                                New Price
                            </Form.Label>
                            <Form.Control
                                name='discount_price'
                                // defaultValue={product.discount_price}
                                ref={register({
                                    required:{value:true, message:'*required'},
                                    max:{value:9999, message:'*invalid'},
                                    min:{value:0, message:'*invalid'}
                                })}
                            />
                            {
                                errors.discount_price && 
                                <div className='text-danger' >{errors.discount_price.message} </div>
                            }
                        </Form.Group>
                        <Form.Group className=' pb-2'>
                            <Form.Label className='oswald'>
                                Details
                            </Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={4}
                                name='details'
                                // defaultValue={product.details}
                                style={{whiteSpace: 'pre-wrap'}}
                                ref={register({
                                    required:{value:true, message:'*required'},
                                    maxLength:{value:300, message:'*must not be more than 300'},
                                    minLength:{value:3, message:'*must not be less than 3'}
                                })}

                            />
                            {
                                errors.details && 
                                <div className='text-danger' >{errors.details.message} </div>
                            }
                        </Form.Group>
                        <button className='add-cart mt-4' type='submit' >Submit Changes</button>
                    </Form>

</div>
            
            <Modal.Footer>
                <Button variant='dark' className='oswald'>Close</Button>
            </Modal.Footer>
            </Container>
            
            
        </Modal>
        
        </>
    )
}

const mapStateToProps = (state) => ({
    collectionList: state.collection.allCollections,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
export default connect(mapStateToProps, {fetchAllCollections, clearErrors})(AdminLanding);