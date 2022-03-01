import { Stage } from "./stage";
import { StartMenu } from "./start_menu";

export class ContinueScreen {
    constructor(game) {
        this.game = game;
        this.ctx = this.game.ctx;
        this.dimensions = this.game.dimensions
        this.continueDelay = 100; //number of frames to delay the continue option
        this.optionSelected = 'Yes';
        this.score = this.game.currentScreen.score;
        this.score.timer.stopTimer();

    }

    draw() {
        this.ctx.globalAlpha = 0.5; // set global alpha
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
        this.ctx.globalAlpha = 1.0
        this.ctx.font = '100px Sans-serif';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 8;
        this.ctx.fillStyle = 'red';
        this.ctx.strokeText('Game Over', this.dimensions.width/ 2 , this.dimensions.height/2 - 100)
        this.ctx.fillText('Game Over', this.dimensions.width / 2 , this.dimensions.height/2 -100);
        this.ctx.fillStyle = 'yellow'
        this.ctx.font = '60px Sans-serif';
        this.ctx.strokeText('Continue?',this.dimensions.width / 2 , this.dimensions.height/2 + 100);
        this.ctx.fillText('Continue?', this.dimensions.width / 2 , this.dimensions.height/2 + 100); 
        this.ctx.font = '40px Sans-serif';
        this.ctx.fillStyle = this.optionSelected === 'Yes' ? 'yellow' : 'red'
        this.ctx.strokeText('Yes',this.dimensions.width / 2 -50 , this.dimensions.height - 60);
        this.ctx.fillText('Yes', this.dimensions.width/2 - 50, this.dimensions.height - 60)
        this.ctx.fillStyle = this.optionSelected === 'No' ? 'yellow' : 'red'
        this.ctx.strokeText('No',this.dimensions.width / 2 +50 , this.dimensions.height - 60);
        this.ctx.fillText('No', this.dimensions.width/2 + 50, this.dimensions.height - 60) 
    }

    move(command) {
        if (!this.moveLockout)
            if (command.left || command.right) {
                this.optionSelected = this.optionSelected === 'Yes' ? 'No' : 'Yes'
                this.playSound();
                this.moveLockout = true;
                setTimeout( () => this.moveLockout = false, 200)
            }

    }

    performAction(command) {
        if (command.lAttack) {
            if(this.optionSelected === 'Yes') {
                this.playSound();
                this.game.currentScreen = new Stage(this.game);
            } else {
                this.playSound();
                this.game.currentScreen.stopMusic();
                this.game.currentScreen = new StartMenu(this.game)
            }
        }
    }

    playSound() {
        if(this.game.options.sound === 'on') {
            var sound = new Howl({
                src: ['./sounds/menu_sounds/MENU_Pick.wav']
            });
            
            sound.play();
        }

    }
}