import { Howl } from "howler";
import { MenuOption } from "./menu_option";

export class StartMenu {
    constructor(game) {
        this.game = game;
        this.dimensions = game.dimensions;
        this.ctx = game.ctx;
        this.createMainMenuOptions();
        this.menuReady = false;
        setTimeout( () => this.menuReady = true, 1000)
        this.lightningReady = true;
    }

    move(inputs) {
        if(this.menuReady) {
            if (inputs.up) {
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.selectedIdx--;
                if (this.selectedIdx < 0) this.selectedIdx = this.menuOptions.length-1;
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.lockoutMenu()
            }
            if (inputs.down) {
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.selectedIdx++;
                if (this.selectedIdx === this.menuOptions.length) this.selectedIdx = 0;
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.lockoutMenu()

            }
            if (inputs.left) {

            }
            if (inputs.right){

            }
        }

    }

    performAction(inputs) {
        if(this.menuReady) {
            if(inputs.lAttack) {
                this.menuOptions[this.selectedIdx].selectedAction();
                this.menuReady = false;
                this.lockoutMenu()
                
            }
            // case 'hAttack':
        }
    }

    playMenuMoveSound() {
        if(this.game.options.sound === 'on') {
            var sound = new Howl({
                src: ['./sounds/menu_sounds/MENU_Pick.wav']
            });
            
            sound.play();
        }

    }

    

    lockoutMenu() {
        this.menuReady = false;
        this.playMenuMoveSound();
        setTimeout( () => this.menuReady = true, 200)
    }

    createMainMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Beat-Em-Up';
        this.selectedIdx = 0;
        const startOption = new MenuOption('Start', [this.dimensions.width/2, this.dimensions.height/2], this.game.startGame.bind(this.game), true)
        const optionsOption = new MenuOption('Options', [this.dimensions.width/2, this.dimensions.height/1.6], this.createOptionsMenuOptions.bind(this))
        this.menuOptions = [startOption, optionsOption];
    }

    createOptionsMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Options';
        this.selectedIdx = 0;
        const soundOption = new MenuOption('Sound', [this.dimensions.width/2, this.dimensions.height/1.85], this.createSoundMenuOptions.bind(this), true)
        const difficultyOption = new MenuOption('Difficulty', [this.dimensions.width/2, this.dimensions.height/1.6], this.createDifficultyMenuOptions.bind(this))
        const controlsOption = new MenuOption('Change Controls', [this.dimensions.width/2, this.dimensions.height/1.4], this.createControlsMenuOptions.bind(this))
        const backOption = new MenuOption('Back', [this.dimensions.width/2, this.dimensions.height/1.2], this.createMainMenuOptions.bind(this))
        this.menuOptions = [soundOption, difficultyOption, controlsOption, backOption];
    }

    createControlsMenuOptions() {
        // TODO:  Make ACTION to change store adjusted controls somehow, then action to actually change controls
        this.lockoutMenu();
        this.headline = 'Controls';
        this.selectedIdx = 0;
        this.menuOptions =  [    
         new MenuOption(`Reset Default`,[this.dimensions.width/2, this.dimensions.height/3], this.updateControls, true),
         new MenuOption(`Up: ${this.game.options.controls['up']}`,[this.dimensions.width/2, this.dimensions.height/2.5], this.updateControls),   
         new MenuOption(`Down: ${this.game.options.controls['down']}`,[this.dimensions.width/2, this.dimensions.height/2.2], this.updateControls),   
         new MenuOption(`Left: ${this.game.options.controls['left']}`,[this.dimensions.width/2, this.dimensions.height/1.95], this.updateControls),
         new MenuOption(`Right: ${this.game.options.controls['right']}`,[this.dimensions.width/2, this.dimensions.height/1.75], this.updateControls),
         new MenuOption(`Light Attack: ${this.game.options.controls['lAttack']}`,[this.dimensions.width/2, this.dimensions.height/1.59], this.updateControls),
         new MenuOption(`Heavy Attack: ${this.game.options.controls['hAttack']}`,[this.dimensions.width/2, this.dimensions.height/1.46], this.updateControls),        
         new MenuOption(`Block: ${this.game.options.controls['block']}`,[this.dimensions.width/2, this.dimensions.height/1.35], this.updateControls),
         new MenuOption(`Throw/Pick Up Item: ${this.game.options.controls['throw']}`,[this.dimensions.width/2, this.dimensions.height/1.26], this.updateControls), 
         new MenuOption(`Confirm Changes`,[this.dimensions.width/2, this.dimensions.height/1.10], this.updateControls),
         new MenuOption(`Back`,[this.dimensions.width/2, this.dimensions.height/1.04], this.createOptionsMenuOptions.bind(this)) ]
          
    }   

    createDifficultyMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Difficulty';
        this.menuOptions = [
            new MenuOption('Easy', [this.dimensions.width/2, this.dimensions.height/1.85], () => this.adjustDifficulty('easy'), this.game.options.difficulty === 'easy' ? true : false),
            new MenuOption('Medium', [this.dimensions.width/2, this.dimensions.height/1.6], () => this.adjustDifficulty('medium'), this.game.options.difficulty === 'medium' ? true : false),
            new MenuOption('Hard', [this.dimensions.width/2, this.dimensions.height/1.4], () => this.adjustDifficulty('hard'), this.game.options.difficulty === 'hard' ? true : false)
        ]
        this.menuOptions.forEach( (option, i) => {
            if(option.selectedStatus) this.selectedIdx = i;
        })
    }

    createSoundMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Sound';
        this.menuOptions = [
            new MenuOption('On', [this.dimensions.width/2, this.dimensions.height/1.85], () => this.adjustSound('on'), this.game.options.sound === 'on' ? true : false),
            new MenuOption('Off', [this.dimensions.width/2, this.dimensions.height/1.6], () => this.adjustSound('off'), this.game.options.sound === 'off' ? true : false),
        ]
        this.menuOptions.forEach( (option, i) => {
            if(option.selectedStatus) this.selectedIdx = i;
        })
        // this.draw(this.ctx)
    }

    draw(ctx) {
        // ctx.fillStyle = "rgb(59, 102, 242)";
        // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);
        };
        img.src = './images/gameBackgrounds/titleMenuBackground.jpg';
        //draw lightning
        if(this.lightningReady) {

        }

        ctx.font = '50px Comic Sans MS';
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`${this.headline}`, this.dimensions.width/2, this.dimensions.height/5);
        // console.log(this)
        this.menuOptions.forEach( option => option.draw(ctx))
    }

    adjustControls() {

    }

    adjustDifficulty(difficulty) {
        this.game.options.difficulty = difficulty
        this.createOptionsMenuOptions();
    }

    adjustSound(soundStatus) {
        this.game.options.sound = soundStatus;
        this.createOptionsMenuOptions()
    }

    startLightningTimeout() {
        //get time between 1 and 5
        setTimeout( () => this.lightningReady = true, Math.random() * 5);
    }
}