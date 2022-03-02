import { CharacterModels } from "./characterModels";

export class GameInstructions {
    constructor(game) {
        this.game = game
        this.ctx = game.ctx;
        this.dimensions = game.dimensions;
        this.framesDrawn = 0;
        this.currentFrame = 0;
        this.currentStep = 0
        this.getNextStep();
    }

    draw(ctx){
        // console.log(this.currentFrame)
        if(this.currentStep >= 4) {
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
            this.ctx.fillStyle = 'red'
            this.ctx.font = '80px Sans-serif';
            this.ctx.fillText(`${this.currentInstruction}`, this.dimensions.width/2, this.dimensions.height/2)
        } else {
            this.currentFrame = this.currentFrame % this.currentData.max_frames
            let spriteSheet = new Image();
            spriteSheet.onload = () => {
                this.ctx.fillStyle = 'black'
                this.ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height)
                let spriteWidth = spriteSheet.width / this.currentData.max_frames;
                let spriteHeight = spriteSheet.height / this.currentData.num_rows
                let srcX = this.currentFrame * spriteWidth  + this.currentData.right_offset;
                let srcY = (spriteHeight * this.currentData.row) / this.currentData.top_offset_multiplier;
                let scaleFactor = 3
                this.ctx.drawImage(spriteSheet, srcX, srcY, spriteWidth, spriteHeight, this.dimensions.width/2.6, this.dimensions.height/2, spriteWidth * scaleFactor, spriteHeight * scaleFactor);
                this.ctx.fillStyle = 'red'
                this.ctx.font = '20px Sans-serif';
                let text
                switch(this.currentStep) {
                    case 1: 
                        text = 'Movement Controls: A: Left, S: down, D: right, W: up'
                        break;
                    case 2: 
                        text = 'Use the space bar to jump'
                        break;
                    case 3: 
                        text ='Attack with "J".  Slay the skeletons before they slay you!'
                        break;
                }
                this.ctx.fillText(`${text}`, this.dimensions.width/2, this.dimensions.height/1.2)

            }
            spriteSheet.src = `./images/knight/${this.currentInstruction}_right.png`

            this.framesDrawn++
            if(this.framesDrawn >= 10) {
                this.currentFrame++;
                this.framesDrawn = 0;
            }
        }
    }

    getNextStep(){
        this.currentStep++
        if(this.currentStep === 1) {
            this.currentInstruction = 'Run'
            this.currentData = CharacterModels.knight.Run
            setTimeout( () => this.getNextStep(), 6000)
        } else if(this.currentStep === 2) {
            this.currentInstruction = 'jump'
            this.currentData = CharacterModels.knight.jump
            setTimeout( () => this.getNextStep(), 3000)
        } else if(this.currentStep === 3) {
            this.currentInstruction = 'lAttack'
            this.currentData = CharacterModels.knight.lAttack
            setTimeout( () => this.getNextStep(), 7000)    
        } else if(this.currentStep === 4){
            this.currentInstruction = 'Get Ready...'
            setTimeout( () => this.getNextStep(), 3000)
        }else if(this.currentStep === 5) {
            this.currentInstruction = 'Start'
            setTimeout( () => this.game.startGame(), 1000)
        } 
    }


    move() {}//dummy funcion}
    
    performAction() {}//dummy function



}