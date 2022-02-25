export class LifeBar {
    constructor(ctx, dimensions) {
        this.ctx = ctx;
        this.dimensions = dimensions
        this.health = 100;
    }

    drawLifebar() {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(10, 10, this.dimensions.width/2, 30)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(10, 10, ((100-this.health)/100)*(this.dimensions.width/2), 30)
    }
}