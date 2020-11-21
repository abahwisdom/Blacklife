import React from 'react'

export default function CartItem({
    product,
    removeOrder,
    addOrder
}){

    function increase(){
        addOrder(product);
    }

    function decrease(){
        removeOrder(product);
    }

    return(
        <>
        <div className='cart-contain oswald ml-2 mr-auto mt-auto mb-auto pb-2'>
            <img src={product.image_url} className='cart-image mr-2' alt={product.name} ></img>
            <div className='cart-content'>
                <div className='mr-4' style={{width:'200px'}}>
                    <div className='product-name h3 '>{product.name}</div>
                    <div className='product-collection'>{product.title}</div>
                </div>
                
                {/* <div className='product-description'>{product.details}</div> */}
                {/* <div className='product-price'>{product.discount_price?product.discount_price: product.price}</div> */}
                <div style={{display:'flex', width:'227px', justifyContent:'space-between'}}>
                    <div className='count-contain mr-4 ' style={{width:'100px'}}>
                        <div className='product-count'>{product.count}</div>
                        <div className='count-arrow-contain' >
                            <i onClick={increase} className="fas fa-arrow-up"></i>
                            <i onClick={decrease} className="fas fa-arrow-down"></i>
                        </div>
                        
                    </div>
                
                <div className='product-total ml-4'>${(product.discount_price?product.discount_price: product.price)*product.count}</div>
                </div>
                
            </div>
        </div>
        <hr/>
        
        </>
    )
}