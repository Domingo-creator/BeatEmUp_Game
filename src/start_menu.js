import { MenuOption } from "./menu_option";

export class StartMenu {
    constructor(game) {
        this.game = game;
        this.dimensions = game.dimensions;
        this.ctx = game.ctx;
        this.createMainMenuOptions();
    }

    move(command) {
        switch(command) {
            case 'up': 
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.selectedIdx--;
                if (this.selectedIdx < 0) this.selectedIdx = this.menuOptions.length-1;
                this.menuOptions[this.selectedIdx].toggleHighlight();
                break;
            case 'down':
                this.menuOptions[this.selectedIdx].toggleHighlight();
                this.selectedIdx++;
                if (this.selectedIdx === this.menuOptions.length) this.selectedIdx = 0;
                this.menuOptions[this.selectedIdx].toggleHighlight();
                break;
        }
    }

    performAction(command) {
        // console.log(command)
        switch(command) {
            case 'lAttack':
                this.menuOptions[this.selectedIdx].selectedAction();
                break;
            // case 'hAttack':

        }
    }

    createMainMenuOptions() {
        const startOption = new MenuOption('Start', [this.dimensions.width/2, this.dimensions.height/2], this.game.startGame.bind(this.game), true)
        const optionsOption = new MenuOption('Options', [this.dimensions.width/2, this.dimensions.height/1.6], this.createOptionsMenuOptions.bind(this))
        this.menuOptions = [startOption, optionsOption];
        this.selectedIdx = 0;
        this.headline = 'Beat-Em-Up';
        this.draw(this.ctx);
    }

    createOptionsMenuOptions() {
        const soundOption = new MenuOption('Sound', [this.dimensions.width/2, this.dimensions.height/2], this.adjustSound, true)
        const difficultyOption = new MenuOption('Difficulty', [this.dimensions.width/2, this.dimensions.height/1.6], this.adjustDifficulty)
        const controlsOption = new MenuOption('Change Controls', [this.dimensions.width/2, this.dimensions.height/1.4], this.createControlsMenuOptions.bind(this))
        const backOption = new MenuOption('Back', [this.dimensions.width/2, this.dimensions.height/1.2], this.createMainMenuOptions.bind(this))
        this.menuOptions = [soundOption, difficultyOption, controlsOption, backOption];
        this.selectedIdx = 0;
        this.headline = 'Options';
        this.draw(this.ctx, 'Options');
    }

    createControlsMenuOptions() {
        // TODO:  Make ACTION to change store adjusted controls somehow, then action to actually change controls
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
          
        this.selectedIdx = 0;
        this.headline = 'Controls';
        this.draw(this.ctx, 'Controls')
    }   

    // createDifficultyMenuOptions() {
    //     this.menuOptions = [
    //         new MenuOption('Sound', [this.dimensions.width/2, this.dimensions.height/2], this.adjustSound, true)
    //          new MenuOption('Difficulty', [this.dimensions.width/2, this.dimensions.height/1.6], this.adjustDifficulty)
    //     const
    //     const controlsOption = new MenuOption('Back', [this.dimensions.width/2, this.dimensions.height/1.4], this.createOptionsMenuOptions.bind(this)

    //     ]
    // }

    draw(ctx, headline) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
        ctx.font = '50px Comic Sans MS';
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`${this.headline}`, this.dimensions.width/2, this.dimensions.height/5);
        // console.log(this)
        this.menuOptions.forEach( option => option.draw(ctx))
    }

    adjustControls() {

    }

    adjustDifficulty() {

    }

    adjustSound() {

    }
}