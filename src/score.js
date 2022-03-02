export class Score {
    constructor(ctx, dimensions, timer) {
        this.timer = timer
        this.dimensions = dimensions
        this.ctx = ctx;
        this.score = 0;
    }

    increaseScore(enemy) {
        let multiplier = 1 + Math.floor(this.timer.time / 20)
        this.score += enemy.scoreBase * multiplier
    }

    draw() {
        this.ctx.font = '40px Sans-serif';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 8;
        this.ctx.fillStyle = 'yellow';
        this.ctx.strokeText('SCORE', this.dimensions.width/1.4, 40)
        this.ctx.fillText('SCORE', this.dimensions.width/1.4, 40);
        this.ctx.font = '40px Sans-serif';
        this.ctx.strokeText(this.score, this.dimensions.width/1.1, 40);
        this.ctx.fillText(this.score, this.dimensions.width/1.1, 40);
    }


}