class Processor {
  constructor(context, destination){
    this._context = context
    this._destination = destination
    this._isOn = false;
  }
  init(){
    
  }
  connect(){

  }
  disconnect() {

  }
  toggleOn(isOn) {
    console.log('[Processor] toggleOn', isOn)
    if (!isOn && this.isConnected()){
      this.disconnect()
    } else if (isOn && !this.isConnected()){
      this.connect()
    }
    this._isOn = isOn
  }
  isConnected(){ return this._isOn}
  destroy(){
    console.log('this.isConnected()', this.isConnected())
    if (this.isConnected()) {
      this.disconnect()
    }
  }
}

export default Processor