export class Timer {
    constructor(ctx, dimensions) {
        this.ctx = ctx;
        this.dimensions = dimensions;
        this.time = 0;
        this.counter = this.startTimer();
    }

    startTimer() {
        let interval = setInterval( () => this.time += 1 , 1000)
    }

    draw() {
        this.ctx.font = '40px Sans-serif';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 8;
        this.ctx.fillStyle = 'yellow';
        this.ctx.strokeText('TIME', this.dimensions.width/2 - 10, 40)
        this.ctx.fillText('TIME', this.dimensions.width / 2 - 10, 40);
        this.ctx.font = '60px Sans-serif';
        this.ctx.strokeText(this.time,this.dimensions.width / 2 - 10 , 100);
        this.ctx.fillText(this.time, this.dimensions.width / 2 - 10, 100);
    }

}