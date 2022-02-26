import { Character } from "./character";

export class PlayerCharacter extends Character{
    constructor(game) {
        super(game, [30, 450], 'left')
        this.blockGuage = 100;
        this.blockStatus = false;  //false if not blocking
        this.score = 0;
        this.speed = 2;
        this.xVel = 0;
        this.yVel = 0;
        this.jumpHeight = 0;
    }

    move(command) {
        if (this.jumpHeight === 0) {
            switch(command) {
                case 'up':
                    for (let i = 0; i < this.speed; i++) {
                        if(this.checkInbounds([this.position[0], this.position[1] - 10])){
                            this.position[1] -= 10
                        }
                    }
                    break;
                case 'down':
                    for (let i = 0; i < this.speed; i++){
                        if(this.checkInbounds([this.position[0], this.position[1] + 10])){
                            this.position[1] += 10
                        }
                    }
                    break;
                case 'left':
                    for (let i = 0; i < this.speed; i++) {
                        if(this.checkInbounds([this.position[0] - 10, this.position[1]])){
                            this.position[0] -= 10
                        }
                    }
                    break;
                case 'right':
                    for (let i = 0; i < this.speed; i++) {
                        if(this.checkInbounds([this.position[0] + 10, this.position[1]])){
                            this.position[0] += 10
                        }
                    }
                    break;
            }
        }
    }

    performAction(command) {
        if(!this.currentAttack) {
            switch(command) {
                case 'lAttack':
                    this.performLightAttack();
                    break;
                case 'hAttack':
                    this.performHeavyAttack();
                    break;
                case 'jump':
                    this.jump();
                    break;
                case 'throw':
                    this.performThrow();
                    break;
            }
        }
    }


    checkInbounds(pos) {
        if (pos[0] < this.game.currentScreen.dimensions.width - 20 && 
            pos[0] > 0  &&
            pos[1] > this.game.currentScreen.floorHeight - 50 &&
            pos[1] < this.game.currentScreen.dimensions.height - 80
            ) {
            return true;
            }
        return false;
    }

    jump() {
        this.yVel = 50;
        // if(){}
    }

}