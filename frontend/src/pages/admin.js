import React, { useEffect } from 'react'
import {Switch, Route} from 'react-router-dom'
import Product from '../components/admin/product/product'
import Collection from '../components/admin/collection/collection'
import AdminLanding from '../components/admin/collection/AdminLanding'
import NotFound from './404'
import SignIn from '../components/admin/auth/pages/sign-in'
// import SignUp from '../components/admin/auth/pages/sign-up'
import store from '../redux/store';
import { loadUser } from '../redux/actions/authActions.js';

export default function Admin(){

    useEffect(() => {
        store.dispatch(loadUser());
      }, []);

    return(
        <>
        <Switch>
            <Route exact path='/admin'>
                <AdminLanding/>
            </Route>
            <Route path='/admin/auth/sign-in'>
                <SignIn/>
            </Route>
            {/* <Route path='/admin/auth/sign-up'>
                <SignUp/>
            </Route> */}
            <Route path='/admin/collections/:id'>
                <Collection/>
            </Route>
            <Route path='/admin/product/:id'>
                <Product/>
            </Route>
            <Route path='/admin/*'>
                <NotFound/>
            </Route>

        </Switch>
       
        </>
    )
}


