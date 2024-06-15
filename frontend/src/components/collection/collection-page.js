import React, { useEffect, useState} from 'react'
import CollectionItem from './collection-item'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import {Spinner } from 'react-bootstrap';

export default function CollectionPage (){

    let { id } = useParams();

    const [items, setItems]= useState([]);

    function fetchCollection(id){
        Axios.get(`/api/product/by-collection/${id}`)
        .then((res)=>{
            setItems(res.data)
            })
    }

    useEffect(()=>{
        fetchCollection(id)

    },[id]);

    function sortPriceDesc(){
        async function firstSort(){
            return items.sort(function(a, b){return b.discount_price-a.discount_price});
        }
        
        firstSort().then(res=>{
            setItems([...res])
        })
        
    }

    function sortPriceAsc(){
        async function firstSort(){
            return items.sort(function(a, b){return a.discount_price-b.discount_price});
        }
        
        firstSort().then(res=>{
            setItems([...res])
        })
    }

    // function filter(param){
    //     const oldList= items.map(item=>item[param]);
    //     var uniqueList = oldList.reduce(function(a,b){
    //         if (a.indexOf(b) < 0 ) a.push(b);
    //         return a;
    //     },[]);
    //     uniqueList.map(item=>{
    //         return(
    //             <div>{item}</div>
    //         )
    //     })
    // }
   

    return(
        <><div style={{padding:'10px'}}>
        {items.length>0?

        <>
        
        <div className='collection-name oswald h1 text-center text-uppercase m-auto pb-2 pt-4'>{items.length>0?items[0].title:''}</div>
        <div className='collection-description text-center m-auto' style={{maxWidth: '400px'}}>{items.length>0?items[0].description:''}</div>
        <div className='sort-container oswald pl-2 pr-2 mt-4'>
            <div className='mb-1 black' >SORT BY:</div>
            <div className='sort'>
                <div className='sort-item' onClick={sortPriceDesc}>Price high to low</div>
                <div className='sort-item' onClick={sortPriceAsc} >Price low to high</div>
                {/* <div className='sort-item'>Oldest first</div>
                <div className='sort-item'>Newest first</div> */}
            </div>
        </div>
        <div className='showcase-contain'>
            {
                items.map(item=>{
                    return(
                        <CollectionItem 
                            item={item}
                        />
                    )
                })
            }
        </div>
        </>
        
        : <div className='m-auto text-center spinner-div' ><Spinner animation="grow" variant='dark'></Spinner></div> 
    }
        
        </div>
        </>
    )
}