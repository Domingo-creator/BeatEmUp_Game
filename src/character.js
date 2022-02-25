import { LifeBar } from "./lifebar";

export class Character {
    constructor(game, health, startPos, items = [], powerups = []) {
        this.game = game;
        this.lifebar = new LifeBar(this.game.ctx, this.game.dimensions);
        this.position = startPos;
        this.items = items;
        this.powerUps = powerups;
        this.stunned = false;
        // this.hitBox = null;
        // this.hurtBox = calculateHurtBox();
    }

    drawCharacter() {
        //TODO make a better character animation
        this.game.ctx.fillStyle = 'yellow'
        this.game.ctx.fillRect(this.position[0], this.position[1], 15, 70)
    }

    move() {
        console.log('fell to super class move')
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

    lightAttack() {
        //start attack animation
        //extend hitbox/hurtbox for certain amount of time   
    }



    beginBlock() {
        //start block animation
        this.blockStatus = true;
    }



    endBlock() {
        //end block animation
        this.blockStatus = false;
    }

    calculateHitBox() {
    }

    calculateHurtBox() {
        
    }
}