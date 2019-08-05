import React, { useReducer, useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import Select from '../components/ui/select'
// import Select from 'react-select'
import Tracks from '../components/tracks'
import Processors from '../components/processors'

import classes from './controller.module.scss'


import DrumrContext from '../context/DrumrContext'
import { setCurrentKit } from '../store/actions'
import reducer from '../store/reducer'



const initialState = {
  loading: false,
  error: null,
  kits: null,
  verbs: null,
  kitBuffers: {},
  verbBuffers: {},
  currentKit: 0,
  currentVerb: 0
};

const Controller = (props) => {
  const [ mousePosition, setMousePosition ] = useState({x:null,y:null})
  // const [ kits, setKits ] = useState(null)
  // const [ currentKit , setCurrentKit ] = useState(null)
  // const [ buffers, setBuffers] = useState({})
  // const [ loading, setLoading] = useState(true);
  // const [ error, setError] = useState(null);
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // const kitInputRef = useRef();

  // const value = useContext(DrumrContext);
  // console.log('Context', value);

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove)
  //   return (() => {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //   })
  // }, []);
  // useEffect(() => {
  //   loadData('resources')
  //   return (() => {
      
  //   })
  // }, []);

  // useEffect(() => {
  //   console.log('[Controller] kit', currentKit)
  //   if (currentKit) loadBuffers(currentKit)  
  //   return (() => {
      
  //   })
  // }, [currentKit]);

  // const loadData = async (url) => {
  //   // setLoading(true);
  //   try {
  //     const response = await axios.get(`${url}.json`)
  //     console.log('Success!',response.data.kits);
  //     setLoading(false);
  //     setKits(response.data.kits); 
  //     setCurrentKit(kits[1]); 
  //   } catch (err) {
  //     // setLoading(false);
  //     setError(err);
  //   }
  // }

  // function loadSample(context, url, callback) {
  //   const request = new XMLHttpRequest();
  //   //header('Access-Control-Allow-Origin: *');
  //   request.open('get', url, true);
  //   request.responseType = 'arraybuffer';
  //   request.onload = function() {
  //     context.decodeAudioData(request.response, function(buffer) {
  //       callback(buffer);
  //     },
  //     function(e){ alert("Error with decoding audio data", e ); });
  //   };
  //   request.send();
  // }
  
  // function loadBuffers(kit){
  //   setLoading(true);
  //   const directory = kit.directory,
  //   voices = kit.voices;
  //   let samples = [],
  //   samplesToLoad = voices.length;
  //   for (let i = 0;i<voices.length;i++){
  //     samples[i] = { name:voices[i].name, buffer:{} };
  //     loadSample(CTX, 'assets/audio/'+ directory + voices[i].smple, (buffer) => {
  //         //console.log(buffer);
  //         samples[i].buffer = buffer;
  //         samplesToLoad --;
  //         console.log('samplesToLoad', samplesToLoad);
  //         if (samplesToLoad < 1) {
  //           setBuffers(samples);
  //           setLoading(false);
  //           console.log('done!')      
  //         } 
  //       }
  //     )
  //   }
  // }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  return (
    <DrumrContext.Provider value={ [ state, dispatch ] }>
      <div className={classes.controller}>
        
        {/* <Select
          className='select-kit'
          style={{color: '#000000'}}
          isSearchable={false}
          defaultValue={kit}
          controlShouldRenderValue={true}
          // selectOption={kit}
          // ref={queryInputRef}
          value={kit}
          onChange={option => setCurrentKit(option.value)}
          options={options}
        /> */}
        { state.kits ? <Select
          options={state.kits}
          onValueChange={value => setCurrentKit(state.kits[value]) }
        /> : null }
        <Tracks />
        <Processors />
        <div>{mousePosition.x} {mousePosition.y}</div>
      </div>
    </DrumrContext.Provider>
  );
}

export default Controller