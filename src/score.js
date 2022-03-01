export class Score {
    constructor(ctx, timer) {
        this.timer = timer
        this.ctx = ctx;
        this.score = 0;
    }

    increaseScore(enemy) {
        let multiplier = 1 + Math.floor(this.timer.time / 20)
        this.score += enemy.scoreBase * multiplier
    }

    draw() {
        this.ctx.font = '20px Sans-serif';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 8;
        this.ctx.fillStyle = 'yellow';
        this.ctx.strokeText('SCORE', 50, 20)
        this.ctx.fillText('SCORE', 50, 20);
        this.ctx.font = '20px Sans-serif';
        this.ctx.strokeText(this.score, 150 , 20);
        this.ctx.fillText(this.score, 150, 20);
    }


}