import { Character } from "./character";

export class cpuCharacter extends Character{
    constructor(game, startPos, enermyType = 'skeleton') {
        super(game, startPos, 'right'/*, enermyType*/)
    }
}