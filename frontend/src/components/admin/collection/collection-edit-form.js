import React, { useState, useEffect } from'react'
import { Accordion, Container, Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase'

export default function CollectionEditForm({
    collection,
    fetchAllCollections,
    searchValue
}){
    const history= useHistory();
    const {handleSubmit, errors, register}= useForm();

    function editCollection(data){
        console.log(data)
            const {
                title,
                description
            }= data;
            Axios.put(`/api/collection/edit/${collection.collection_uid}`,{
                title,
                description
            }).then((res)=>{
                fetchAllCollections();
                alert('updated')
            })
    }

    const [error, setError]= useState('');

    function changePic(event){
        console.log(event.target.files[0]);
        
        if (!event.target.files){return};
       
    //    setImage(URL.createObjectURL(event.target.files[0]));
        var uploadTask= firebase.storage().ref(`Soulmates/black-life/collection/${collection.collection_uid}.jpg`).put(event.target.files[0]);

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
              Axios.put(`/api/collection/edit-image/${collection.collection_uid}`, {
            
                ...collection,
                collection_image:downloadURL
            
                }).then((res)=>{
                    fetchAllCollections();
                    // handleClose();
                })

            //   if (props.mode=='create'){
            //     history.push('/home')
            // }
            });
          });
        };

        const [display, setDisplay]= useState('block')

        useEffect(()=>{
            try {
                if (searchValue==''){
                setDisplay('block')
            }
            else if(collection.title.toLowerCase().includes(searchValue.toLowerCase())===true){
                setDisplay('block')
            }else{
                setDisplay('none')
            }
            } catch (error) {
                console.log(error)
            }
            
        },[searchValue, collection.title])


    return(
        <>
         <Accordion defaultActiveKey="1" className='mb-2' style={{display:display}}>
                    <Accordion.Toggle className='oswald text-uppercase ml-2' style={{minWidth:'60px'}} as={Button} variant='dark' size='sm' eventKey="0">
                        Edit
                    </Accordion.Toggle>
                    <Button variant='dark' size='sm' className='oswald text-uppercase ml-2' style={{minWidth:'60px'}} onClick={
                        ()=>history.push(`/admin/collections/${collection.title}`)
                    }>VIEW PRODUCTS</Button>
                        <h5 style={{display:'inline-block', verticalAlign:'bottom', position:'relative', top:'4px'}} className='mr-2 ml-2 oswald text-uppercase'>{collection.title}</h5>
                     
                        
                    <Accordion.Collapse eventKey="0">
                    <Container className='grid-1-2 mt-2 mb-2'>
                            <div className='pr-2'>
                                <img className='product-image' src={collection.collection_image} alt={collection.title} ></img>
                                {/* <button className='add-cart mt-2' >Change Profile Picture</button> */}
                                <Form className='pt-2'>
                                    <Form.File 
                                        id="custom-file-translate-scss"
                                        label="Change Collection Cover"
                                        lang="en"
                                        custom
                                        className='oswald text-uppercase'
                                        onChange={changePic}
                                    />
                                    <div className='m-auto oswald text-uppercase text-center pt-2'>{error} </div>
                                </Form>
                            </div>
                
                            <div className='item-2'>

                                <Form onSubmit={handleSubmit(editCollection)}>
                                    {/* <h2 className='oswald'>EDIT PRODUCT</h2> */}
                                    <Form.Group>
                                        <Form.Label className='oswald'>
                                            Title
                                        </Form.Label>
                                        <Form.Control
                                            name='title'
                                            defaultValue={collection.title}
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
                                    </Form.Group>
                                    <Form.Group className=' pb-2'>
                                        <Form.Label className='oswald'>
                                            Description
                                        </Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            rows={4}
                                            name='description'
                                            defaultValue={collection.description}
                                            style={{whiteSpace: 'pre-wrap'}}
                                            ref={register({
                                                required:{value:true, message:'*required'},
                                                maxLength:{value:300, message:'*must not be more than 300'},
                                                minLength:{value:3, message:'*must not be less than 3'}
                                            })}

                                        />
                                        {
                                            errors.description && 
                                            <div className='text-danger' >{errors.description.message} </div>
                                        }
                                    </Form.Group>
                                    <button className='add-cart mt-4' type='submit' >Submit Changes</button>
                                </Form>
                                
                            </div>
                        </Container>
                    </Accordion.Collapse>
                    
                </Accordion> 
                <hr/>
        </>
    )
}