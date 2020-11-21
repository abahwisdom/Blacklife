import React, { useEffect, useState} from 'react'
import CollectionItem from './collection-item'

import {fetchCollection} from '../../../redux/actions/collectionActions'
import {connect} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { Form, Jumbotron, Spinner, Container } from 'react-bootstrap';
import { clearErrors } from '../../../redux/actions/errorActions';

function Collection ({
    items,
    fetchCollection,
    isAuthenticated,
    error,
    clearErrors
}){
    const history=useHistory();

    let { id } = useParams();

    useEffect(()=>{
        fetchCollection(id)

    },[]);

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
        {items.length>0 ?
        <>
        <div className='collection-name oswald h1 text-center m-auto pb-2 pt-4 text-uppercase'>{items.length>0?items[0].title:''}</div>
        <div className='collection-description text-center m-auto' style={{maxWidth: '500px', padding: '0 10px'}}>{items.length>0?items[0].description:''}</div>
        <Form className='oswald text-center mb-2 mt-2 pl-2 pr-2 text-uppercase' style={{maxWidth: '400px', margin: 'auto'}}>
                   <Form.Group className='mt-auto mb-auto'>
                       <Form.Control onChange={(e)=>setSearch(e.target.value)}type='search' placeholder='Search For Product' className='mt-auto mb-auto merriweather'>
                       </Form.Control>
                   </Form.Group>
        </Form>
        <div className='items-container grid-collection text-center oswald mt-4 mb-4 ml-2'>
            {
                items.map(item=>{
                    return(
                        <CollectionItem 
                            item={item}
                            searchValue={searchValue}
                        />
                    )
                })
            }
        </div>
        </> : 
        <div className='m-auto text-center spinner-div' ><Spinner animation="grow" variant='dark'></Spinner></div>
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    items: state.collection.collection_products,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
export default connect(mapStateToProps, { fetchCollection, clearErrors })(Collection);