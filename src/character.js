import { CharacterModels } from "./characterModels";
import { LifeBar } from "./lifebar";

export class Character {
    constructor(game, startPos, lifebarSide, model, startingDirection = 'left', size ={ height: 50, width: 20}, items = [], powerups = []) {
        this.game = game;
        this.model = model;
        this.currentAnimation = 'Idle'
        this.lifebar = new LifeBar(this.game.ctx, this.game.dimensions, lifebarSide);
        this.position = startPos;
        this.items = items
        this.powerUps = powerups;
        this.stunned = false;
        this.size = size;
        this.currentAction = null;
        this.hitbox = []
        this.directionFaced = startingDirection;
        this.framesDrawn = 0;
        this.currentFrame = 0;
        this.xVel = 0;
        this.yVel = 0;
    }

    resetCurrentFrame() {
        let numFrames = CharacterModels[`${this.model}`][`${this.currentAnimation}`].frames
        if(!this.comboWindowOpen || this.currentFrame === 0) {
            this.currentFrame = this.directionFaced === 'right' ? 0 : numFrames - 1;
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
        if(this.model) {  //this if statement gets removed later
            this.setCurrentAnimation();
            let spriteSheet = new Image();
            console.log(this.currentAnimation)
            let data = CharacterModels[`${this.model}`][`${this.currentAnimation}`]
            this.currentFrame = this.currentFrame % data.frames;

            spriteSheet.onload = () => {
                let spriteWidth = (spriteSheet.width)/ data.frames
                let srcX = this.currentFrame * spriteWidth + data[`${this.directionFaced}_offset`]
                let srcY = spriteSheet.height / 2
                let scaleFactor = 3;
                this.game.ctx.drawImage(spriteSheet, srcX, srcY, spriteWidth, spriteSheet.height, this.position[0] + data[`${this.directionFaced}_pos_offset`], this.position[1], spriteWidth * scaleFactor, spriteSheet.height * scaleFactor)
                // this.game.ctx.fillStyle = 'yellow'
                // this.game.ctx.fillRect(this.position[0], this.position[1], 15, 70)
                // this.game.ctx.fillRect(this.position[0] + spriteWidth,this.position[1] + spriteShee.height, 15, 70)
            };
            if (this.model === 'knight') {
                spriteSheet.src = `../images/${this.model}/_${this.currentAnimation}_${this.directionFaced}.png`;
            } else {
                spriteSheet.src = `../images/${this.model}/${this.model}.png`
            }
            //only update frame ever 10 draws
            this.framesDrawn++
            if(this.framesDrawn >= 10) {
                this.directionFaced === 'right' ? this.currentFrame++: this.currentFrame--;
                //reset current frame to end if left-case brings it below 0
                if(this.currentFrame < 0) {
                    console.log(data)
                    this.currentFrame = data.frames - 1;
                }
                console.log(this.currentFrame)
                this.framesDrawn = 0;
            }
        } else {
        this.game.ctx.fillStyle = 'yellow'
        this.game.ctx.fillRect(this.position[0], this.position[1], 15, 70)
        this.game.ctx.fillStyle = "blue"
        if (this.directionFaced === 'left'){
            this.game.ctx.fillRect(this.position[0], this.position[1] + 20, 5, 5)
        }else {
            this.game.ctx.fillRect(this.position[0]+ 15, this.position[1] + 20, -5, 5)
        }
        }
    }

    move() {
        console.log('fell to super class move')
    }
    
    takeDamage(amount) {
        this.lifebar.reduceHealth(amount)
        this.stunned = true;
        setTimeout( () => this.stunned = false, 500)
    }


    hasItem() {
        !!this.items.length
    }


    hasPowerUp() {
        !!this.powerUps;
    }


    pickUpItem(item) {
        if(this.hasItem()) this.dropItem()
        //start pick up animation
        this.items.push(item)
    }




    // drop last item from this.items return the dropped item
    dropItem() {
        //start drop animation
        return this.items.pop()
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
  
    toggleBlock(){
        this.blockStatus = this.blockStatus ? true :false
    }


    calculateHitBox() {
    }

    calculateHurtBox() {
        return  [this.position[0],this.position[1]+this.size.height, this.position[0] + this.size.width, this.position[1]]
    }
}