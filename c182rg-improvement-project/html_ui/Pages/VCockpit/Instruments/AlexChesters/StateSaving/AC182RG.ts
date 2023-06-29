/// <reference types='@microsoft/msfs-types/pages/vcockpit/instruments/shared/baseinstrument.d.ts' />
/// <reference types='@microsoft/msfs-types/js/datastorage.d.ts' />
/// <reference types='@microsoft/msfs-types/pages/vcockpit/core/vcockpit' />
/// <reference types='@microsoft/msfs-types/JS/SimVar' />
/// <reference types='@microsoft/msfs-types/js/common' />

import logger from '../utils/logger'

type AC182RGPersistentStorageIds = {
  fuel: {
    leftTankVolume: string,
    rightTankVolume: string
  },
  switchPanel: {
    masterBattery: string,
    alternator: string,
    avionics: string,
    pitotHeat: string,
    navLight: string,
    beaconLight: string,
    taxiLight: string,
    landingLight: string
  },
  instruments: {
    altimeter: string,
    headingBug: string,
    transponderMode: string,
    transponderCode: string
  },
  controlSurfaces: {
    rudderTrim: string,
    elevatorTrim: string,
    // flap handle index
    flaps: string,
    // actual flap positions
    flapsLeftPercent: string,
    flapsRightPercent: string
  },
  engines: {
    cowlFlaps: string
  },
  tablet: {
    tabletPage: string,
    staticElements: string,
    externalPower: string,
    towCar: string,
    pilotDoor: string,
    copilotDoor: string,
    baggageDoor: string
  },
  windows: {
    pilotWindow: string,
    copilotWindow: string
  }
}

class AC182RG extends BaseInstrument {
  aircraftIdentifier: string
  storageIds: AC182RGPersistentStorageIds

