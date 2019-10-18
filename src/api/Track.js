// import * as Types from '../actions/types'
import { Sample, trigger } from './Sample'

import PannerNode from './Panner'
// import Panner from './Panner'
// import AudioProcessor from './AudioProcessor'

import { AUDIO_CONTEXT, MIXER, REVERB, DELAY } from './'


export default class Track {
  constructor(id, color){
    this._trackId = id
    this._context = AUDIO_CONTEXT
    this._destination = MIXER.dryMix()
    this._reverbNode = REVERB.node()
    this._delayNode = DELAY.node()
    this._buffer = null
    this._duration = 0
    // this.store = store;
    // this.store.subscribe(this.updateState.bind(this));

    this._outputGain = AUDIO_CONTEXT.createGain()
    this._reverbSendGain = AUDIO_CONTEXT.createGain()
    this._delaySendGain = AUDIO_CONTEXT.createGain()

    this._panner = new PannerNode(AUDIO_CONTEXT)
    this._panner.connect(this._reverbSendGain)
    this._panner.connect(this._delaySendGain)
    this._panner.connect(this._outputGain)

    this._color = color
    // this._reverbSendGain.connect(this._reverbNode)
    // this._delaySendGain.connect(this._delayNode)
    // this._outputGain.connect(this._destination)

    // this._meter = new AudioProcessor(this._context, this._trackId)
    // this._meter.init(this._outputGain, this._destination)

    // this.sourceNode;
    // this.sample;
    // this.buffer;
    this._mute = false
    this._solo = false
    this.updateVolume(5)
    this.updatePan(0)
    this.updateReverbSend(0)
    this.updateDelaySend(0)
    this.connect()
  }

//   updateState(){
//     let { tracks, kits, controller } = this.store.getState();
//     // let trackData = tracks.filter(t => t.id === this.id);
//     let trackData = tracks[this.id];
//     let { buffers } = kits;
//     // console.log('buffers', buffers)
//     // console.log('thisTrackData', tracks);
//     if (trackData){
//       console.log('thisTrackData', trackData);
//       let { bufferId,
//         volume,
//         mute,
//         solo,
//         reverbSend,
//         delaySend } = trackData;
//       // console.log('bufferId', bufferId);
//       if (this.buffer !== buffers[bufferId]) this.assignSample(buffers[bufferId]);
//       if (Math.round(this.getVolume()*10) !== volume ) this.updateVolume(volume/10);
//       if (Math.round(this.getSendGain(0)*10) !== reverbSend ) this.updateSendGain(0, reverbSend/10);
//       if (Math.round(this.getSendGain(1)*10) !== delaySend ) this.updateSendGain(1, delaySend/10);
//       if (this.mute !== mute ) this.toggleMute(mute);
//       if (this.isSolo !== solo ) this.toggleSolo(solo);
//     }
//   }

  init(destination, reverbNode, delayNode){
    
  }
  id(){
    return this._trackId;
  }
  color(){
    return this._color;
  }

  buffer(){
    return this._buffer;
  }

  duration() {
    return this._duration
  }


//   assignSample(buffer){
//     this.buffer = buffer;
//     this.sample = new Sample(this.context, buffer, this.panner.node(), this.outputGain,this.sendGains[0],this.sendGains[1]);
//   }
//   triggerSample(time){
//     this.sample.trigger(time);
//   }
  toggleMute(){ 
    // console.log('toggleMute')
    this._mute = !this._mute
    this._mute ? this.disconnect() : this.connect();
  }
  isMute(){
    return this._mute;
  }
  toggleSolo(){
    this._solo = !this._solo
  }
  isSolo(){
    return this._solo;
  }
  updateVolume(value){
    // console.log('[Track Api] updateVolume '+this.id()+' volume', value )
    this._outputGain.gain.value = value;
  }
  getVolume(){
    return this._outputGain.gain.value;
  }
  updatePan(value){
    // console.log('[Track Api] updatePan id '+this.id()+' value', value )
    let xPos = value,
      yPos = 0,
      zPos = 1 - Math.abs(xPos);
    // this._panner.setPosition(xpos, 0, zpos);
    if(this._panner.positionX) {
      this._panner.positionX.value = xPos;
      this._panner.positionY.value = yPos;
      this._panner.positionZ.value = zPos;
    } else {
      this._panner.setPosition(xPos,yPos,zPos);
    }
  }
  updateReverbSend(value){
    // console.log('[Track Api] updateReverbSend id '+this.id()+' send', value )
    this._reverbSendGain.gain.value = value;
  }
  reverbSend(){
    return this._reverbSendGain.gain.value;
  }
  updateDelaySend(value){
    // console.log('[Track Api] updateDelaySend id '+this.id()+' send', value )
    this._delaySendGain.gain.value = value;
  }
  delaySend(){
    return this._delaySendGain.gain.value;
  }
  connect(){
    // console.log('[Track Api] connect '+this.id())
    this._reverbSendGain.connect(this._reverbNode)
    this._delaySendGain.connect(this._delayNode)
    this._outputGain.connect(this._destination)
    // this._meter.connect()
  }
  disconnect(){
    // console.log('[Track Api] disconnect '+this.id())
    this._reverbSendGain.disconnect(this._reverbNode)
    this._delaySendGain.disconnect(this._delayNode)
    this._outputGain.disconnect(this._destination)
    // this._meter.disconnect();
  }
  assignTrackBuffer(buffer){
    // console.log('[Track Api] assignTrackBuffer', buffer)
    this._buffer = buffer
    this._duration = buffer ? buffer.duration : 0
  }
  triggerSample(time) {
    // console.log('triggerSample')
    const sample = new Sample( AUDIO_CONTEXT, this._buffer )
    sample.connect(this._panner);
    // if (AUDIO_CONTEXT.state === 'suspended') {
    //   AUDIO_CONTEXT.resume()
    //   setTimeout(()=> AUDIO_CONTEXT.suspend(), 100)
    // }
    trigger(sample, time);
  }
}

