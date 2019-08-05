import React from 'react';
// import './App.scss';
// import { loadData } from './store/actions'

import { DrumrProvider } from "./context/DrumrContext";

import Controller from './containers/controller'

const App = (props) => {
  // console.log(props)
  return ( 
    <DrumrProvider>
      <div className="App">
        <Controller/>
      </div>
    </DrumrProvider>
  );
}

export default App;

// value={{state, dispatch}}