import { PlayerCharacter } from "./playerCharacter";

export class Stage {
    constructor(game) {
        this.game = game;
        this.dimensions = game.dimensions;
        this.floorHeight = game.dimensions.height/2.2
        this.ctx = game.ctx;
        //list of stages.  eventually probably want to replace with images
        //list properties: sky-color, ground-color
        this.stageList = [
            {groundColor: 'brown', skyColor: 'skyblue'}    
        ]
        this.player = new PlayerCharacter(game)        
        this.pickStage()
    }

    pickStage() {
        let stageNum;
        if (this.game.options.stage === 'random') {
            stageNum = Math.floor(Math.random()  * this.stageList.length)
        } else {
            stageNum = 0 // TODO CHANGE THIS 
            /// take stage number/name
        }
        this.stage = this.stageList[stageNum]
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = `${this.stage['skyColor']}`;
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
        this.ctx.fillStyle = `${this.stage['groundColor']}`
        this.ctx.fillRect(0, this.floorHeight, this.dimensions.width, this.dimensions.height)
        this.player.drawCharacter();
        this.player.lifebar.drawLifebar();
    }

    move(command) {
        this.player.move(command);
    }
 }