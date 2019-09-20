import React from 'react';
import Layout from './components/layout'
// import './App.scss';
// import { loadData } from './store/actions'
import { ProvideAuth } from "./hooks/useAuth.js";


import { DrumrProvider } from "./context/DrumrContext";

import Controller from './containers/controller'

const App = (props) => {
  // console.log(props)
  return ( 
    <ProvideAuth>
      <Layout>
        <DrumrProvider>
          <Controller/>
        </DrumrProvider>
      </Layout>
    </ProvideAuth>
  );
}

export default App;

// value={{state, dispatch}}