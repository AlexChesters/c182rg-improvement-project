class IngamePanelCustomPanel extends TemplateElement {
    constructor() {
        super(...arguments);

        this.panelActive = false;
        this.ingameUi = null;
    }
    connectedCallback() {
        super.connectedCallback();

        var self = this;
        this.ingameUi = this.querySelector('ingame-ui');

        this.headerEl = document.querySelector("#Header");
        this.footerEl = document.querySelector("#Footer");

        if (this.ingameUi) {
            this.ingameUi.addEventListener("panelActive", (e) => {
                console.log('panelActive');
                self.panelActive = true;
            });
            this.ingameUi.addEventListener("panelInactive", (e) => {
                console.log('panelInactive');
                self.panelActive = false;
            });
        }
    }
    initialize() {}
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    updateImage() {}
}
window.customElements.define("ingamepanel-custom", IngamePanelCustomPanel);
checkAutoload();