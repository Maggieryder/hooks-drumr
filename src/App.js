import React from 'react';
import Layout from './components/layout'
import useLoadData from './hooks/useLoadData'
import { ProvideAuth } from "./hooks/useAuth";

import Controller from './containers/controller'


const App = (props) => {

  const { response, error, isLoading } = useLoadData('./resources.json')

  if ( isLoading ) return <h1>Loading...</h1>
  if ( error ) return <h1>Something went wrong!</h1>
  // console.log(props)
  return ( 
    <ProvideAuth>
      <Layout>
        <Controller {...response} />
      </Layout>
    </ProvideAuth>
  );
}

export default App;

// value={{state, dispatch}}