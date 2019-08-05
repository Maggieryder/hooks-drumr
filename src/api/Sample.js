// export default class Sample {
//   constructor(ctx, buffer, panner, output, reverb, delay){
//     this.context = ctx;
//     this.buffer = buffer;
//     this.panner = panner;
//     this.reverb = reverb;
//     this.delay = delay;
//     this.output = output;
//   }
//   init(){
//     this.source = this.context.createBufferSource();
//     this.source.buffer = this.buffer;
//     this.source.connect(this.panner);
//     this.panner.connect(this.reverb);
//     this.panner.connect(this.delay);
//     this.panner.connect(this.output);
//   }

//   trigger(time){
//     // console.log('GOT TRIGGER!!', time)
//     this.init();
//     this.source.start(time);
//   }
// }

const Sample = (ctx, buffer) => {
  const source = ctx.createBufferSource()
  source.buffer = buffer
  return source
}
const PannerNode = (context) => {
  const pannerNode = context.createPanner()
  pannerNode.panningModel = 'equalpower';
  pannerNode.distanceModel = 'linear';
  pannerNode.rolloffFactor = 0;
  pannerNode.coneOuterAngle = 0;
  pannerNode.positionX.value = -6; // hack to force first time refresh
    /*this.panner.refDistance = 1;
    this.panner.maxDistance = 10000;
    this.panner.rolloffFactor = 0;
    this.panner.coneInnerAngle = 360;
    this.panner.coneOuterAngle = 0;
    this.panner.coneOuterGain = 0;*/
  return pannerNode
}

const connectGain = (context, input, output) => {
  const node = context.createGain()
  input.connect(node)
  node.connect(output)
  return output
}

const trigger = (sample, time) => {
  sample.start(time)
}

export { Sample, PannerNode, connectGain, trigger }