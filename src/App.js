import React from 'react';
// import './App.scss';
// import { loadData } from './store/actions'
import { ProvideAuth } from "./hooks/useAuth.js";


import { DrumrProvider } from "./context/DrumrContext";

import Controller from './containers/controller'

const App = (props) => {
  // console.log(props)
  return ( 
    <ProvideAuth>
      <div className="App">
        <DrumrProvider>
          <Controller/>
        </DrumrProvider>
      </div>
    </ProvideAuth>
  );
}

export default App;

// value={{state, dispatch}}