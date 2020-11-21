import React, { useState, useEffect } from 'react'
import StyledLink from '../utilities/styledLink'
import { Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions'


function Navigation({
    cart,
    logout,
    isAuthenticated,
    ...props
}) {

    const location= useLocation();
    useEffect(()=>{
      if (location.pathname.includes('/admin')){
        setNavDisplay('none')
    }else{
        setNavDisplay('flex')
    }  
    },[location.pathname])
    

    const [navDisplay, setNavDisplay]= useState('flex')

    // const [display, setDisplay] = useState('none');

    const history = useHistory();

    const [count, setCount] = useState('');

    function totalItems() {
        try {
             if (cart&&cart!==null) {
            const countArray = cart.map(product => product.count);
            const sum = countArray.reduce((total, num) => total + num);
            setCount(sum)
        }else{
            setCount('')
        }
        } catch (error) {
            console.log(error)
        }
       

    }

    useEffect(() => {
        if (cart===null||cart.length===0){
            setCount('');
            return
        }
        totalItems();
    }, [cart])

    // useEffect(()=>{
    //     setWindow(window.innerWidth)
    // },[])

    // const [windowWidth, setWindow]= useState('');

    return (
        <>
            <div className='nav-title playfair p-2'>
                <div className='ml-2 mt-auto mb-auto top'>
                    {isAuthenticated&&location.pathname.includes('/admin') ? <Button style={{ margin: '12px 2px'}} size='sm' variant='dark' className='oswald' onClick={() => logout()}>LOG OUT</Button> : (<> 
                    
                        <i class="fa fa-user-circle " onClick={() => history.push('/admin')} style={{ fontSize: '21px', marginRight: '2%', cursor: 'pointer' }}></i>
                        {/* <i class="fa fa-search " onClick={() => display == 'block' ? setDisplay('none') : setDisplay('block')} style={{ fontSize: '21px', float: "right", marginRight: '2%' }}></i> */}
                        </>)}

                        <div className='site-name' onClick={() => history.push('/')}>blacklife</div>

                        {isAuthenticated&&location.pathname.includes('/admin') ? <Button style={{ margin: '12px 2px'}} size='sm' variant='dark' className='oswald' onClick={() => logout()}>LOG OUT</Button> : (<>  <span style={{marginRight: '2%', lineHeight: 1.3, cursor: 'pointer' }} onClick={() => history.push('/cart')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" class="jss155"><path stroke="#000" stroke-width=".5" d="M10 1C8.14 1 6.625 2.495 6.625 4.333v1.111H2.688a.56.56 0 0 0-.561.513L1.002 20.402a.553.553 0 0 0 .148.42.567.567 0 0 0 .413.178h16.875a.566.566 0 0 0 .412-.178.552.552 0 0 0 .148-.42L17.873 5.957a.56.56 0 0 0-.56-.513h-3.938v-1.11C13.375 2.494 11.861 1 10 1zM7.75 4.333c0-1.225 1.01-2.222 2.25-2.222s2.25.997 2.25 2.222v1.111h-4.5v-1.11z"></path></svg>
                        <span className='jss157'>{count}</span>
                    </span>
                        {/* <i class="fa fa-search " onClick={() => display == 'block' ? setDisplay('none') : setDisplay('block')} style={{ fontSize: '21px', float: "right", marginRight: '2%' }}></i> */}
                        </>)}
                    

                </div>
                 {/* <div>
                     <Form style={{ display: `${display}`, maxWidth: '400px', margin: 'auto' }}>
                         <Form.Group className='mt-auto mb-auto'>
                             <Form.Control type='search' placeholder='Search' className='mt-auto mb-auto merriweather'>
                             </Form.Control>
                         </Form.Group>
                     </Form>
                 </div> */}

            </div>
            <div className='navigation-container oswald mb-4' style={{display:navDisplay}}>
                {props.collectionList.length>0 &&
                    props.collectionList.map(collection => {
                        return (

                            <StyledLink to={`/collections/${collection.title}`} key={collection.title} onClick={
                                () => window.location.href = `/collections/${collection.title}`
                            }>
                                <div className='text-uppercase'>{collection.title && collection.title}  </div>
                            </StyledLink>
                            // <div onClick={
                            //         ()=>window.location.href=`/collections/${collection.title}`
                            //     }>{collection.title && collection.title.toUpperCase()}</div>

                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.order.unfinishedOrder,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navigation);