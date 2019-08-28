import * as TYPES from '../actions/types'

const kMaxSwing = .08;
const kLookAhead = 25.0;
const kScheduleAhead = .1;
const kSwingOffset = .25;

class Sequencer {
  constructor(ctx){
    this.context = ctx
    this.dispatch = null
    this.timeWorker = null
    this.nextNoteTime = 0.0

    this.sequences = []
    this.tracks = []
    this.isPlaying = false
    this.tempo = 120
    this.swing = 0
    this.numBars = 1
    this.numSteps = 16

    this.currentBar = 0
    this.currentStep = 0
  }

  init(dispatch){
    this.dispatch = dispatch
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
    if (this.currentStep % 2) {
      this.nextNoteTime += (kSwingOffset - this.swing) * this.secondsPerBeat(this.tempo);
    } else {
      this.nextNoteTime += (kSwingOffset + this.swing) * this.secondsPerBeat(this.tempo);
    }
    if (this.currentStep === (this.numSteps - 1)){
      // console.log('nextNote', this.currentBar, this.currentStep)
      this.currentBar = this.currentBar === (this.numBars - 1) ? 0 : this.currentBar + 1
      this.dispatch({type: TYPES.UPDATE_CURRENT_BAR, value: this.currentBar })
      this.currentStep = 0
      this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: this.currentStep })
    } else {
      this.currentStep = this.currentStep + 1 
      this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: this.currentStep })
    }
  }
  scheduleNote(time){
    this.sequences.map((s) => {
      const { id, sequence } = s
      const track = this.tracks.filter(t => t.id() === id)
      console.log('scheduleNote track', track)
      sequence.map((bar, i) => {
        if ( i !== this.currentBar) return
        bar.map((step,j) => {
          if ( j !== this.currentStep ) return
          if (step === 1) track.triggerSample(time)
        })
      })
    })
  }

  startScheduler(){
    while (this.nextNoteTime < this.context.currentTime + kScheduleAhead){
      this.scheduleNote(this.nextNoteTime)
      this.nextNote()
    }
  }

  togglePlay(isPlaying) {
    let message;
    this.isPlaying = isPlaying
    if (isPlaying){
      // this.currentBar = 0
      this.dispatch({type: TYPES.UPDATE_CURRENT_BAR, value: this.currentBar })
      this.currentStep = 0
      this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: this.currentStep })
      this.nextNoteTime = this.context.currentTime
      this.timeWorker.postMessage('start')
      message = 'stop'
    } else {
      this.timeWorker.postMessage('stop')
      message = 'play'
    }
    return message
  }

  updateSequences(sequences) {
    this.sequences = sequences
  }

  updateTracks(tracks) {
    console.log('%%%%%%%%%%%%%%%% tracks', tracks)
    this.tracks = tracks
  }

  updateTempo(tempo) {
    this.tempo = tempo
  }

  updateSwing(swing) {
    this.swing = kMaxSwing * swing/100
  }

  updateNumSteps(numSteps) {
    this.numSteps = numSteps
  }

  updateNumBars(numBars) {
    this.numBars = numBars
  }

  updateCurrentBar(index) {
    this.currentBar = index
  }
  
  secondsPerBeat(t){
    return 60.0 / t
  }

  running(){
    return this.isPlaying;
  }

}

export default Sequencer