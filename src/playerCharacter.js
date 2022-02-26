import { Character } from "./character";

export class PlayerCharacter extends Character{
    constructor(game) {
        super(game, [30, 450], 'left')
        this.blockGuage = 100;
        this.blockStatus = false;  //false if not blocking
        this.score = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.jumpVel = 0
        this.jumpHeight = 0;
        this.moveLockOut = false;
        this.moveSpeed = 5;
    }

    lockOutMove() {
        this.moveLockOut = true;
        setTimeout( () => this.moveLockOut = false, 50)
    }

    move() {
        //reduce velocity of everything not pressed
        if (this.currentAction !== 'jump') {
            if(!this.game.controller.up && this.yVel > 0) this.yVel -= this.moveSpeed
            if(!this.game.controller.down && this.yVel < 0) this.yVel += this.moveSpeed
            if(!this.game.controller.left && this.xVel > 0) this.xVel -= this.moveSpeed
            if(!this.game.controller.right && this.xVel < 0) this.xVel += this.moveSpeed
        
        //increase velocity of everything pressed
            if(!this.moveLockOut) {
                if(this.game.controller.up) {
                    if(!this.game.controller.down && this.yVel < 0) this.yVel = 0;
                    if(this.yVel > -20) this.yVel -= this.moveSpeed;
                }
                if(this.game.controller.down) {
                    if(!this.game.controller.up && this.yVel > 0) this.yVel = 0;
                    if(this.yVel < 20 ) this.yVel += this.moveSpeed;
                }
                if(this.game.controller.left) {
                    if(!this.game.controller.right && this.xvel > 0) this.xVel = 0;
                    if(this.xVel > -20) this.xVel -= this.moveSpeed;
                }
                if(this.game.controller.right) {
                    if(!this.game.controller.left && this.xVel < 0) this.xVel = 0;
                    if(this.xVel < 20) this.xVel += this.moveSpeed;
                }
            }
        } 
        this.updateNewPos();
        this.lockOutMove();
    }

    
    performAction(inputs) {
        if(!this.currentAction) {
            if (inputs.lAttack) {
                this.performLightAttack();
            } else if (inputs.hAttack) {
                this.performHeavyAttack();
            } else if (inputs.jump) {
                this.jump()
            } else if (inputs.throw) {
                this.performThrow();
            }
        }
    }
    

    updateNewPos() {
        if (this.checkXInbounds(this.position[0] + this.xVel)){
            this.position[0] += this.xVel;
        } 
        if(this.currentAction !== 'jump') {   
            if (this.checkYInbounds(this.position[1] + this.yVel)){
                this.position[1] += this.yVel;
            }          
        } else {
            //if before apex
            if(this.yVel < 0) {
                this.position[1] += this.yVel;
                this.jumpHeight -= this.yVel;
                this.yVel += 2.5;
            } else{
                if(this.jumpHeight - this.yVel < 0) {
                    this.position[1] += this.jumpHeight
                    this.jumpHeight = 0;
                    this.yVel = 0;
                    this.xVel = 0;
                } else{
                    this.position[1] += this.yVel;
                    this.jumpHeight -= this.yVel;
                    this.yVel += 2.5;
                }
            }
            if(this.yVel === 0 && this.jumpHeight === 0) this.currentAction = null;
        }
        if(this.xVel > 0) this.directionFaced = 'right';
        if(this.xVel < 0) this.directionFaced = 'left'
    }

    
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

    jump() {
        this.currentAction = 'jump'
        this.yVel -= 40;
        if(this.game.controller.left && !this.game.controller.right) {
            this.xVel = -10;
        }
        if(this.game.controller.right && !this.game.controller.left) {
            this.xVel = 10;
        }
    }

}