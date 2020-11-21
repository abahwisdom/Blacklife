import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import StyledLink from '../components/utilities/styledLink';

export default function Landing({
    collectionList
}){

    const [allProducts, setAllProducts]= useState([]);

    useEffect(()=>{
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
        }

        Axios.get('/api/product/all')
        .then(res=>{
            const data= [...res.data];
            shuffle(data);
            setAllProducts(data);
        })
    },[])

    return(
        <>
        
        <div>
        
            <div className='large-image-contain pr-4 pl-4'>
                <div className='image-contain'>
                    <StyledLink to={`/collections/${collectionList.length>0 && collectionList[0].title}`}>
                        <div style={{position:'relative'}}>
                            <img src={collectionList.length>0 && collectionList[0].collection_image}/>
                            <div className='landing-coll-title'>{collectionList.length>0 && collectionList[0].title}</div>
                        </div>
                    </StyledLink>
                    <StyledLink to={`/collections/${collectionList.length>0 && collectionList[1].title}`}>
                        <div style={{position:'relative'}}>
                            <img src={collectionList.length>0 && collectionList[1].collection_image}/>
                            <div className='landing-coll-title'>{collectionList.length>0 && collectionList[1].title}</div>
                        </div>
                    </StyledLink>
                </div>
                
                <div className='image-contain'>
                    <StyledLink to={`/collections/${collectionList.length>0 && collectionList[2].title}`}>
                        <div style={{position:'relative'}}>
                            <img src={collectionList.length>0 && collectionList[2].collection_image}/>
                            <div className='landing-coll-title'>{collectionList.length>0 && collectionList[2].title}</div>
                        </div>
                    </StyledLink>
                    <StyledLink to={`/collections/${collectionList.length>0 && collectionList[3].title}`}>
                        <div style={{position:'relative'}}>
                            <img src={collectionList.length>0 && collectionList[3].collection_image}/>
                            <div className='landing-coll-title'>{collectionList.length>0 && collectionList[3].title}</div>
                        </div>
                    </StyledLink>
                </div>
            </div>
        
        <h1 className='oswald text-center landing-name'>blacklife</h1>
        

        <div className='small-image-contain pr-4 pl-4 oswald'>
                <div className='image-contain'>
                <StyledLink to={`/products/${allProducts.length>0? allProducts[4].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[4].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[4].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[4].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[4].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[4].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                    <StyledLink to={`/products/${allProducts.length>0? allProducts[5].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[5].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[5].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[5].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[5].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[5].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                </div>
                
                <div className='image-contain'>
                <StyledLink to={`/products/${allProducts.length>0? allProducts[6].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[6].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[6].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[6].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[6].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[6].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                    <StyledLink to={`/products/${allProducts.length>0? allProducts[7].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[7].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[7].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[7].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[7].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[7].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                </div>
            </div>

            

            <div className='small-image-contain oswald pr-4 pl-4'>
                <div className='image-contain'>
                    <StyledLink to={`/products/${allProducts.length>0? allProducts[0].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[0].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[0].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[0].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[0].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[0].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                    
                    <StyledLink to={`/products/${allProducts.length>0? allProducts[1].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[1].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[1].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[1].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[1].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[1].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                </div>
                
                <div className='image-contain'>
                <StyledLink to={`/products/${allProducts.length>0? allProducts[2].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[2].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[2].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[2].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[2].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[2].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                    <StyledLink to={`/products/${allProducts.length>0? allProducts[3].product_uid:''}`}>
                        <div>
                            <img src={allProducts.length>0 && allProducts[3].image_url}/>
                            <div className='text-center' >
                                <h4 >{allProducts.length>0 && allProducts[3].name}</h4>
                                <div style={{color:'gray', marginTop:'-7px'}}>{allProducts.length>0 && allProducts[3].title}</div>
                                <div className='mr-2' style={{display:'inline', fontSize:'14px', color:'gray'}} ><s>{allProducts.length>0 && `$${allProducts[3].price}`}</s></div>
                                <div style={{display:'inline', fontSize:'14px'}}>{allProducts.length>0 && `$${allProducts[3].discount_price}`}</div>
                            </div>
                            
                        </div>
                    </StyledLink>
                </div>
            </div>
            
        </div>
        
       
        </>
    )
}