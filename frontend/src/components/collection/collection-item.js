import React from 'react'
import StyledLink from '../utilities/styledLink'

export default function CollectionItem ({item}){

    return(
        <>
        <StyledLink style={{'margin-right': '0px'}} className='showcase-unit' to={`/products/${item.product_uid}`}>
            <img src={item.image_url} className='item-image' style={{maxWidth: '389px', height: '490px'}} alt={item.name} ></img>
            <div className='showcase-text'>
            <div className='item-category'>{item.title}</div>
            <div className='item-name h4 oswald'>{item.name}</div>
            <s className='price old-price mr-2' style={item.discount_price?{color:'gray'}:{color:'black'}}>${item.price}</s>
            <span className='price new-price'>${item.discount_price}</span>
            </div>
        </StyledLink>
        </>
    )
}


// className='items-container grid-collection text-center oswald mt-4 mb-4 ml-2 mr-2'