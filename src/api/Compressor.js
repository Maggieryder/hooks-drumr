import Processor from './Processor'

class Compressor extends Processor {
  constructor(context, source, destination){
    super(context, destination)
    this._source = source
    this.init()
  }
  init(){
    this._compressor = this._context.createDynamicsCompressor()
    // set to defaults
    this.updateThreshold(-24);
    this.updateKnee(30);
    this.updateRatio(12);
    // readonly attribute: this.updateReduction(-20.0);
    this.updateAttack(0.003);
    this.updateRelease(.25); 
  }
  updateThreshold(val){
    console.log('updateThreshold', val);
    this._compressor.threshold.value = val;
  }
  updateKnee(val){
    console.log('updateKnee', val);
    this._compressor.knee.value = val;
  }
  updateRatio(val){
    console.log('updateRatio', val);
    this._compressor.ratio.value = val;
  }
  updateReduction(val){
    console.log('updateReduction', val);
    //if (typeof this.compressor.reduction === 'float') {
      this._compressor.reduction = val;
    // } else {
    //   this._compressor.reduction.value = val;
    // }
  }
  updateAttack(val){
    console.log('updateAttack', val);
    this._compressor.attack.value = val;
  }
  updateRelease(val){
    console.log('updateRelease', val);
    this._compressor.release.value = val;
  }
  connect(){
    this._source.disconnect(this._destination);
    this._source.connect(this._compressor);
    this._compressor.connect(this._destination);
  }
  disconnect(){
    this._source.disconnect(this._compressor);
    this._compressor.disconnect(this._destination);
    this._source.connect(this._destination);
  }
  node(){ return this._compressor }
}

export default Compressor