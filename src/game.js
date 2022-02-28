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
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
    startMenu() {
        this.currentScreen = new StartMenu(this);
    }
    

    startGame() {
        this.currentScreen = new Stage(this) 
    }

    startDashTimeOut() {
        this.dashTimeOut = setTimeout( () => {this.dashWindow = null}, 2000)
    }

    setKeyDown(command) {
        if (command === 'left' || command === 'right') {
            if(this.dashWindow && this.dashWindow.direction === command) {
                if(this.dashWindow.numUp > 0) this.dashWindow.numDown++;
            } else {
                this.dashWindow = {numDown: 1,numUp: 0, direction: command}
                this.startDashTimeOut();
            }
        }
        this.controller[`${command}`] = true;
    }

    setKeyUp(command) {
        if (command === 'left' || command === 'right'){
            if(this.dashWindow && this.dashWindow.direction === command) {
                this.dashWindow.numUp++
                if(this.dashWindow.numDown >= 2 && this.dashWindow.numUp >= 2){
                    if(this.currentScreen.constructor === Stage) {
                        this.currentScreen.player.dash(`${command}`)
                        this.dashTimeOut = null;
                    }
                }
            }
        }
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
            this.currentScreen.checkKilledEnemies();
            this.currentScreen.checkKilledPlayer();
            this.currentScreen.enemies.forEach( enemy => enemy.determineNextAction())
        }
        requestAnimationFrame(this.update.bind(this))
    }

}
