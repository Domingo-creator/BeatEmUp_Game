import { CharacterModels } from "./characterModels";
import { LifeBar } from "./lifebar";

export class Character {
    constructor(game, startPos, model, startingDirection = 'left', size ={ height: 110, width: 40}, items = [], powerups = []) {
        this.game = game;
        this.model = model;
        this.currentAnimation = 'Idle'
        this.size = size;
        this.lifebar = new LifeBar(this.game.ctx, this.game.dimensions, this);
        this.position = startPos;
        this.stunned = false;
        this.currentAction = null;
        this.hitbox = []
        this.directionFaced = startingDirection;
        this.framesDrawn = 0;
        this.currentFrame = 0;
        this.xVel = 0;
        this.yVel = 0;
    }

    /// probably unnecessary. i think all its doing is checking for a combo attack. maybe just rename something else
    resetCurrentFrame() {
        let data = CharacterModels[`${this.model}`][`${this.currentAnimation}`]
        if(!this.comboWindowOpen || this.currentFrame === 0) {
            this.currentFrame = this.directionFaced === 'right' ? 0 : data.max_frames - 1;
        }
    }

    setCurrentAnimation() {
        if(this.currentAction) {
            this.currentAnimation = this.currentAction;
        } else {
          if(this.xVel === 0 && this.yVel === 0) {
              this.currentAnimation = 'Idle'
          } else {
              this.currentAnimation = 'Run'
          }
        }
    }

    drawCharacter() {
    //TODO make a better character animation
    this.setCurrentAnimation();
        let spriteSheet = new Image();
        let data = CharacterModels[`${this.model}`][`${this.currentAnimation}`]
        // if(this.currentAnimation === 'hit')console.log('way before', this.currentFrame)
        this.currentFrame = this.currentFrame % data.frames;
        spriteSheet.onload = () => {
                let spriteWidth = (spriteSheet.width)/ data.max_frames
                let spriteHeight = spriteSheet.height / data.num_rows;
                let srcX;
                if(this.directionFaced === 'left') {
                    srcX = this.currentFrame * spriteWidth + ((data.max_frames - data.frames) * spriteWidth) + data[`${this.directionFaced}_offset`]
                } else {
                    srcX = this.currentFrame * spriteWidth  + data[`${this.directionFaced}_offset`]
                }
                let srcY = (spriteHeight * data.row) / data.top_offset_multiplier
                let scaleFactor = 3;
                this.game.ctx.drawImage(spriteSheet, srcX, srcY, spriteWidth, spriteHeight, this.position[0] + data[`${this.directionFaced}_pos_offset`], this.position[1], spriteWidth * scaleFactor, spriteHeight * scaleFactor)
                // this.game.ctx.fillStyle = 'yellow'
                // this.game.ctx.fillRect(this.position[0], this.position[1], 40, 110)
                // this.game.ctx.fillRect(this.position[0] + spriteWidth,this.position[1] + spriteSheet.height, 15, 70)
        };
        if (this.model === 'knight') {
            spriteSheet.src = `./images/${this.model}/${this.currentAnimation}_${this.directionFaced}.png`;
        } else {
            spriteSheet.src = `./images/${this.model}/${this.model}_${this.directionFaced}.png`;
        }
        //only update frame ever 10 draws
        this.framesDrawn++
        if(this.framesDrawn >= 10) {
            // if current action is death, stop animating at last frame
            if ( this.currentAction === 'death' || this.currentAction === 'hit'){
                if(this.directionFaced === 'right') {
                    if( this.currentFrame !== data.frames - 1)
                    this.currentFrame++;
                } else {
                    if( this.currentFrame !== data.max_frames - data.frames) {
                        this.currentFrame--;
                        // if(this.model === 'skeleton' && this.currentAction === 'hit')console.log(this.currentFrame)
                    }
                }
            } else {
                this.directionFaced === 'right' ? this.currentFrame++: this.currentFrame--;
                //reset current frame to end if left-case brings it below 0
                if(this.currentFrame < 0) {
                    this.currentFrame = data.frames - 1;
                }
            }
         
            this.framesDrawn = 0;
        }
    
    }

    move() {
        console.log('fell to super class move')
    }
    
    takeDamage(amount) {
        if(this.currentAnimation !== 'death' && !this.iFrames) {
            this.getHitSound();
            this.lifebar.reduceHealth(amount)
            this.stunned = true;
            this.currentFrame = 0;
            this.resetCurrentFrame();
            this.currentAction = 'hit'
            setTimeout( () => {
                if(this.currentAction !== 'death') {
                this.currentAction = null;
                }
            }, 500)
            setTimeout( () => this.stunned = false, 800)
            if(this.model === 'knight') {
                this.iFrames = true;
                setTimeout( () => this.iFrames = false, 1500)
                this.game.currentScreen.startFlashScreen();
            }
        }
    }

    death() {
        this.getDeathSound();
        this.currentFrame = 0;
        this.resetCurrentFrame();
        this.stunned = true;
        this.currentAction = 'death';
    }
  
    performLightAttack(){
        // console.log('attacking')
        if (this.directionFaced === 'right')
            this.hitbox = [this.position[0],this.position[1]+this.size.height,this.position[0]+185, this.position[1]]
        else {
            this.hitbox = [this.position[0] - 175,this.position[1]+this.size.height,this.position[0], this.position[1]]
        }
        this.currentAction = 'lAttack';
        this.comboWindowOpen = true;
        setTimeout( () => {
            this.comboWindowOpen = false;
            this.hitbox = []
            this.currentAction = null;
        },500)
    }

    performHeavyAttack() {

    }

    performThrow(){

    }
  
    calculateHurtBox() {
        return  [this.position[0],this.position[1]+this.size.height, this.position[0] + this.size.width, this.position[1]]
    }


    ///////// FIX THIS TO NOT TAKE ARGUMENTS
    checkXInbounds(xPos) {
        if (xPos < this.game.currentScreen.dimensions.width - 20 && xPos > 0 ){
            return true;
        } else { 
            return false
        }
    }

    checkYInbounds(yPos) {
        if(yPos > this.game.currentScreen.floorHeight - 50 &&
            yPos < this.game.currentScreen.dimensions.height - 80) {
            return true
        } else {
            return false;
        }
    }
}