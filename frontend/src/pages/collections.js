import React, {Suspense } from 'react'
import { Switch, Route} from 'react-router-dom'

import { connect } from 'react-redux'
import StyledLink from '../components/utilities/styledLink';

const CollectionPage= React.lazy(() => import('../components/collection/collection-page'));

const CollectionLanding=({collectionList})=>{
  return(
    <>
    <div className='grid-1-2 mr-2 ml-2 '>
    {
      collectionList.map(collection=>{
        return(
          <>
          <StyledLink to={`/collections/${collection.title}`} className='oswald mr-2 ml-2'>
            <img src={collection.collection_image} className='item-image' alt={collection.title}></img>
            <div>
              <h5 className='text-uppercase text-center'>{collection.title}</h5>
            </div>
          </StyledLink>
          </>
        )
      })
    }
    </div>
    
    </>
  )
}

  
function Collections(props) {

  return (
    
      <>
        {/* <Navigation
          collectionList={collectionList}
        /> */}
        <Suspense fallback= {null}>
        <Switch>
          <Route exact path='/collections'>
            <CollectionLanding collectionList={props.collectionList}/>
          </Route>

          <Route path='/collections/:id' children={<CollectionPage />} />
          

        </Switch>
        </Suspense>
      </>
    
  )
}

const mapStateToProps = (state) => ({
  collectionList: state.collection.allCollections
});

export default connect(mapStateToProps, { })(Collections);