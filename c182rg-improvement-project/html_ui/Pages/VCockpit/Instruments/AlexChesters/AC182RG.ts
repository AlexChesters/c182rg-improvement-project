/// <reference types="@microsoft/msfs-types/pages/vcockpit/instruments/shared/baseinstrument.d.ts" />
/// <reference types="@microsoft/msfs-types/js/datastorage.d.ts" />
/// <reference types="@microsoft/msfs-types/pages/vcockpit/core/vcockpit" />
/// <reference types="@microsoft/msfs-types/JS/SimVar" />
/// <reference types="@microsoft/msfs-types/js/common" />

import logger from './utils/logger'

type AC182RGPersistentStorageIds = {
  fuel: {
    leftTankVolume: string,
    rightTankVolume: string
  },
  switchPanel: {
    masterBattery: string
  }
}

class AC182RG extends BaseInstrument {
  aircraftIdentifier: string
  shouldTrackPersistence: boolean
  storageIds: AC182RGPersistentStorageIds

  constructor() {
    super()
    var titleFromSimvar = SimVar.GetSimVarValue('TITLE', 'string')
    this.aircraftIdentifier = titleFromSimvar.replace(/\s+/g, '_')
    this.shouldTrackPersistence = false

    logger.log('aircraft identifier is', this.aircraftIdentifier)

    this.storageIds = {
      fuel: {
        leftTankVolume: `AC182RG_LEFT_FUEL_TANK_${this.aircraftIdentifier}`,
        rightTankVolume: `AC182RG_RIGHT_FUEL_TANK_${this.aircraftIdentifier}`
      },
      switchPanel: {
        masterBattery: `AC182RG_MASTER_BATTERY_${this.aircraftIdentifier}`
      }
    }

    logger.log(JSON.stringify(this.storageIds))
  }

  //load the gauge template - found in AC182RG.HTML
  get templateID(): string { return 'AC182RG' }

  // runs every frame
  Update() {
    super.Update()
    this.persistState()
  }

  persistFuelState() {
    var leftTankVolume = SimVar.GetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons')
    var rightTankVolume = SimVar.GetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons')

    logger.log('persisting left tank volume state', leftTankVolume)
    logger.log('persisting right tank volume state', rightTankVolume)
    
    SetStoredData(this.storageIds.fuel.leftTankVolume, leftTankVolume.toString())
    SetStoredData(this.storageIds.fuel.rightTankVolume, rightTankVolume.toString())
  }

  persistSwitchPanelState() {
    var masterBattery = SimVar.GetSimVarValue('ELECTRICAL MASTER BATTERY:1', 'bool')

    logger.log('persisting master battery state', masterBattery)

    SetStoredData(this.storageIds.switchPanel.masterBattery, masterBattery.toString())
  }

  persistState() {
    if (!this.shouldTrackPersistence) return

    try {
      this.persistFuelState()
      this.persistSwitchPanelState()
    } catch (ex) {
      console.error('error persisting state', ex)
    }
  }

  applyFuelState() {
    var leftTankStoredVolume = GetStoredData(this.storageIds.fuel.leftTankVolume)
    var rightTankStoredVolume = GetStoredData(this.storageIds.fuel.rightTankVolume)
    
    logger.log('applying left tank volume state', leftTankStoredVolume)
    logger.log('applying right tank volume state', rightTankStoredVolume)
    
    SimVar.SetSimVarValue('FUEL TANK LEFT MAIN QUANTITY', 'gallons', Number(leftTankStoredVolume || 10))
    SimVar.SetSimVarValue('FUEL TANK RIGHT MAIN QUANTITY', 'gallons', Number(rightTankStoredVolume || 10))
  }

  applySwitchPanelState() {
    var masterBattery = GetStoredData(this.storageIds.switchPanel.masterBattery)

    logger.log('applying master battery state', masterBattery)

    SimVar.SetSimVarValue('ELECTRICAL MASTER BATTERY:1', 'number', Number(masterBattery))
  }

  applyState() {
    this.applyFuelState()
    this.applySwitchPanelState()
  }
  
  onGameStateChanged(oldState: GameState, newState: GameState) {
    super.onGameStateChanged(oldState, newState)

    if (newState === GameState.ingame) {
      logger.log('game has started, applying state')
      this.applyState()
      this.shouldTrackPersistence = true
    }
  }
}

registerInstrument('ac182rg-element', AC182RG)