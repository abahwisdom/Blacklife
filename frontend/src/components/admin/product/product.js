import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom';
import {Container, Spinner, Button, Form, Modal, Jumbotron} from 'react-bootstrap'

import {fetchProduct} from '../../../redux/actions/productActions'
import {fetchAllCollections} from '../../../redux/actions/collectionActions'
import {connect} from 'react-redux'
import Axios from 'axios';
import {useForm} from 'react-hook-form'
import firebase from 'firebase'
import { clearErrors } from '../../../redux/actions/errorActions';

function Product ({
    fetchProduct,
    product,
    allCollections,
    fetchAllCollections,
    isAuthenticated,
    error,
    clearErrors
}){

    const history=useHistory();

     let { id } = useParams();

    useEffect(()=>{
        // load Product from product.id match params
        fetchProduct(id)
    },[id]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function changeCollection(uid){
        Axios.put(`/api/product/edit/${product.product_uid}`, {
            
                ...product,
                collection_uid:uid
            
        }).then((res)=>{
            fetchAllCollections();
            fetchProduct(id)
            handleClose();
        })
    }

    const {handleSubmit, errors, register}= useForm();

    function editProduct(data){
        const {
            name, 
            details,
            price,
            discount_price,
            collection_uid
        }= data
        Axios.put(`/api/product/edit/${product.product_uid}`, {
            
            name, 
            details,
            price,
            discount_price,
            collection_uid,
            image_url:product.image_url
        
        }).then((res)=>{
            if (res.data){
                alert(res.data.msg)
            }
            fetchAllCollections();
            fetchProduct(id);
            console.log(res)
        })
        console.log(data)
    }

    const [uploadError, setError]= useState('');

    function changePic(event){
        console.log(event.target.files[0]);
        
        if (!event.target.files){return};
       
    //    setImage(URL.createObjectURL(event.target.files[0]));
        var uploadTask= firebase.storage().ref(`Soulmates/black-life/product/${product.product_uid}.jpg`).put(event.target.files[0]);

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setError(<progress value={Math.trunc(progress)} max="100"></progress>);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                setError('Upload is paused');
                break;
            //   case firebase.storage.TaskState.RUNNING: // or 'running'
            //     setError('Upload is running');
            //     break;
            }
          }, function(error) {
              setError(error)
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              setError('Upload Successful');
              console.log(downloadURL);
              Axios.put(`/api/product/edit/${product.product_uid}`, {
            
                ...product,
                image_url:downloadURL
            
                }).then((res)=>{
                    fetchAllCollections();
                    fetchProduct(product.product_uid)
                    // handleClose();
                })

            //   if (props.mode=='create'){
            //     history.push('/home')
            // }
            });
          });
         
        // }
        // } else {
        // alert("No file chosen");
        // }
        // });)
   
    };

    function deleteProduct(){
        const confirmDelete= window.confirm('Product will be deleted');
        if (confirmDelete){
            Axios.delete(`/api/product/delete/${product.product_uid}`)
            .then(()=>{
                fetchAllCollections();
                history.push('/admin')
            })

        }
        
    }
    

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
        {product.name!==undefined?

        <>
            <Container className='grid-1-2 mt-2 mb-2'>
            <div className='pr-2'>
                <img src={product.image_url} className='product-image' alt={product.name} ></img>
                {/* <button className='add-cart mt-2' >Change Profile Picture</button> */}
                <Form className='pt-2'>
                    <Form.File 
                        id="custom-file-translate-scss"
                        label="Change Product Image"
                        lang="en"
                        custom
                        className='oswald text-uppercase'
                        onChange={changePic}
                    />
                    <div className='m-auto oswald text-uppercase text-center pt-2'>{uploadError} </div>
                </Form>
            </div>
            
                <div className='item-2'>

                    <Form onSubmit={handleSubmit(editProduct)}>
                        <Button onClick={()=>deleteProduct()} variant='danger' size='sm' className='oswald' style={{float:'right'}} >DELETE PRODUCT</Button>
                        <h2 className='oswald'>EDIT PRODUCT</h2>
                        <Form.Group>
                            <Form.Label className='oswald'>
                                Name
                            </Form.Label>
                            <Form.Control
                                name='name'
                                defaultValue={product.name}
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
                        <Form.Group className='noDisplay'>
                            <Form.Label className='oswald'>
                                Collection
                            </Form.Label>
                            <Form.Control
                                name='collection_uid'
                                defaultValue={product.collection_uid}
                                ref={register({
                                    required:{value:true, message:'*required'}
                                })}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group onClick={()=>handleShow()}>
                            <Form.Label className='oswald'>
                                Collection
                            </Form.Label>
                            <Form.Control
                                name='change-collection'
                                defaultValue={product.title}
                                disabled
                            >
                            </Form.Control>
                            {
                                errors.collection && 
                                <div className='text-danger' >{errors.collection.message} </div>
                            }
                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='oswald'>
                                Old Price
                            </Form.Label>
                            <Form.Control
                                name='price'
                                type='number'
                                defaultValue={product.price}
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
                                defaultValue={product.discount_price}
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
                                defaultValue={product.details}
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
        
        
        </Container>
        <Modal show={show} onHide={handleClose} centered className='oswald'  >
            <Container>
                <Modal.Header closeButton className='oswald text-uppercase'>
                    Change Collection
                </Modal.Header>
            
            {
                allCollections.map(collection=>{
                    return(
                        <>
                        <h5 style={{width:'fit-content', cursor:'pointer'}} onClick={()=>changeCollection(collection.collection_uid)}>{collection.title} </h5>
                        <hr/>
                        </>
                    )
                })
            }
            
            <Modal.Footer>
                <Button variant='dark' className='oswald'>Close</Button>
            </Modal.Footer>
            </Container>
            
            
        </Modal>
        </>
        
             
             
        :<Jumbotron><h1 className='text-center oswald'>product does not exist</h1></Jumbotron>}
        </>
    )
}

const mapStateToProps = (state) => ({
    product: state.product.product_details,
    allCollections: state.collection.allCollections,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
export default connect(mapStateToProps, { fetchProduct, fetchAllCollections, clearErrors })(Product);
