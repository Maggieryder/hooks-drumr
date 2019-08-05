
import $ from "jquery";

class Sequencer {
  constructor(ctx){
    this.context = ctx;
    this.isPlaying = false;
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
  }

  sequenceNote(trackIndex, barIndex, stepIndex) {
    this.sequences[trackIndex].steps[stepIndex] = this.sequences[trackIndex].steps[stepIndex]===0 ? 1 : 0;
    this.updateParams(this.sequences);
    console.log(trackIndex, 'seq', this.sequences[trackIndex].steps);
  }

  init(){
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

  updateParams(obj){
    for (let prop in obj){
      //console.log( prop + ' :: ' + obj[prop]);
      this[prop]= obj[prop];
    }
  }

  
  
  nextNote(){
    let kMaxSwing = .08;
    //let secondsPerBeat = 60.0 / this.tempo; // length of beat
    // this.nextNoteTime += this.secondsPerBeat() * .25; // without swing
    if (this.stepIndex % 2) {
      this.nextNoteTime += (0.25 - kMaxSwing * this.swingFactor) * this.secondsPerBeat();
    } else {
      this.nextNoteTime += (0.25 + kMaxSwing * this.swingFactor) * this.secondsPerBeat();
    }
    this.stepIndex = this.stepIndex === (this.noteResolution -1) ? 0 : ++this.stepIndex;
  }

  scheduleNote(step, time){
    let bars = document.querySelectorAll('.bar');
    // 	console.log(step)
    for (let i=0;i<this.sequences.length; i++){
      let noteClear = bars[i].querySelectorAll('.now')[0];
      //console.log('scheduleNote',noteClear);
      if (noteClear) noteClear.classList.toggle('now');
      let notes = bars[i].querySelectorAll('.note'),
      note = notes[step];
      if (this.sequences[i].steps[step]===1){
        this.tracks[i].triggerSample(time);
        note.classList.toggle('now');
        //console.log('scheduleNote',bars[i], notes);
      }
    }
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

  updateSwingFactor(e){
    let val = e.target.value;
    // updateInputStyle('swing', val);
    //sheet.textContent = getTrackStyle('swing', val);
    this.updateParams({swingFactor:val/100});
    $('#swingMeter').html(val+'%');
  }

  updateTempo(e){
    let val = e.target.value
    // tot = e.target.max - e.target.min,
    // perc = (val-e.target.min)/tot;
    // updateInputStyle('tempo', perc*100);
    //sheet.textContent = getTrackStyle('tempo', perc*100);
    this.updateParams({tempo:val});
    // DELAY.updateDelayTime(this.secondsPerBeat()*.5);
    // $('#tempoMeter').html(val+' bpm');
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