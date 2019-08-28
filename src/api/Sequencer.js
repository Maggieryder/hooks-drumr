import * as TYPES from '../actions/types'

const kMaxSwing = .08;
const kLookAhead = 25.0;
const kScheduleAhead = .1;
const kSwingOffset = .25;

class Sequencer {
  constructor(ctx){
    this.context = ctx
    // this.barIndex = 0
    // this.stepIndex = 0
    this.nextNoteTime = 0.0
    this.timeWorker = null
    this.store;
  }

  init(){
    // this.store = store;
    // this.store.subscribe(this.updateState.bind(this))
    // this.updateState()
    let self = this;
    this.timeWorker = new Worker('./time-worker.js');
    this.timeWorker.onmessage = function(e) {
      if (e.data === 'tick') {
        console.log('tick!');
        self.startScheduler();
      } else {
        console.log('message: ' + e.data);
        self.timeWorker.postMessage({'interval':kLookAhead});
      }
    }
  }  

  nextNote(){
    const { sequencer: { tempo, swing, numSteps, numBars, currentBar, currentStep } } = this.store.getState();
    if (currentStep % 2) {
      this.nextNoteTime += (kSwingOffset - this.swingFactor(swing)) * this.secondsPerBeat(tempo);
    } else {
      this.nextNoteTime += (kSwingOffset + this.swingFactor(swing)) * this.secondsPerBeat(tempo);
    }
    if (currentStep === (numSteps - 1)){
      // console.log('nextNote', currentBar, currentStep)
      const barIndex = currentBar === (numBars - 1) ? 0 : currentBar + 1
      this.store.dispatch({type: TYPES.UPDATE_CURRENT_BAR, value: barIndex })
      this.store.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: 0 })
    } else {
      this.store.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: currentStep + 1 })
    }
  }
  scheduleNote(time){
    let { sequencer: { currentBar, currentStep, sequences }, tracks: { all } } = this.store.getState();
    sequences.map((s, i) => {
      const { id, sequence } = s
      const track = all.filter(t => t.id() === id)
      sequence.map((bar, j) => {
        if ( j !== currentBar) return
        bar.map((step,k) => {
          if ( k !== currentStep ) return
          track.triggerSample(time)
        })
      })
    })
  }

  startScheduler(){
    while (this.nextNoteTime < this.context.currentTime + kScheduleAhead){
      this.scheduleNote(this.nextNoteTime);
      this.nextNote();
    }
  }

  togglePlay(isPlaying) {
    let message;
    if (isPlaying){
      // this.stepIndex = 0;
      this.nextNoteTime = this.context.currentTime;
      this.timeWorker.postMessage('start');
      message = 'stop';
    } else {
      this.timeWorker.postMessage('stop');
      message = 'play';
    }
    return message;
  }

  swingFactor(s) {
    return kMaxSwing * s/100;
  }
  
  secondsPerBeat(t){
    return 60.0 / t;
  }

}

export default Sequencer