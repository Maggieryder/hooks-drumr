import Processor from './Processor'

class Delay extends Processor {
  constructor(context, destination){
    super(context, destination)
    this.init()
  }
  init() {
    this._delay = this._context.createDelay()
    this._feedback = this._context.createGain()
    this._filter = this._context.createBiquadFilter()
  }
  updateDelayTime(val){
    console.log('updateDelayTime', val);
    this._delay.delayTime.value = val;
  }
  updateFeedbackGain(val){
    console.log('updateFeedbackGain', val);
    this._feedback.gain.value = val;
  }
  updateFrequency(val){
    console.log('updateFrequency', val);
    this._filter.frequency.value = val;
  }
  connect(){
    console.log('[Delay] connect', this._destination);
    this._delay.connect(this._feedback)
    this._feedback.connect(this._filter)
    this._filter.connect(this._delay)
    this._delay.connect(this._destination)
  }
  disconnect(){
    console.log('[Delay] disconnect', this._destination);
    this._delay.disconnect(this._feedback)
    this._feedback.disconnect(this._filter)
    this._filter.disconnect(this._delay)
    this._delay.disconnect(this._destination)
  }
  node(){ return this._delay }
}

export default Delay