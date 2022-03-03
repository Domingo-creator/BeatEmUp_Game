import { Howl } from "howler";
import { BackgroundModels } from "./characterModels";
import { MenuOption } from "./menu_option";



export class StartMenu {
    constructor(game) {
        this.game = game;
        this.dimensions = game.dimensions;
        this.ctx = game.ctx;
        this.createMainMenuOptions()
        this.menuReady = false;
        setTimeout( () => this.menuReady = true, 4000)
        this.lightningReady = true;
        this.framesDrawn = 0;
        this.currentFrame = 0;
        this.startMusic()
    }

    move(inputs) {
        if(this.menuReady) {
            if (inputs.up) {
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.selectedIdx--;
                if (this.selectedIdx < 0) this.selectedIdx = this.menuOptions.length-1;
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.lockoutMenu()
            }if (inputs.down) {
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
            this.sound = new Howl({
                src: ['./sounds/menu_sounds/MENU_Pick.wav']
            });
            this.sound.volume(this.game.options.volume.SFX * .1)  
            this.sound.play();
        }

    }

    

    lockoutMenu() {
        if(this.menuReady) {
            this.playMenuMoveSound(); 
            this.menuReady = false;
            setTimeout( () => this.menuReady = true, 200)
        } else {
            setTimeout( () => this.menuReady = true, 4000)
        }
    }

    createMainMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Skeletal Swarm';
        this.selectedIdx = 0;
        const startOption = new MenuOption('Start', [this.dimensions.width/2, this.dimensions.height/2], this.startGame.bind(this), true)
        const optionsOption = new MenuOption('Options', [this.dimensions.width/2, this.dimensions.height/1.6], this.createOptionsMenuOptions.bind(this))
        this.menuOptions = [startOption, optionsOption];
    }

    createOptionsMenuOptions() {
        this.lockoutMenu();
        this.headline = 'Options';
        this.selectedIdx = 0;
        const soundOption = new MenuOption('Sound', [this.dimensions.width/2, this.dimensions.height/1.85], this.createSoundMenuOptions.bind(this), true)
        const difficultyOption = new MenuOption('Difficulty', [this.dimensions.width/2, this.dimensions.height/1.6], this.createDifficultyMenuOptions.bind(this))
        //const controlsOption = new MenuOption('Change Controls', [this.dimensions.width/2, this.dimensions.height/1.4], this.createControlsMenuOptions.bind(this))
        const backOption = new MenuOption('Back', [this.dimensions.width/2, this.dimensions.height/1.2], this.createMainMenuOptions.bind(this))
        this.menuOptions = [soundOption, difficultyOption, /*controlsOption,*/ backOption];
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
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);
        };
        img.src = './images/gameBackgrounds/titleMenubackground.jpg'; 
        //draw Controls
        var wasd = new Image();
        wasd.onload = () => {
            this.ctx.drawImage(wasd, this.dimensions.width /1.38, this.dimensions.height / 1.11, 80, 60)
        }
        wasd.src = './images/controls/wasd.png'
        var jKey = new Image();
        jKey.onload = () => {
            this.ctx.drawImage(jKey, this.dimensions.width /1.05, this.dimensions.height / 1.06, 30, 30)
        }
        jKey.src = './images/controls/J_Key.png'

        this.ctx.fillStyle = 'White'
        this.ctx.font = '22px Sans-serif';
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 1
        this.ctx.fillText('Movement:', this.dimensions.width /1.55, this.dimensions.height / 1.02);
        this.ctx.fillText('Select:', this.dimensions.width /1.115, this.dimensions.height / 1.02);
        this.ctx.strokeText('Movement:', this.dimensions.width /1.55, this.dimensions.height / 1.02);
        this.ctx.strokeText('Select:', this.dimensions.width /1.115, this.dimensions.height / 1.02);


        //draw lightning
        if(this.lightningReady) {
            const data = BackgroundModels.lightning[this.getRandomType()]
            const spriteSheet = new Image();
            spriteSheet.onload = () => {
                let spriteHeight = spriteSheet.height / data.num_rows;
                let spriteWidth = spriteSheet.width / data.max_frames;
                let srcX = spriteWidth * this.currentFrame;
                let srcY = spriteHeight * data.row
                let scaleFactor = 3

                if(!this.currentLightningPos) this.currentLightningPos = this.getrandomLightningPos()
                this.ctx.drawImage(spriteSheet, srcX, srcY, spriteWidth, spriteHeight, this.currentLightningPos, 0, spriteWidth * scaleFactor, spriteHeight * scaleFactor)
                this.framesDrawn++
                if( this.framesDrawn === 4){
                    this.currentFrame++
                    if(this.currentFrame > data.max_frames) {
                        this.lightningReady = false
                        this.currentLightningPos = null;
                        this.startLightningTimeout();
                    }
                    this.framesDrawn = 0;
                }
            }
            spriteSheet.src = './images/lightning/lightning.png'; 
        }
        this.ctx.textAlign = "center";
        if(this.headline === 'Skeletal Swarm') {
            let title = new Image();
            title.onload = () => {
                this.ctx.drawImage(title, -5, this.dimensions.height/5, title.width * .9, title.height * .9)
            }
            title.src = './images/gameBackgrounds/gameLogo.png'

        } else {
            this.ctx.font = '80px Sans-serif';
            this.ctx.fillStyle = "White";
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 8;
            this.ctx.strokeText(`${this.headline}`, this.dimensions.width/2, this.dimensions.height/5);
            this.ctx.fillText(`${this.headline}`, this.dimensions.width/2, this.dimensions.height/5);
        }
        this.menuOptions.forEach( option => option.draw(ctx))
    }

    startGame() {
        this.game.startInstructions(this.backgroundMusic);
    }

    adjustControls() {

    }

    adjustDifficulty(difficulty) {
        this.game.options.difficulty = difficulty
        this.createOptionsMenuOptions();
    }

    adjustSound(soundStatus) {
        this.game.options.sound = soundStatus;
        let muteButtonImage = document.getElementById('mute-image')
        if(soundStatus === 'off') {
             this.muteMusic();
             muteButtonImage.src =  './images/mainPage/mute.png'
        } else {
            this.unMuteMusic();
            muteButtonImage.src = './images/mainPage/unmute.png'
        }
        this.createOptionsMenuOptions()
    }

    startLightningTimeout() {
        //get time between 1 and 5
        setTimeout( () => {
            this.lightningReady = true;
            this.currentFrame = 0;
        }, Math.random() * 3000);
    }

    getRandomType() {
        return Math.floor(Math.random() * 2) === 0 ? 'typeA' : 'typeB'
    }

    getrandomLightningPos() {
        return Math.floor(Math.random() * this.dimensions.width)
    }


    startMusic() {
        this.backgroundMusic = new Howl({
            src: ['./sounds/Searching.ogg'],
            loop: true
        });
        this.backgroundMusic.volume(this.game.options.volume.BGM * .1)  
        this.backgroundMusic.play();
        if(this.game.options.sound === 'off') this.backgroundMusic.mute(true)
    }

    stopMusic() {
        this.backgroundMusic.stop();
    }

    muteMusic() {
        this.backgroundMusic.mute(true)
    }

    unMuteMusic() {
        this.backgroundMusic.mute(false)
    }

 
}