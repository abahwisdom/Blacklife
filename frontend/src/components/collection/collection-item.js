import React from 'react'
import StyledLink from '../utilities/styledLink'

export default function CollectionItem ({item}){

    return(
        <>
        <StyledLink to={`/products/${item.product_uid}`}>
            <img src={item.image_url} className='item-image' style={{maxWidth: '389px', height: '490px'}} alt={item.name} ></img>
            <div className='item-category'>{item.title}</div>
            <div className='item-name h4'>{item.name}</div>
            <s className='price old-price mr-2' style={item.discount_price?{color:'gray'}:{color:'black'}}>${item.price}</s>
            <span className='price new-price'>${item.discount_price}</span>
        </StyledLink>
        </>
    )
}