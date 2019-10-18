import React, { useState } from 'react'

const initialState = {
    trackView: 0,
    zoomIndex: 1, 
    zoom: 2, 
    viewTrackSteps: true,
    editTrackStepsArray: []
}

const ViewsContext =  React.createContext([{}, () => {}])

const ViewsProvider = (props) => {
  const [state, setState] = useState(initialState);
  return (
    <ViewsContext.Provider value={[state, setState]}>
      {props.children}
    </ViewsContext.Provider>
  );
};

export { ViewsContext, ViewsProvider }