export class LifeBar {
    constructor(ctx, dimensions, owner ) {
        this.ctx = ctx;
        this.dimensions = dimensions
        this.owner = owner
        this.health = 100;
    }

    reduceHealth(amount) {
        this.health -= amount;
        if(this.health < 0) this.health = 0;
    }

    increaseHealth(amount) {

    }

    // drawLifebar() {
    //     this.ctx.fillStyle = 'yellow';
    //     this.ctx.fillRect(this.getPosition(), 40, this.dimensions.width/2 - 120, 30)
    //     this.ctx.fillStyle = 'red'
    //     this.ctx.fillRect(this.getPosition(), 40, ((100-this.health)/100)*(this.dimensions.width/2 - 120), 30)
    //     this.ctx.fillStyle = 'black'
    //     this.ctx.font = '20px Arial';
    //     if(this.lifeBarSide === 'left') {
    //         this.ctx.fillText(`Player Health`, 80, 60);
    //     } else {
    //         this.ctx.fillText('Enemy Health', this.dimensions.width/1.6 + 80, 60)
    //     }
    // }
   

    drawLifebar() {
        if(this.owner.model === 'knight') {
            this.ctx.fillStyle = 'yellow';
            this.ctx.fillRect(10, 20, this.dimensions.width/2 - 120, 30)
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(10, 20, ((100-this.health)/100)*(this.dimensions.width/2 - 120), 30)
            this.ctx.font = '25px Sans-serif';
            this.ctx.fillStyle = 'black'
            this.ctx.lineWidth = 2;
            this.ctx.fillText(`Player Health`, 100, 42);
        } else {
            this.ctx.fillStyle = 'yellow';
            this.ctx.fillRect(this.owner.position[0] - 10, this.owner.position[1] - 20,  this.owner.size.width + 20, 5)
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.owner.position[0] - 10, this.owner.position[1] - 20, ((100-this.health)/100)*(this.owner.size.width + 20), 5)

        }
      
    } 

}