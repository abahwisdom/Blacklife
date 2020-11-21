import React, { useEffect, useState } from 'react'
import StyledLink from '../../utilities/styledLink'

export default function CollectionItem ({item, searchValue}){

    const [display, setDisplay]= useState('block');

    useEffect(()=>{
        try {
            if (searchValue==''){
            setDisplay('block')
        }
        else if(item.name.toLowerCase().includes(searchValue.toLowerCase())===true){
            setDisplay('block')
        }else{
            setDisplay('none')
        }
        } catch (error) {
            console.log(error)
        }
        
    },[searchValue, item.name])

    return(
        <>
        <StyledLink to={`/admin/product/${item.product_uid}`} style={{display:display}} >
            <img src={item.image_url} className='item-image' alt={item.name} style={{maxWidth: '389px', height: '490px'}} ></img>
            {/* <div className='item-category'>{item.title}</div> */}
            <div className='item-name h4'>Name: {item.name}</div>
            <div className='price old-price' style={item.discount_price?{color:'gray'}:{color:'black'}}>Old Price: ${item.price}</div>
            <div className='price new-price'>New Price: ${item.discount_price}</div>
        </StyledLink>
        </>
    )
}