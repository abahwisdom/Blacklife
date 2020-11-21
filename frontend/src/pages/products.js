import React, {Suspense } from 'react'
import {Switch, Route} from 'react-router-dom'
import NotFound from './404';


const ProductPage= React.lazy(() => import('../components/product/product-page'));
  
export default function Products() {
  
  return (
      <>
        <Suspense fallback= {null}>
        <Switch>
          <Route exact path='/products'>
            <NotFound/>
          </Route>
          <Route path='/products/:id' children={<ProductPage />} />

        </Switch>
        </Suspense>
      </>
  )
}