import { Character } from "./character";

export class cpuCharacter extends Character{
    constructor(game, startPos) {
        super(game, startPos, 'right')
    }
}