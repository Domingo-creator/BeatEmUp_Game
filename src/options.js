export class Options {
    constructor() {
        this.controls = {
                            up: 'KeyW',
                            down: 'KeyS',
                            left: 'KeyA',
                            right: 'KeyD',
                            lAttack: 'KeyJ',
                            hAttack: 'KeyK',
                            throw: 'KeyL',
                            jump: 'Space'
                        };
        this.difficulty = 'easy';
        this.stage = 'random';
        this.sound = 'on'
    }
}