import { Character } from "./character";

export class PlayerCharacter extends Character{
    constructor(game) {
        super(game, 100, [30, 450])
        this.blockGuage = 100;
        this.blockStatus = false;  //false if not blocking
        this.score = 0;
    }

    move(command) {
        switch(command) {
            case 'up':
                if(this.checkInbounds([this.position[0], this.position[1] - 10])){
                    this.position[1] -= 10
                }
                break;
            case 'down':
                if(this.checkInbounds([this.position[0], this.position[1] + 10])){
                    this.position[1] += 10
                }
                break;
            case 'left':
                if(this.checkInbounds([this.position[0] - 10, this.position[1]])){
                    this.position[0] -= 10
                }
                break;
            case 'right':
                if(this.checkInbounds([this.position[0] + 10, this.position[1]])){
                    this.position[0] += 10
                }
                break;
        }
        this.drawCharacter();
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

}