  constructor() {
    super()
    var titleFromSimvar = SimVar.GetSimVarValue('TITLE', 'string')
    this.aircraftIdentifier = titleFromSimvar.replace(/\s+/g, '_')

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
        pitotHeat: `AC182RG_PITOT_${this.aircraftIdentifier}`,
        navLight: `AC182RG_NAV_LIGHT_${this.aircraftIdentifier}`,
        beaconLight: `AC182RG_BEACON_LIGHT_${this.aircraftIdentifier}`,
        taxiLight: `AC182RG_TAXI_LIGHT_${this.aircraftIdentifier}`,
        landingLight: `AC182RG_LANDING_LIGHT_${this.aircraftIdentifier}`
      },
      instruments: {
        altimeter: `AC182RG_ALTIMETER_${this.aircraftIdentifier}`,
        headingBug: `AC182RG_HEADING_BUG_${this.aircraftIdentifier}`,
        transponderMode: `AC182RG_TRANSPONDER_MODE_${this.aircraftIdentifier}`,
        transponderCode: `AC182RG_TRANSPONDER_CODE_${this.aircraftIdentifier}`
      },
      controlSurfaces: {
        rudderTrim: `AC182RG_RUDDER_TRIM_${this.aircraftIdentifier}`,
        elevatorTrim: `AC182RG_ELEVATOR_TRIM_${this.aircraftIdentifier}`,
        flaps: `AC182RG_FLAPS_${this.aircraftIdentifier}`,
        flapsLeftPercent: `AC182RG_FLAPS_LEFT_PERCENT_${this.aircraftIdentifier}`,
        flapsRightPercent: `AC182RG_FLAPS_RIGHT_PERCENT_${this.aircraftIdentifier}`
      },
      engines: {
        cowlFlaps: `AC182RG_COWL_FLAP_${this.aircraftIdentifier}`
      },
      tablet: {
        tabletPage: `AC182RG_TABLET_PAGE_${this.aircraftIdentifier}`,
        staticElements: `AC182RG_STATIC_ELEMENTS_${this.aircraftIdentifier}`,
        externalPower: `AC182RG_EXTERNAL_POWER_${this.aircraftIdentifier}`,
        towCar: `AC128RG_TOW_CAR_${this.aircraftIdentifier}`,
        pilotDoor: `AC182RG_PILOT_DOOR_${this.aircraftIdentifier}`,
        copilotDoor: `AC182RG_COPILOT_DOOR_${this.aircraftIdentifier}`,
        baggageDoor: `AC182RG_BAGGAGE_DOOR_${this.aircraftIdentifier}`
      },
      windows: {
        pilotWindow: `AC182RG_PILOT_WINDOW_${this.aircraftIdentifier}`,
        copilotWindow: `AC182RG_COPILOT_WINDOW_${this.aircraftIdentifier}`
      }
    }

    logger.log(JSON.stringify(this.storageIds))
  }

  // returned string must match the gauge template ID in AC182RG.HTML
  get templateID() { return 'AC182RG' }

  Update() {
    super.Update()
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
    var navLight = SimVar.GetSimVarValue('LIGHT NAV', 'bool')
    var beaconLight = SimVar.GetSimVarValue('LIGHT BEACON', 'bool')
    var taxiLight = SimVar.GetSimVarValue('LIGHT TAXI', 'bool')
    var landingLight = SimVar.GetSimVarValue('LIGHT LANDING', 'bool')
    
    logger.debug('persisting master battery', masterBattery)
    logger.debug('persisting alternator', alternator)
    logger.debug('persisting avionics', avionics)
    logger.debug('persisting pitot heat', pitotHeat)
    logger.debug('persisting nav light', navLight)
    logger.debug('persisting beacon light', beaconLight)
    logger.debug('persisting taxi light', taxiLight)
    logger.debug('persisting landing light', landingLight)

    SetStoredData(this.storageIds.switchPanel.masterBattery, masterBattery.toString())
    SetStoredData(this.storageIds.switchPanel.alternator, alternator.toString())
    SetStoredData(this.storageIds.switchPanel.avionics, avionics.toString())
    SetStoredData(this.storageIds.switchPanel.pitotHeat, pitotHeat.toString())
    SetStoredData(this.storageIds.switchPanel.navLight, navLight.toString())
    SetStoredData(this.storageIds.switchPanel.beaconLight, beaconLight.toString())
    SetStoredData(this.storageIds.switchPanel.taxiLight, taxiLight.toString())
    SetStoredData(this.storageIds.switchPanel.landingLight, landingLight.toString())
  }

  persistInstrumentsState() {
    var altimeter = SimVar.GetSimVarValue('KOHLSMAN SETTING MB', 'millibars scaler 16')
    var heading = SimVar.GetSimVarValue('AUTOPILOT HEADING LOCK DIR', 'degrees')
    var transponderMode = SimVar.GetSimVarValue('TRANSPONDER STATE:1', 'Enum')
    var transponderCode = SimVar.GetSimVarValue('TRANSPONDER CODE:1', 'Bco16')
    var flaps = SimVar.GetSimVarValue('FLAPS HANDLE INDEX', 'number')
    var flapsLeftPercent = SimVar.GetSimVarValue('TRAILING EDGE FLAPS LEFT PERCENT', 'percent over 100')
    var flapsRightPercent = SimVar.GetSimVarValue('TRAILING EDGE FLAPS RIGHT PERCENT', 'percent over 100')

    logger.debug('persisting altimiter', altimeter)
    logger.debug('persisting heading', heading)
    logger.debug('persisting transponder mode', transponderMode)
    logger.debug('persisting transponder code', transponderCode)
    logger.debug('persisting flaps', flaps)
    logger.debug('persisting flaps left percent', flapsLeftPercent)
    logger.debug('persisting flaps right percent', flapsRightPercent)

    SetStoredData(this.storageIds.instruments.altimeter, altimeter.toString())
    SetStoredData(this.storageIds.instruments.headingBug, heading.toString())
    SetStoredData(this.storageIds.instruments.transponderMode, transponderMode.toString())
    SetStoredData(this.storageIds.instruments.transponderCode, transponderCode.toString())
    SetStoredData(this.storageIds.controlSurfaces.flaps, flaps.toString())
    SetStoredData(this.storageIds.controlSurfaces.flapsLeftPercent, flapsLeftPercent.toString())
    SetStoredData(this.storageIds.controlSurfaces.flapsRightPercent, flapsRightPercent.toString())
  }

  persistControlSurfaces() {
    var rudderTrim = SimVar.GetSimVarValue('RUDDER TRIM PCT', 'percent over 100')
    var elevatorTrim = SimVar.GetSimVarValue('ELEVATOR TRIM POSITION', 'radians')

    logger.debug('persisting rudder trim', rudderTrim)
    logger.debug('persisting elevator trim', elevatorTrim)

    SetStoredData(this.storageIds.controlSurfaces.rudderTrim, rudderTrim.toString())
    SetStoredData(this.storageIds.controlSurfaces.elevatorTrim, elevatorTrim.toString())
  }

  persistEngines() {
    var cowlFlaps = SimVar.GetSimVarValue('RECIP ENG COWL FLAP POSITION:1', 'percent')

    logger.debug('persisting cowl flaps', cowlFlaps)

    SetStoredData(this.storageIds.engines.cowlFlaps, cowlFlaps.toString())
  }

  persistTablet() {
    var tabletPage = SimVar.GetSimVarValue('L:TABLET_PAG', 'number')
    var staticElements = SimVar.GetSimVarValue('L:TABLET_BTN_STATIC_ELEMENT', 'bool')
    var externalPower = SimVar.GetSimVarValue('L:TABLET_BTN_EXT_PWR', 'bool')
    var towCar = SimVar.GetSimVarValue('L:TABLET_BTN_TOW_CAR', 'bool')
    var pilotDoor = SimVar.GetSimVarValue('EXIT OPEN:0', 'percent over 100')
    var copilotDoor = SimVar.GetSimVarValue('EXIT OPEN:1', 'percent over 100')
    var baggageDoor = SimVar.GetSimVarValue('EXIT OPEN:4', 'percent over 100')

    logger.debug('persisting tablet page', tabletPage)
    logger.debug('persisting static elements', staticElements)
    logger.debug('persisting external power', externalPower)
    logger.debug('persisting tow car', towCar)
    logger.debug('persisting pilot door', pilotDoor)
    logger.debug('persisting copilot door', copilotDoor)
    logger.debug('persisting baggage door', baggageDoor)

    SetStoredData(this.storageIds.tablet.tabletPage, tabletPage.toString())
    SetStoredData(this.storageIds.tablet.staticElements, staticElements.toString())
    SetStoredData(this.storageIds.tablet.externalPower, externalPower.toString())
    SetStoredData(this.storageIds.tablet.towCar, towCar.toString())
    SetStoredData(this.storageIds.tablet.pilotDoor, pilotDoor.toString())
    SetStoredData(this.storageIds.tablet.copilotDoor, copilotDoor.toString())
    SetStoredData(this.storageIds.tablet.baggageDoor, baggageDoor.toString())
  }

  persistWindows() {
    var pilotWindow = SimVar.GetSimVarValue('EXIT OPEN:2', 'percent over 100')
    var copilotWindow = SimVar.GetSimVarValue('EXIT OPEN:3', 'percent over 100')

    logger.debug('persisting pilot window', pilotWindow)
    logger.debug('persisting copilot window', copilotWindow)

    SetStoredData(this.storageIds.windows.pilotWindow, pilotWindow.toString())
    SetStoredData(this.storageIds.windows.copilotWindow, copilotWindow.toString())
  }

  persistState() {
    try {
      this.persistFuelState()
      this.persistSwitchPanelState()
      this.persistInstrumentsState()
      this.persistControlSurfaces()
      this.persistEngines()
      this.persistTablet()
      this.persistWindows()
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
    var navLight = GetStoredData(this.storageIds.switchPanel.navLight)
    var beaconLight = GetStoredData(this.storageIds.switchPanel.beaconLight)
    var taxiLight = GetStoredData(this.storageIds.switchPanel.taxiLight)
    var landingLight = GetStoredData(this.storageIds.switchPanel.landingLight)

    logger.log('applying master battery state', masterBattery)
    logger.log('applying alternator state', alternator)
    logger.log('applying avionics state', avionics)
    logger.log('applying pitot heat state', pitotHeat)
    logger.log('applying nav light state', navLight)
    logger.log('applying beacon light state', beaconLight)
    logger.log('applying taxi light state', taxiLight)
    logger.log('applying landing light state', landingLight)

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
    if (Number(navLight)) {
      SimVar.SetSimVarValue('K:NAV_LIGHTS_ON', 'number', 1)
    }
    if (Number(beaconLight)) {
      SimVar.SetSimVarValue('K:BEACON_LIGHTS_ON', 'number', 1)
    }
    if (Number(taxiLight)) {
      SimVar.SetSimVarValue('K:TAXI_LIGHTS_ON', 'number', 1)
    }
    if (Number(landingLight)) {
      SimVar.SetSimVarValue('K:LANDING_LIGHTS_ON', 'number', 1)
    }
  }

  applyInstrumentState() {
    var altimeter = GetStoredData(this.storageIds.instruments.altimeter)
    var heading = GetStoredData(this.storageIds.instruments.headingBug)
    var transponderMode = GetStoredData(this.storageIds.instruments.transponderMode)
    var transponderCode = GetStoredData(this.storageIds.instruments.transponderCode)

    logger.log('applying altimeter state', altimeter)
    logger.log('applying heading state', heading)
    logger.log('applying transponder mode state', transponderMode)
    logger.log('applying transponder code state', transponderCode)

    SimVar.SetSimVarValue('K:KOHLSMAN_SET', 'millibars scaler 16', Number(altimeter))
    SimVar.SetSimVarValue('AUTOPILOT HEADING LOCK DIR', 'degrees', Number(heading))
    SimVar.SetSimVarValue('TRANSPONDER STATE:1', 'Enum', Number(transponderMode || 0))
    SimVar.SetSimVarValue('TRANSPONDER CODE:1', 'Bco16', Number(transponderCode || 7000))
  }

  applyControlSurfacesState() {
    var rudderTrim = GetStoredData(this.storageIds.controlSurfaces.rudderTrim)
    var elevatorTrim = GetStoredData(this.storageIds.controlSurfaces.elevatorTrim)
    var flaps = GetStoredData(this.storageIds.controlSurfaces.flaps)
    var flapsLeftPercent = GetStoredData(this.storageIds.controlSurfaces.flapsLeftPercent)
    var flapsRightPercent = GetStoredData(this.storageIds.controlSurfaces.flapsRightPercent)

    logger.log('applying rudder trim state', rudderTrim)
    logger.log('applying elevator trim state', elevatorTrim)
    logger.log('applying flaps state', flaps)
    logger.log('applying flaps left percent state', flapsLeftPercent)
    logger.log('applying flaps right percent state', flapsRightPercent)

    SimVar.SetSimVarValue('RUDDER TRIM PCT', 'percent over 100', Number(rudderTrim))
    SimVar.SetSimVarValue('ELEVATOR TRIM POSITION', 'radians', Number(elevatorTrim))
    SimVar.SetSimVarValue('FLAPS HANDLE INDEX', 'number', Number(flaps))
    SimVar.SetSimVarValue('TRAILING EDGE FLAPS LEFT PERCENT', 'percent over 100', Number(flapsLeftPercent))
    SimVar.SetSimVarValue('TRAILING EDGE FLAPS RIGHT PERCENT', 'percent over 100', Number(flapsRightPercent))
  }

  applyEngines() {
    var cowlFlaps = GetStoredData(this.storageIds.engines.cowlFlaps)

    logger.log('applying cowl flaps state', cowlFlaps)

    SimVar.SetSimVarValue('RECIP ENG COWL FLAP POSITION:1', 'percent', Number(cowlFlaps))
  }

  applyTablet() {
    var tabletPage = GetStoredData(this.storageIds.tablet.tabletPage)
    var staticElements = GetStoredData(this.storageIds.tablet.staticElements)
    var externalPower = GetStoredData(this.storageIds.tablet.externalPower)
    var towCar = GetStoredData(this.storageIds.tablet.towCar)
    var pilotDoor = GetStoredData(this.storageIds.tablet.pilotDoor)
    var copilotDoor = GetStoredData(this.storageIds.tablet.copilotDoor)
    var baggageDoor = GetStoredData(this.storageIds.tablet.baggageDoor)

    logger.log('applying tablet page state', tabletPage)
    logger.log('applying static elements state', staticElements)
    logger.log('applying external power state', externalPower)
    logger.log('applying tow car state', towCar)
    logger.log('applying pilot door state', pilotDoor)
    logger.log('applying copilot door state', copilotDoor)
    logger.log('applying baggage door state', baggageDoor)

    SimVar.SetSimVarValue('L:TABLET_PAG', 'number', Number(tabletPage))
    SimVar.SetSimVarValue('L:TABLET_BTN_STATIC_ELEMENT', 'bool', Number(staticElements))
    SimVar.SetSimVarValue('L:TABLET_BTN_EXT_PWR', 'bool', Number(externalPower))
    SimVar.SetSimVarValue('L:TABLET_BTN_TOW_CAR', 'bool', Number(towCar))
    SimVar.SetSimVarValue('EXIT OPEN:0', 'percent over 100', Number(pilotDoor))
    SimVar.SetSimVarValue('L:TABLET_BTN_PILOT_DOOR', 'bool', Number(pilotDoor))
    var currentPilotDoorState = SimVar.GetSimVarValue('EXIT OPEN:0', 'percent over 100')
    if (Number(currentPilotDoorState) !== Number(pilotDoor)) {
      SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', 'number', 1)
    }
    SimVar.SetSimVarValue('EXIT OPEN:1', 'percent over 100', Number(copilotDoor))
    SimVar.SetSimVarValue('L:TABLET_BTN_COPILOT_DOOR', 'bool', Number(copilotDoor))
    var currentCopilotDoorState = SimVar.GetSimVarValue('EXIT OPEN:1', 'percent over 100')
    if (Number(currentCopilotDoorState) !== Number(copilotDoor)) {
      SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', 'number', 2)
    }
    SimVar.SetSimVarValue('EXIT OPEN:4', 'percent over 100', Number(baggageDoor))
    SimVar.SetSimVarValue('L:TABLET_BTN_BAGAGE_DOOR', 'bool', Number(baggageDoor))
    var currentBaggageDoorState = SimVar.GetSimVarValue('EXIT OPEN:4', 'percent over 100')
    if (Number(currentBaggageDoorState) !== Number(baggageDoor)) {
      SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', 'number', 5)
    }
  }
  
  applyWindows() {
    var pilotWindow = GetStoredData(this.storageIds.windows.pilotWindow)
    var copilotWindow = GetStoredData(this.storageIds.windows.copilotWindow)
    
    logger.log('applying pilot window state', pilotWindow)
    logger.log('applying copilot window state', copilotWindow)
    
    SimVar.SetSimVarValue('EXIT OPEN:2', 'percent over 100', Number(pilotWindow))
    var currentPilotWindowState = SimVar.GetSimVarValue('EXIT OPEN:2', 'percent over 100')
    if (Number(currentPilotWindowState) !== Number(pilotWindow)) {
      SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', 'number', 3)
    }
    SimVar.SetSimVarValue('EXIT OPEN:3', 'percent over 100', Number(copilotWindow))
    var currentCopilotWindowState = SimVar.GetSimVarValue('EXIT OPEN:3', 'percent over 100')
    if (Number(currentCopilotWindowState) !== Number(copilotWindow)) {
      SimVar.SetSimVarValue('K:TOGGLE_AIRCRAFT_EXIT_FAST', 'number', 4)
    }
  }

  applyState() {
    try {
      this.applyFuelState()
      this.applySwitchPanelState()
      this.applyInstrumentState()
      this.applyControlSurfacesState()
      this.applyEngines()
      this.applyTablet()
      this.applyWindows()
    } catch (ex) {
      console.error('error applying state', ex)
    }

    setInterval(() => {
      this.persistState()
    }, 10000)
  }
  
  onGameStateChanged(oldState: GameState, newState: GameState) {
    super.onGameStateChanged(oldState, newState)

    if (newState === GameState.ingame) {
      logger.log('game has started, applying saved state')
      this.applyState()
    }
  }
}

registerInstrument('ac182rg-element', AC182RG)