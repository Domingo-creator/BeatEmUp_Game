import { Character } from "./character";

export class cpuCharacter extends Character{
    constructor(game, startPos, enermyType = 'skeleton', scoreBase = 50) {
        super(game, startPos, enermyType, Math.floor(Math.random() * 2) === 1 ? 'left' : 'right')
        this.hitBoxRange = [150, 50]
        this.agressionRating = this.getAggressionRating() // a number between 0-100, indicating likelyhood that enemy attacks while in range
        this.ActionLockOut = false;
        this.scoreBase = scoreBase;
    }

    getAggressionRating() {
        switch(this.game.options.difficulty) {
            case 'easy':
                return 10;
            case 'medium':
                return 15;
            case 'hard':
                return 20;
        }
    }

    determineNextAction() {
        //simple logic AI.  Maybe make this easy mode later
        if(!this.stunned && !this.ActionLockOut)
            //if not in bounds
            if (!this.checkXInbounds(this.position[0])) {
                this.move( )
            }
            else {
                //move toards player or randomly attack
                this.isPlayerInRange() ? this.getRandomInRangeAction() : this.move()    
            }
    }

    facePlayer() {
        if(this.game.currentScreen.player.position[0] < this.position[0]) {
            this.directionFaced = 'left'
        } else {
            this.directionFaced = 'right';
        }

    }

    isPlayerInRange() {
        let playerPosition = this.game.currentScreen.player.position
        // console.log(this.position[0] - playerPosition[0] < this.hitBoxRange[0])
        if ((Math.abs(this.position[0] - playerPosition[0]) < this.hitBoxRange[0]) &&
            (Math.abs(this.position[1] - playerPosition[1]) < this.hitBoxRange[1]) &&
            this.game.currentScreen.player.currentAction !== 'jump') {
                return true;
        }
        return false;
    }

    getRandomInRangeAction() {
       if( Math.random() * 100 < this.agressionRating) this.performLightAttack()
    }

  

    move() {
        this.facePlayer();
        if(!this.checkXInbounds(this.position[0])) {
            this.xVel = this.directionFaced === 'left' ? -2 : 2; 
        } else {
            this.xVel = Math.floor(Math.random()) + 1
            this.yVel = Math.floor(Math.random() * 2)
            if(this.directionFaced === 'left') this.xVel = -this.xVel;
            if(this.position[1] > this.game.currentScreen.player.position[1] + this.game.currentScreen.player.jumpHeight) this.yVel = -this.yVel
        }
        this.updateCurrentPos();
    }

    updateCurrentPos() {
        this.position[0] += this.xVel;
        this.position[1] += this.yVel;
    }
    
    lockOutAction() {
        this.ActionLockOut = true;
        this.xVel = 0;
        this.yVel = 0;
        setTimeout( () => this.ActionLockOut = false, 500)
    }
   
    posture() {

    }

    getAttackTimeOut() {

    }

    performAction() {

    }

    getHitSound() {}

    getDeathSound() {}


}