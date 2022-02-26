import { LifeBar } from "./lifebar";

export class Character {
    constructor(game, startPos, lifebarSide, size ={ height: 50, width: 20}, items = [], powerups = []) {
        this.game = game;
        this.lifebar = new LifeBar(this.game.ctx, this.game.dimensions, lifebarSide);
        this.position = startPos;
        this.items = items;
        this.powerUps = powerups;
        this.stunned = false;
        this.size = size;
        this.currentAttack = null;
        this.hitbox = []
    }

    drawCharacter() {
        //TODO make a better character animation
        this.game.ctx.fillStyle = 'yellow'
        this.game.ctx.fillRect(this.position[0], this.position[1], 15, 70)
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
        this.hitbox = [this.position[0]-50,this.position[1]+this.size.height,this.position[0]+50, this.position[1]]
        this.currentAttack = 'lAttack';
        setTimeout( () => {
            console.log('attack ending')
            this.hitbox = []
            this.currentAttack = null;
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