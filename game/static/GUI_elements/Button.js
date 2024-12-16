import GameObject from "../GameObject.js"

export default class ButtonGameObject extends GameObject {
    constructor(posx, posy, widthButton, heightButton,eventString ,eventObject, scene, text) {
        super(scene)
        this.posx = posx
        this.posy = posy
        this.widhtButton = widthButton
        this.heightButton = heightButton

        this.eventObject = eventObject
        this.eventString = eventString

        this.canvas = this.scene.canvas
        this.ctx = this.scene.canvas.getContext("2d")
        this.scene.eventBus.registerListner("click_on_canvas", this)
        this.scene.eventBus.registerListner("textInputFinished",this)
        this.is_hovered = false
        this.text = text
        this.textSize = 60
        this.textColor = "black"
        this.ButtonPrimaryColor = "green"
        this.ButtonScondaryColor = "yellow"
        this.eventObject = eventObject
        this.textOfTextField = ""

    }
    process() {
        if (this.scene.mousex >  this.posx && this.scene.mousex < this.posx + this.widhtButton && 
            this.scene.mousey >  this.posy && this.scene.mousey < this.posy + this.heightButton){
            this.is_hovered = true
            
        } 
        else{
            this.is_hovered = false
        }


    }

    render() {
        this.ctx.fillStyle = this.ButtonPrimaryColor;
        if (this.is_hovered == true){
            this.ctx.fillStyle = this.ButtonScondaryColor
        }
        this.ctx.fillRect(this.posx,this.posy,this.widhtButton,this.heightButton)

        this.ctx.fillStyle = this.textColor;
        this.ctx.strokeStyle = this.textColor;
        this.ctx.font = this.textSize;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        this.ctx.fillText(this.text, this.posx+(this.widhtButton / 2), this.posy+(this.heightButton / 2));
        //this.ctx.strokeText(text, this.posx+(this.widhtButton / 2), this.posy+(this.heightButton / 2));
    }

    buttonPresed(eventObject){
        //this.scene.eventBus.triggerEvent("test",null)
        if (this.eventString == "switchScene"){
            this.scene.eventBus.triggerEvent("switchScene",eventObject)
            console.log(eventObject.sceneToSwitch)
        }
        if (this.eventString == "loginToServer"){
            if (self.textOfTextField != ""){
                this.scene.eventBus.triggerEvent("switchScene",eventObject)
                this.scene.websocketGameObjectClient.loginToServer(this.textOfTextField)
            }
            else{
                this.scene.websocketGameObjectClient.loginToServer("TESTSERVER")
            }
            
        }
        if (this.eventString == "loginToServerHost"){
            if (self.textOfTextField != ""){
                this.scene.websocketGameObjectClient.loginToServerHost(this.textOfTextField)
            }
            else{
                this.scene.websocketGameObjectClient.loginToServerHost("TESTSERVER")
            }
        }
        if(this.eventString == "generateItem"){
            this.scene.websocketGameObjectClient.generateItem(eventObject)
        }
    }

    event(eventString, eventObject){
        if (eventString == "click_on_canvas" && this.is_hovered == true) {
            this.buttonPresed(this.eventObject)
        }
        if (eventString == "textInputFinished"){
            this.textOfTextField = eventObject.storedText
        }
        
            
    }

    setTextSize(size){
        this.textSize = size
    }

    setTextColor(color){
        this.textColor = color
    }

    setButtonColorPrimary(color){
        this.ButtonPrimaryColor = color
    }

    setButtonColorSecondary(color){
        this.ButtonScondaryColor = color
    }

}
