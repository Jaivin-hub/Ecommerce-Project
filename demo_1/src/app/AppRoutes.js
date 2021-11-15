import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
const Profile = lazy(() => import('./dashboard/Profile'))
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Category = lazy(() => import('./form-elements/Category'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));
const BasicElements = lazy(() => import('./form-elements/BasicElements'));
const BasicTable = lazy(() => import('./tables/BasicTable'));
const Mdi = lazy(() => import('./icons/glooo'));
const ChartJs = lazy(() => import('./charts/ChartJs'));
const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));
const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const Subcategory = lazy(() => import('./form-elements/Subcategory'));
const OrderMangement = lazy(() => import('./form-elements/orderManagemet'))
const Userdetails = lazy(() => import('./form-elements/userdetails'))
const Productdetails = lazy(() => import('./form-elements/Productdetails'))
const OfferManagement = lazy(() => import('./form-elements/OfferManagement'))
const Offers = lazy(() => import('./form-elements/Offers'))
const Editproducts = lazy(()=>import('../Editproducts'))
const Sailes = lazy(()=>import('./apps/Sailes'))
const categorydetails = lazy(()=>import('./form-elements/categorydetails'))
class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/categoryDetails" component={categorydetails} />
          <Route path="/productdetails/:id" component={Productdetails} />
          <Route path="/offermanagement" component={OfferManagement} />
          <Route path="/categoryOffers" component={Offers} />
          <Route path="/userdetails/:id" component={Userdetails} />
          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />
          <Route path='/sailes' component = {Sailes}/>
          <Route path="/orders" component={OrderMangement} />
          <Route path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/editproducts/:id' component={Editproducts} />
          <Route path="/form-Elements/basic-elements" component={BasicElements} />
          <Route path="/category" component={Category} />
          <Route path="/subcategory" component={Subcategory} />
          <Route path="/tables/basic-table" component={BasicTable} />
          <Route path="/icons/mdi" component={Mdi} />
          <Route path="/charts/chart-js" component={ChartJs} />
          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;