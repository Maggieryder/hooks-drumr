import React from 'react';
import Layout from './components/layout'
// import './App.scss';
// import { loadData } from './store/actions'
import { ProvideAuth } from "./hooks/useAuth.js";


import Controller from './containers/controller'

const App = (props) => {
  // console.log(props)
  return ( 
    <ProvideAuth>
      <Layout>
        <Controller/>
      </Layout>
    </ProvideAuth>
  );
}

export default App;

// value={{state, dispatch}}