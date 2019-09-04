class Mixer {
  constructor(context){
    this._context = context
    this._tracks = []
    this._soloTracks = []
    this._mutedTracks = []
    this.init()
  }
  init(){
    this._context.listener.setOrientation(0, 0, -1, 0, 1, 0);
    this._wetMix = this._context.createGain()
    this._dryMix = this._context.createGain()
    this._masterMix = this._context.createGain()
    this._wetMute = false
    this._dryMute = false
    this.connect()
    this.updateWetVolume(.7)
    this.updateDryVolume(.7)
    this.updateMasterVolume(.7)
    // console.log('this.wetMix()', this.wetMix().gain.value)
  }
  connect() {
    this.connectWetMix()
    this.connectDryMix()
    this.connectMasterMix()
  }
  connectWetMix(){
    this._wetMix.connect(this._masterMix)
  }
  disconnectWetMix(){
    this._wetMix.disconnect(this._masterMix)
  }
  connectDryMix(){
    this._dryMix.connect(this._masterMix)
  }
  disconnectDryMix(){
    this._dryMix.disconnect(this._masterMix)
  }
  connectMasterMix(){
    this._masterMix.connect(this._context.destination) 
  }
  disconnectMasterMix(){
    this._masterMix.disconnect(this._context.destination)
  }
  updateWetVolume(val){
    this._wetMix.gain.value =  val;
  }
  updateDryVolume(val){
    this._dryMix.gain.value = val;
  }
  updateMasterVolume(val){
    this._masterMix.gain.value = val;
  }
  toggleWetMute(){
    this._wetMute = !this._wetMute;
    this._wetMute ? this.disconnectWetMix() : this.connectWetMix()
  }
  toggleDryMute(){
    this._dryMute = !this._dryMute;
    this._dryMute ? this.disconnectDryMix() : this.connectDryMix()
  }
  masterMix(){
    return this._masterMix
  }
  wetMix(){
    return this._wetMix
  }
  dryMix(){
    return this._dryMix
  }
  soloTracks( all, soloed ){
    const notSoloed = all.filter(track => !soloed.includes(track))
    const tracksToMute = notSoloed.filter(track => !track.isMute())
    tracksToMute.map(track => track.toggleMute())
  }

  unSoloTracks( all, muted ){
    const notMuted = all.filter(track => !muted.includes(track))
    const tracksToUnmute = notMuted.filter(track => track.isMute())
    tracksToUnmute.map(track => track.toggleMute())
  }
}

export default Mixer