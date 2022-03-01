export class LifeBar {
    constructor(ctx, dimensions, lifeBarSide ) {
        this.ctx = ctx;
        this.dimensions = dimensions
        this.health = 100;
        this.lifeBarSide = lifeBarSide;
    }

    reduceHealth(amount) {
        this.health -= amount;
        if(this.health < 0) this.health = 0;
    }

    increaseHealth(amount) {

    }

    drawLifebar() {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(this.getPosition(), 10, this.dimensions.width/2 - 60, 30)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.getPosition(), 10, ((100-this.health)/100)*(this.dimensions.width/2 - 60), 30)
        this.ctx.fillStyle = 'black'
        this.ctx.font = '20px Arial';
        if(this.lifeBarSide === 'left') {
            this.ctx.fillText(`Player Health`, 80, 30);
        } else {
            this.ctx.fillText('Enemy Health', this.dimensions.width/1.6-10, 30)
        }
    }

    getPosition() {
        // console.log(this.lifeBarSide)
        return this.lifeBarSide === 'left' ?  10 : this.dimensions.width/1.85
    }
}