import React from 'react'
import StyledLink from '../utilities/styledLink'

const Showcase=({
    product,
    allProducts
})=>{
    return(
    <>
        <StyledLink style={{'margin-right': '0px'}} className='showcase-unit' to={`/products/${allProducts.length>0? product.product_uid:''}`}>
            
                <img style={{'height': '480px'}} src={allProducts.length>0 && product.image_url}/>
                <div className='text-center showcase-text' >
                    <h4 className='oswald' >{allProducts.length>0 && product.name}</h4>
                    <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && product.title}</div>
                    <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${product.price}`}</s></div>
                    <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${product.discount_price}`}</div>
                </div>
                
            
        </StyledLink>
    </>
    )
} 

export default Showcase