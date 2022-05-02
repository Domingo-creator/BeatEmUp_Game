// import { Character } from "./character";
import { GameInstructions } from "./gameInstruction";
import { Options } from "./options";
// import { PlayerCharacter } from "./playerCharacter";
import { Stage } from "./stage";
import { StartMenu } from "./start_menu";
// import {Howl, Howler} from 'howler';


export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dimensions = {width: canvas.width, height: canvas.height}
        this.options = new Options();
        this.enableMuteButton();
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
    
    startInstructions(backgroundMusic) {
        this.currentScreen = new GameInstructions(this, backgroundMusic)
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

    enableMuteButton() {
        let muteButton = document.getElementById('mute-button');
        muteButton.hidden = false;
        let muteButtonImage = document.getElementById('mute-image')
        muteButton.addEventListener( 'click', () => {
            if(this.options.sound === 'on') {
                this.options.sound = 'off'
                muteButtonImage.src = './images/mainPage/mute.png'
                this.currentScreen.muteMusic();
            } else {
                this.options.sound = 'on'
                muteButtonImage.src = './images/mainPage/unmute.png'
                this.currentScreen.unMuteMusic();
            }
            muteButton.blur();
        })
    }

    update() {
        this.currentScreen.draw(this.ctx)
        this.checkInputs()
        if (this.currentScreen.constructor === Stage) {
            this.currentScreen.checkAttacksLanded();
            this.currentScreen.checkKilledEnemies();
            this.currentScreen.checkKilledPlayer();
            this.currentScreen.addNewEnemies();
            this.currentScreen.enemies.forEach( enemy => enemy.determineNextAction())
        }
        requestAnimationFrame(this.update.bind(this))
    }

}
