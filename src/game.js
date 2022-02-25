import { Character } from "./character";
import { Options } from "./options";
import { PlayerCharacter } from "./playerCharacter";
import { Stage } from "./stage";
import { StartMenu } from "./start_menu";

export class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height}
        this.options = new Options();
        this.startMenu();
    }
    startMenu() {
        this.currentScreen = new StartMenu(this);
    }
    

    startGame() {
        this.currentScreen = new Stage(this) 
    }

    receiveInput(command) {
        // console.log(command)
        switch(command) {
            case 'left':
            case 'right':
            case 'up':
            case 'down' :
                 this.currentScreen.move(command)
                 break;
            case 'lAttack':
            case 'hAttack':
            case 'block':
            case 'throw':
                 this.currentScreen.performAction(command)
                 break;
        }
        this.update()
    }
    
    update() {
        this.currentScreen.draw(this.ctx)
        requestAnimationFrame(this.update.bind(this))
    }
    

    animate() {

    }

    playLoop() {

    }
}
