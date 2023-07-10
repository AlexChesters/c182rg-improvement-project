/// <reference types='@microsoft/msfs-types/JS/SimVar' />

class IngamePanelCustomPanel extends TemplateElement {
    constructor() {
        super(...arguments)

        this.panelActive = false
        this.ingameUi = null
    }
    connectedCallback() {
        super.connectedCallback()

        var self = this
        this.ingameUi = this.querySelector('ingame-ui')

        if (this.ingameUi) {
            this.ingameUi.addEventListener("panelActive", (e) => {
                console.log('panelActive')
                self.panelActive = true
            })
            this.ingameUi.addEventListener("panelInactive", (e) => {
                console.log('panelInactive')
                self.panelActive = false
            })
        }

        this.applyDefaultValues()

        var stateSavingEl = document.getElementById('StateSavingStatus')
        stateSavingEl.addEventListener('change', (event) => {
            SimVar.SetSimVarValue('L:AC182RG_STATE_SAVING_ENABLED', 'number', Number(event.target.checked))
        })
    }
    initialize() {}
    disconnectedCallback() {
        super.disconnectedCallback()
    }
    updateImage() {}
    // MARK: custom stuff
    applyDefaultValues() {
        var stateSavingEl = document.getElementById('StateSavingStatus')
        var stateSavingFromLvar = 1
        try {
            stateSavingFromLvar = SimVar.GetSimVarValue('L:AC182RG_STATE_SAVING_ENABLED', 'number')
        } catch (_) {}
    }
}
window.customElements.define("ingamepanel-custom", IngamePanelCustomPanel)
checkAutoload()