/// <reference types='@microsoft/msfs-types/pages/vcockpit/instruments/shared/baseinstrument.d.ts' />
/// <reference types='@microsoft/msfs-types/js/datastorage.d.ts' />
/// <reference types='@microsoft/msfs-types/pages/vcockpit/core/vcockpit' />
/// <reference types='@microsoft/msfs-types/JS/SimVar' />
/// <reference types='@microsoft/msfs-types/js/common' />

import logger from './utils/logger'

type AC182RGPersistentStorageIds = {
  fuel: {
    leftTankVolume: string,
    rightTankVolume: string
  },
  switchPanel: {
    masterBattery: string,
    alternator: string,
    avionics: string,
    pitotHeat: string
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
        masterBattery: `AC182RG_MASTER_BATTERY_${this.aircraftIdentifier}`,
        alternator: `AC182RG_ALTERNATOR_${this.aircraftIdentifier}`,
        avionics: `AC182RG_AVIONICS_${this.aircraftIdentifier}`,
        pitotHeat: `AC182RG_PITOT_${this.aircraftIdentifier}`
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

    logger.debug('persisting left tank volume', leftTankVolume)
    logger.debug('persisting right tank volume', rightTankVolume)
    
    SetStoredData(this.storageIds.fuel.leftTankVolume, leftTankVolume.toString())
    SetStoredData(this.storageIds.fuel.rightTankVolume, rightTankVolume.toString())
  }
  
  persistSwitchPanelState() {
    var masterBattery = SimVar.GetSimVarValue('ELECTRICAL MASTER BATTERY:1', 'bool')
    var alternator = SimVar.GetSimVarValue('GENERAL ENG MASTER ALTERNATOR:1', 'bool')
    var avionics = SimVar.GetSimVarValue('AVIONICS MASTER SWITCH', 'bool')
    var pitotHeat = SimVar.GetSimVarValue('PITOT HEAT SWITCH', 'bool')
    
    logger.debug('persisting master battery', masterBattery)
    logger.debug('persisting alternator', alternator)
    logger.debug('persisting avionics', avionics)
    logger.debug('persisting pitot heat', pitotHeat)

    SetStoredData(this.storageIds.switchPanel.masterBattery, masterBattery.toString())
    SetStoredData(this.storageIds.switchPanel.alternator, alternator.toString())
    SetStoredData(this.storageIds.switchPanel.avionics, avionics.toString())
    SetStoredData(this.storageIds.switchPanel.pitotHeat, pitotHeat.toString())
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
    var alternator = GetStoredData(this.storageIds.switchPanel.alternator)
    var avionics = GetStoredData(this.storageIds.switchPanel.avionics)
    var pitotHeat = GetStoredData(this.storageIds.switchPanel.pitotHeat)

    logger.log('applying master battery state', masterBattery)
    logger.log('applying alternator state', alternator)
    logger.log('applying avionics state', avionics)
    logger.log('applying pitot heat state', pitotHeat)

    SimVar.SetSimVarValue('ELECTRICAL MASTER BATTERY:1', 'number', Number(masterBattery))
    if (Number(alternator)) {
      SimVar.SetSimVarValue('K:ALTERNATOR_ON', 'number', 1)
    }
    if (Number(avionics)) {
      SimVar.SetSimVarValue('K:AVIONICS_MASTER_1_ON', 'number', 1)
    }
    if (Number(pitotHeat)) {
      SimVar.SetSimVarValue('K:PITOT_HEAT_ON', 'number', 1)
    }
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