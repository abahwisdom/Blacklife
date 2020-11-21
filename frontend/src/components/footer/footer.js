import React, { useEffect, useState } from 'react'
import { Accordion, Container} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

export default function Footer(){

    useEffect(()=>{
        setWindow(window.innerWidth)
    },[])

    const [windowWidth, setWindow]= useState('');

    const location= useLocation();
    useEffect(()=>{
      if (location.pathname.includes('/admin')){
        setNavDisplay('none')
    }else{
        setNavDisplay('grid')
    }  
    },[location.pathname])
    

    const [navDisplay, setNavDisplay]= useState('grid')

    return(
        <>
        
        <footer className="footer titillium" style={{display:navDisplay}} >
            <Container>
            <div className="left-foot text-center mb-2">
                <div className=' playfair' >
                    {/* <i class="fa fa-shopping-cart" style={{fontSize:'21px'}}></i>  */}
                blacklife </div>
                <small>(c) 2020 All Rights Reserved</small>
            </div>
            {windowWidth &&
            (<div className="right-foot" >
                <div className="line1">
                <Accordion defaultActiveKey={windowWidth<445?"1":"0"}>
                     <Accordion.Toggle as='h5' eventKey="0">
                           <div>Customer Care</div> 
                    </Accordion.Toggle>
                        
                    <Accordion.Collapse eventKey="0">
                    <div>
                        <div className='footer-item'> Contact Us</div>
                        <div className='footer-item'> Events</div>
                        <div className='footer-item'> FAQs</div>
                        <div className='footer-item'> Purchase a Gift Card</div>
                        <div className='footer-item'> Wholesale</div>   
                    </div> 
                    </Accordion.Collapse>
                    
                </Accordion> 
                </div>
                <div className="line2">
                    <Accordion defaultActiveKey={windowWidth<430?"1":"0"}>
                    <Accordion.Toggle as='h5' eventKey="0">
                            Support
                    </Accordion.Toggle>
                        
                    <Accordion.Collapse eventKey="0">
                    <div>
                        <div className='footer-item'> Affiliates</div>
                        <div className='footer-item'> Find a Store</div>
                        <div className='footer-item'> Terms & Privacy</div>
                        <div className='footer-item'> Statement of Community</div>
                        <div className='footer-item'> Reviews</div>
                    </div>
                    </Accordion.Collapse>
                </Accordion>
                </div>
                <div className="line3">
                <Accordion defaultActiveKey={windowWidth<430?"1":"0"}>
                    <Accordion.Toggle as='h5' eventKey="0">
                            Follow Us
                    </Accordion.Toggle>
                        
                    <Accordion.Collapse eventKey="0">
                    <div className='footer-social'>
                        <div className='footer-item'> <i className='fa fa-facebook'> </i>Facebook</div>
                        <div className='footer-item'> <i className='fa fa-instagram'> </i>Instagram</div>
                        <div className='footer-item'> <i className='fa fa-twitter'> </i>Twitter</div>
                        <div className='footer-item'> <i className='fa fa-pinterest'> </i>Pinterest</div>
                        <div className='footer-item'> <i className='fa fa-youtube'> </i>Youtube</div>
                    </div>
                    </Accordion.Collapse>
                </Accordion>
                </div>
            </div>)}
            </Container>
        </footer>
        </>
    )
}

        