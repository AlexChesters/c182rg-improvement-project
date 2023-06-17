'use strict'

class AC182RG extends BaseInstrument {
  constructor() {
    super()
    console.log('ac182rg')

    var titleFromSimvar = SimVar.GetSimVarValue('TITLE', 'string')
    this.aircraftIdentifier = titleFromSimvar.replace(/\s+/g, '_')
    this.shouldTrackPersistence = false
  }

  //load the gauge template - found in AC182RG.HTML
  get templateID() { return 'AC182RG' }

  // runs every frame
  Update() {
    super.Update()
    this.persistState()
  }

  persistState() {
    if (!this.shouldTrackPersistence) return

    console.log('persisting state')

    try {
      var leftTankVolume = SimVar.GetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons')
      var rightTankVolume = SimVar.GetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons')
      
      console.log('left volume', leftTankVolume)
      console.log('right volume', rightTankVolume)
      
      SetStoredData('AC182RG_LEFT_FUEL_TANK_'+ this.aircraftIdentifier, leftTankVolume.toString())
      SetStoredData('AC182RG_RIGHT_FUEL_TANK_'+ this.aircraftIdentifier, rightTankVolume.toString())
    } catch (ex) {
      console.error('error persisting state', ex)
    }
  }

  applyState() {
    var leftTankStoredVolume = GetStoredData('AC182RG_LEFT_FUEL_TANK_'+ this.aircraftIdentifier)
    var rightTankStoredVolume = GetStoredData('AC182RG_RIGHT_FUEL_TANK_'+ this.aircraftIdentifier)

    console.log('applying left volume', leftTankStoredVolume)
    console.log('applying right volume', rightTankStoredVolume)
    
    SimVar.SetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons', Number(leftTankStoredVolume || 10))
    SimVar.SetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons', Number(rightTankStoredVolume || 10))
  }
  
  // 0 = main menu
  // 1 = loading
  // 2 = briefing
  // 3 = in game
  onGameStateChanged(oldState, newState) {
    super.onGameStateChanged()
    
    console.log('onGameStateChanged', oldState, newState)
    if (!oldState && newState === 3) {
      this.applyState()
      this.shouldTrackPersistence = true
    }
  }

}

registerInstrument('ac182rg-element', AC182RG)