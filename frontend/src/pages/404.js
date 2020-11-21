import React from 'react';

// import StyledLink from '../components/utilities/styledLink';

const NotFound = () => (
  <div className='oswald m-auto text-center'>
    <h1 style={{fontSize:'8.5rem'}} >404</h1>
    <div style={{color:'gray', marginLeft: '25px', fontSize: '1.5rem', marginTop: '-32px'}}>Page Not Found</div>
    {/* <StyledLink className='mr-0' to="/">
      Go Home
    </StyledLink> */}
  </div>
);

export default NotFound;