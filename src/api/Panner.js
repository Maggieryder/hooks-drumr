const PannerNode = (context) => {

    const xPos = Math.floor(window.innerWidth/2)
    const yPos = Math.floor(window.innerHeight/2)
    const zPos = 300;

    const panner = context.createPanner()
    // panner.panningModel = 'equalpower';
    // panner.distanceModel = 'linear';
    // panner.rolloffFactor = 0;
    // panner.coneOuterAngle = 0;
    // panner.setPosition(0, 0, 1);
    //panner.setPosition(pan, 0, 1 - Math.abs(pan))
    // panner.positionX.value = -6; // hack to force first time refresh
      /*this.panner.refDistance = 1;
      this.panner.maxDistance = 10000;
      this.panner.rolloffFactor = 0;
      this.panner.coneInnerAngle = 360;
      this.panner.coneOuterAngle = 0;
      this.panner.coneOuterGain = 0;*/
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'linear';
      panner.refDistance = 1;
      panner.maxDistance = 10000;
      panner.rolloffFactor = 1;
      panner.coneInnerAngle = 360;
      panner.coneOuterAngle = 0;
      panner.coneOuterGain = 0;
      
      if(panner.orientationX) {
        panner.orientationX.value = 1;
        panner.orientationY.value = 0;
        panner.orientationZ.value = 0;
      } else {
        panner.setOrientation(1,0,0);
      }
      
      const listener = context.listener;
      
      if(listener.forwardX) {
        listener.forwardX.value = 0;
        listener.forwardY.value = 0;
        listener.forwardZ.value = -1;
        listener.upX.value = 0;
        listener.upY.value = 1;
        listener.upZ.value = 0;
      } else {
        listener.setOrientation(0,0,-1,0,1,0);
      }
    // this seems to fuck it all up!
    //   if(listener.positionX) {
    //     // other browsers
    //     listener.positionX.setValueAtTime(xPos, context.currentTime);
    //     listener.positionY.setValueAtTime(yPos, context.currentTime);
    //     listener.positionZ.setValueAtTime(zPos, context.currentTime);
    //     // listener.positionX.value = xPos;
    //     // listener.positionY.value = yPos;
    //     // listener.positionZ.value = zPos;
    //   } else {
            //safari hates this
    //     listener.setPosition(xPos,yPos,zPos);
    //   }


    return panner
  }

  export default PannerNode