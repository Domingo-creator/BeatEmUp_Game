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
        this.controller = {
            up: false,
            down:false,
            left:false,
            right:false,
            lAttack:false,
            hAttack:false,
            jump:false,
            throw:false
        }
    }
    startMenu() {
        this.currentScreen = new StartMenu(this);
    }
    

    startGame() {
        this.currentScreen = new Stage(this) 
    }

    setKeyDown(command) {
        this.controller[`${command}`] = true;
    }

    setKeyUp(command) {
        this.controller[`${command}`] = false
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
            case 'jump':
            case 'throw':
                 this.currentScreen.performAction(command)
                 break;
        }
        this.update()
    }
    
    update() {
        this.currentScreen.draw(this.ctx)
        if (this.currentScreen.constructor === Stage) {
            this.currentScreen.checkAttacksLanded();
            this.currentScreen.checkKilledEnemies()
        }
        requestAnimationFrame(this.update.bind(this))
    }
    

}
