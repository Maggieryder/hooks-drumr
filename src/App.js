import React, { useContext } from 'react';
import Layout from './components/layout'
import { ProvideAuth } from "./hooks/useAuth"

import Controller from './containers/controller'


const App = (props) => {

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