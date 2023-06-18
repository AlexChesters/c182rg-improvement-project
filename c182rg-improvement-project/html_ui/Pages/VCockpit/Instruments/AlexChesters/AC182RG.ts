/// <reference types="@microsoft/msfs-types/" />
/// <reference types="@microsoft/msfs-types/pages/vcockpit/instruments/shared/baseinstrument.d.ts" />
/// <reference types="@microsoft/msfs-types/js/datastorage.d.ts" />
/// <reference types="@microsoft/msfs-types/pages/vcockpit/core/vcockpit" />

// class AC182RG extends BaseInstrument {
//   aircraftIdentifier: string
//   shouldTrackPersistence: boolean

//   constructor() {
//     super()
//     var titleFromSimvar = SimVar.GetSimVarValue('TITLE', 'string')
//     this.aircraftIdentifier = titleFromSimvar.replace(/\s+/g, '_')
//     this.shouldTrackPersistence = false
//   }

//   //load the gauge template - found in AC182RG.HTML
//   get templateID(): string { return 'AC182RG' }

//   // runs every frame
//   Update() {
//     super.Update()
//     this.persistState()
//   }

//   persistState() {
//     if (!this.shouldTrackPersistence) return

//     try {
//       var leftTankVolume = SimVar.GetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons')
//       var rightTankVolume = SimVar.GetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons')
      
//       SetStoredData('AC182RG_LEFT_FUEL_TANK_'+ this.aircraftIdentifier, leftTankVolume.toString())
//       SetStoredData('AC182RG_RIGHT_FUEL_TANK_'+ this.aircraftIdentifier, rightTankVolume.toString())
//     } catch (ex) {
//       console.error('error persisting state', ex)
//     }
//   }

//   applyState() {
//     var leftTankStoredVolume = GetStoredData('AC182RG_LEFT_FUEL_TANK_'+ this.aircraftIdentifier)
//     var rightTankStoredVolume = GetStoredData('AC182RG_RIGHT_FUEL_TANK_'+ this.aircraftIdentifier)
    
//     SimVar.SetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons', Number(leftTankStoredVolume || 10))
//     SimVar.SetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons', Number(rightTankStoredVolume || 10))
//   }
  
//   // 0 = main menu
//   // 1 = loading
//   // 2 = briefing
//   // 3 = in game
//   onGameStateChanged(oldState: GameState, newState: GameState) {
//     super.onGameStateChanged(oldState, newState)

//     if (!oldState && newState === 3) {
//       this.applyState()
//       this.shouldTrackPersistence = true
//     }
//   }
// }

// registerInstrument('ac182rg-element', AC182RG)

class MyInstrument extends BaseInstrument {
  get templateID(): string {
    return 'MyInstrument';
  }
}

registerInstrument('my-instrument', MyInstrument);