import React, { Suspense, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/landing';

import {fetchAllCollections} from './redux/actions/collectionActions'
import { connect } from 'react-redux';

import Navigation from './components/navigation/navigation'
import Footer from './components/footer/footer';
import ScrollTop from './components/utilities/ScrollTop';

const NotFound= React.lazy(() => import('./pages/404'));
const Collections= React.lazy(() => import('./pages/collections'));
const Products= React.lazy(() => import('./pages/products'));
const Cart= React.lazy(() => import('./components/cart/cart-page'));
const Admin= React.lazy(() => import('./pages/admin'));
const Order= React.lazy(() => import('./pages/order'));

const App=({
  fetchAllCollections,
  collectionList
})=>{

  useEffect(()=>{
    fetchAllCollections()
  },[])

  return(
    <Suspense fallback={null}>
    <BrowserRouter>
      <ScrollTop>
    <div className='wrapper'>
    <Navigation collectionList={collectionList}/>
    <Switch>

      <Route exact path='/'>
        <Landing collectionList={collectionList}/>
      </Route>

        <Route path='/collections'>
          <Collections/>
        </Route>
        <Route path='/products'>
          <Products/>
        </Route>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/order'>
          <Order/>
        </Route>
        <Route path='/admin'>
          <Admin/>
        </Route>
        <Route path='*'>
          <NotFound/>
        </Route>
      
    </Switch>
    </div>
    <div className='push'></div>
    <Footer/>
    </ScrollTop>
    </BrowserRouter>
    </Suspense>
  )
}

const mapStateToProps = (state) => ({
  collectionList: state.collection.allCollections
});

export default connect(mapStateToProps, { fetchAllCollections })(App);


// design trends
// reusable components
