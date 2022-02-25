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
                            block: 'Space'
                        };
        this.difficulty = 'easy';
        this.stage = 'random'
    }
}