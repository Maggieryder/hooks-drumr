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
    this.numBars = 2
    this.numSteps = 16
    this.currentBar = 0
    this.currentStep = 0

    this.startTime = null
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
    // console.log('nextNote', this.currentBar, this.currentStep)
    if (this.currentStep === (this.numSteps - 1)){   
      const barIndex = this.currentBar < (this.numBars - 1) ? this.currentBar + 1 : 0
      console.log('barIndex', barIndex)
      this.currentBar = barIndex
      this.dispatch({type: TYPES.UPDATE_CURRENT_BAR, value: barIndex })
      this.currentStep = 0
      this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: this.currentStep })
    } else {
      this.currentStep = this.currentStep + 1 
      this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: this.currentStep })
    }
  }
  scheduleNote(time){
    this.sequences.map((s, x) => {
      const { sequence } = s
      // const track = this.tracks.filter(t => t.id() === id)
      const track = this.tracks[x]
      // console.log('scheduleNote track', track.id())
      sequence.map((bar, i) => {
        if ( i !== this.currentBar) return false
        bar.map((step,j) => {
          if ( j !== this.currentStep ) return false
          // console.log('bar/step', i, step)
          if (step === 1) {
            // this.dispatch({type: TYPES.TRIGGERING, {trackId: track.id(), value: true}})
            const triggerEv = new CustomEvent('triggerNote', { detail: track });
            window.dispatchEvent(triggerEv)
            track.triggerSample(time)
          }
          return true
        })
        return true
      })
      return true
    })
  }

  startScheduler(){
    while (this.nextNoteTime < this.context.currentTime + kScheduleAhead){
      this.scheduleNote(this.nextNoteTime)
      this.nextNote()
    }
  }

  togglePlay() {
    let message;
    this.isPlaying = !this.isPlaying
    this.currentStep = 0
    this.dispatch({type: TYPES.UPDATE_CURRENT_STEP, value: 0 })
    if (this.isPlaying){
      this.currentBar = 0
      this.dispatch({type: TYPES.UPDATE_CURRENT_BAR, value: 0 })
      // this.context.resume()
      this.nextNoteTime = this.context.currentTime
      this.timeWorker.postMessage('start')  
      message = 'stop'
    } else {
      // this.context.suspend()
      this.timeWorker.postMessage('stop')
      message = 'play'
    }
    return message
  }

  updateSequences(sequences) {
    this.sequences = sequences
  }

  updateTracks(tracks) {
    // console.log('%%%%%%%%%%%%%%%% tracks', tracks)
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
    // console.log('%%%%%%%%%%%%%%%% updateNumBars', numBars)
    this.numBars = numBars
  }

  updateCurrentBar(index) {
    // console.log('########## updateCurrentBar', index)
    this.currentBar = index
  }
  
  secondsPerBeat(t){
    return 60.0 / t
  }

  running(){
    return this.isPlaying;
  }

  destroy(){
    console.log('[ SEQUENCER ] destroy')
    this.context.close()
  }

}

export default Sequencer