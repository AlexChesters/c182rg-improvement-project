'use strict';

class SRC182RG extends BaseInstrument {
  constructor() {
    super();
    console.log('src182rg')
  }

  // runs every frame
  Update() {
    super.Update()
  }

  onFlightStart() {
    console.log('onFlightStart');
    super.onFlightStart();
    SimVar.SetSimVarValue("FUEL TANK LEFT MAIN QUANTITY", "gallons", Number(80));
  }

  //load the gauge template - found in SRC182RG.HTML
  get templateID() { return 'SRC182RG'; }
}

registerInstrument('src182rg-element', SRC182RG)