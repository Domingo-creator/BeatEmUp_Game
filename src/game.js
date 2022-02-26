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
        this.update();
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

    checkInputs() {
        let moveInputs = {left: this.controller.left, 
                          up: this.controller.up, 
                          right: this.controller.right,
                          down: this.controller.down}
        let actionInputs = {lAttack: this.controller.lAttack,
                            hAttack: this.controller.hAttack, 
                            jump: this.controller.jump,
                            throw: this.controller.throw}

        this.currentScreen.move(moveInputs)
        this.currentScreen.performAction(actionInputs)
    }

    update() {
        this.currentScreen.draw(this.ctx)
        this.checkInputs()
        if (this.currentScreen.constructor === Stage) {
            this.currentScreen.checkAttacksLanded();
            this.currentScreen.checkKilledEnemies()
        }
        requestAnimationFrame(this.update.bind(this))
    }

}
