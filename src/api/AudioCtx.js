const initAudioCtx = () => {
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




export { initAudioCtx }