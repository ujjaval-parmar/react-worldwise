import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { CitiesProvider } from './contexts/CitiesProvider';
import { AuthProvider } from './contexts/FackAuth';
import ProtectedRoute from './pages/ProtectedRoute';


import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';
import SpinnerFullPage from './Components/SpinnerFullPage';

// import HomePage from './pages/HomePage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';
// import PageNotFound from './pages/PageNotFound';

const HomePage = lazy(() => import('./pages/HomePage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));



const App = () => {


  return (
    <AuthProvider>
      <CitiesProvider>

        <BrowserRouter>

          <Suspense fallback={<SpinnerFullPage />} >
            <Routes>

              <Route index element={<HomePage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />



              <Route path='app' element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>

                <Route index
                  element={<Navigate to='cities' replace='/' />}
                />

                <Route path='cities' element={<CityList />} />

                <Route path='cities/:id' element={<City />} />

                <Route path='countries' element={<CountryList />} />

                <Route path='form' element={<Form />} />

              </Route>






              <Route path='*' element={<PageNotFound />} />

            </Routes>

          </Suspense>

        </BrowserRouter>

      </CitiesProvider>
    </AuthProvider>
  )
}

export default App