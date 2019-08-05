import axios from 'axios'

import { dispatch } from '../context/DrumrContext'

export const CTX = initAudioCtx();

// import { Sequencer } from '../api/Sequencer'

/** PRIVATE ACTIONS **/
function initAudioCtx(){
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    console.log('Web Audio API is WORKING!!!')
    //console.log(context.sampleRate); // → 44100
    //console.log(context.destination.channelCount); // → 2
    //console.log(context.currentTime); // → 1182.5980952380953
    return context;
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

const loadBuffer = async (context, url, callback) => {
  const request = new XMLHttpRequest();
    //header('Access-Control-Allow-Origin: *');
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        callback(buffer);
      },
      function(e){ alert("Error with decoding audio data", e ); });
    };
    request.send();
}
/** PUBLIC ACTIONS **/
export const loadData = async (url) => {
  isLoading();
  try {
    const response = await axios.get(`./${url}.json`)
    console.log('Success!',response.data.kits);
    dispatch(setData(response.data.kits)); 
    setCurrentKit(response.data.kits[1]); 
  } catch (err) {
    isError(err);
  }
}

export const loadBuffers = async (obj, callback) => {
  isLoading(true);
  const directory = obj.directory,
  voices = obj.voices;
  let buffers = [],
  buffersToLoad = voices.length;
  for (let i = 0;i<voices.length;i++){
    buffers[i] = { label:voices[i].label, buffer:{}, value: i };
    loadBuffer(CTX, 'assets/audio/'+ directory + voices[i].smple, (buffer) => {
        //console.log(buffer);
        buffers[i].buffer = buffer;
        buffersToLoad --;
        console.log('samplesToLoad', buffersToLoad);
        if (buffersToLoad < 1) {
          callback(buffers); 
        } 
      }
    )
  }
}

export const isLoading = () => {
  return {
    type: 'IS_LOADING'
  }
}

export const setData = data => {
  return {
    type: 'DATA_LOADED',
    data
  }
}

export const kitBuffersLoaded = buffers => {
  return {
    type: 'KIT_BUFFERS_LOADED',
    buffers
  }
}

export const verbBuffersLoaded = buffers => {
  return {
    type: 'VERB_BUFFERS_LOADED',
    buffers
  }
}


export const setCurrentKit = index => {
  return {
    type: 'CURRENT_KIT',
    index
  }
}

export const isError = err => {
  return {
    type: 'IS_ERROR',
    err
  }
}


