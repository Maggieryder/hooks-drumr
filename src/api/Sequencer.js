import * as Types from '../actions/types'

const kMaxSwing = .08;

class Sequencer {
  constructor(ctx){
    this.context = ctx;
    this.isPlaying = false;
    this.barIndex = 0;
    this.stepIndex = 0;
    this.nextNoteTime = 0.0;
    this.lookahead = 25.0;
    this.scheduleAhead = 0.1;
    // this.timeWorker;
    this.sequences = [];
    // this.tracks = [];
    this.tempo = 120; // options.tempo ||
    this.noteResolution = 16; //options.noteResolution ||
    this.swingFactor = 0;
    //this.updateParams(options);
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
        self.timeWorker.postMessage({'interval':self.lookahead});
      }
    }
  }
  
  // nextNote(){
  //   // let kMaxSwing = .08;
  //   //let secondsPerBeat = 60.0 / this.tempo; // length of beat
  //   // this.nextNoteTime += this.secondsPerBeat() * .25; // without swing
  //   if (this.stepIndex % 2) {
  //     this.nextNoteTime += (0.25 - kMaxSwing * this.swingFactor) * this.secondsPerBeat();
  //   } else {
  //     this.nextNoteTime += (0.25 + kMaxSwing * this.swingFactor) * this.secondsPerBeat();
  //   }
  //   this.stepIndex = this.stepIndex === (this.noteResolution -1) ? 0 : ++this.stepIndex;
  // }

  // scheduleNote(step, time){
  //   // let bars = document.querySelectorAll('.bar');
  //   // 	console.log(step)
  //   for (let i=0;i<this.sequences.length; i++){
  //     // let noteClear = bars[i].querySelectorAll('.now')[0];
  //     //console.log('scheduleNote',noteClear);
  //     // if (noteClear) noteClear.classList.toggle('now');
  //     // let notes = bars[i].querySelectorAll('.note'),
  //     // note = notes[step];
  //     if (this.sequences[i].steps[step]===1){
  //       this.tracks[i].triggerSample(time);
  //       // note.classList.toggle('now');
  //       //console.log('scheduleNote',bars[i], notes);
  //     }
  //   }
  // }
  nextNote(){
    let { controller } = this.store.getState();
    let { swing, resolution, numBars, barId, stepId } = controller;
    let swingFactor = kMaxSwing * swing/100;
    if (this.stepIndex % 2) {
      this.nextNoteTime += (0.25 - swingFactor) * this.secondsPerBeat();
    } else {
      this.nextNoteTime += (0.25 + swingFactor) * this.secondsPerBeat();
    }
    if (this.stepIndex === (resolution -1)){
      // console.log('nextNote', this.barIndex, this.stepIndex)
      this.barIndex = this.barIndex === (numBars - 1) ? 0 : ++this.barIndex;
      this.store.dispatch({type:Types.UPDATE_BAR_ID, value: this.barIndex })
      this.stepIndex = 0;
    } else {
      this.stepIndex++;
    }
  }
  scheduleNote(step, time){
    let { controller } = this.store.getState();
    let { resolution, barId } = controller;
    let myObj = this.sequences;
    // console.log(myObj)
    // for (let i=0;i<this.sequences.length; i++){
    //   let bars = this.sequences[i].sequence
    //   console.log(bars)
    //   for (let j=0;j<bars.length;j++){
    //     console.log(j, barId)
    //     if (j===barId && bars[j][step]===1){
    //       console.log('schedule note this.tracks[i]', this.tracks[i])
    //       this.tracks[i].triggerSample(time);
    //     }
    //   }
    // }
    let i = 0;
    for (let id in myObj){
      let bars = myObj[id];
      console.log(bars)
      for (let j=0;j<bars.length;j++){
        // console.log(j, barId)
        if (j===barId && bars[j][step]===1){
          // console.log('schedule note this.tracks[id]', this.tracks[id])
          this.tracks[id].triggerSample(time);
        }
      }
      i++;
    }
    this.store.dispatch({type:Types.UPDATE_STEP_ID, value: (barId*resolution) + step})
  }

  startScheduler(){
    while (this.nextNoteTime < this.context.currentTime + this.scheduleAhead){
      this.scheduleNote(this.stepIndex, this.nextNoteTime);
      this.nextNote();
    }
  }

  // onNoteTap(e){
  //   e.preventDefault();
  //   let trackIndex = $(this).parent().parent().parent().parent().index();
  //   let beat = $(this).parent().parent().index();
  //   let subbeat = $(this).index();
  //   let step = (beat*4) + subbeat;
  //   $(this).toggleClass('on');
  //   //console.log('trackIndex', trackIndex, 'step', step);
  //   if (!SEQUENCER.running())
  //     MIXER.tracks[trackIndex].triggerSample(CTX.currentTime);
  //   sequenceNote(trackIndex,step);
  // }

  // sequenceNote(trackIndex, barIndex, stepIndex) {
  //   this.sequences[trackIndex].steps[stepIndex] = this.sequences[trackIndex].steps[stepIndex]===0 ? 1 : 0;
  //   this.updateParams(this.sequences);
  //   console.log(trackIndex, 'seq', this.sequences[trackIndex].steps);
  // }

  updateSequences(sequences){
    this.sequences = sequences
    console.log('[ api ] this.sequences', this.sequences)
  }

  updateParams(obj){
    for (let prop in obj){
      //console.log( prop + ' :: ' + obj[prop]);
      this[prop]= obj[prop];
    }
  }

  updateSwingFactor(val){
    // let val = e.target.value;
    //sheet.textContent = getTrackStyle('swing', val);
    this.updateParams({swingFactor:val/100});
  }

  updateTempo(val){
    // let val = e.target.value
    // tot = e.target.max - e.target.min,
    // perc = (val-e.target.min)/tot;
    //sheet.textContent = getTrackStyle('tempo', perc*100);
    this.updateParams({tempo:val});
    // DELAY.updateDelayTime(this.secondsPerBeat()*.5);
  }

  togglePlay() {
    let message;
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying){
      this.stepIndex = 0;
      this.nextNoteTime = this.context.currentTime;
      this.timeWorker.postMessage('start');
      message = 'stop';
    } else {
      this.timeWorker.postMessage('stop');
      message = 'play';
    }
    return message;
  }
  
  secondsPerBeat(){
    return 60.0 / this.tempo;
  }

  running(){
    return this.isPlaying;
  }

}

export default Sequencer