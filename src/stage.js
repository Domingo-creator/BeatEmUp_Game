import { cpuCharacter } from "./cpuCharacter";
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
        this.enemies = [];
        this.lastEnemyHit = null;        
        this.player = new PlayerCharacter(game);
        this.generateEnemy();
        this.generateEnemy()
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
    }

    draw() {
        this.ctx.fillStyle = `${this.stage['skyColor']}`;
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
        this.ctx.fillStyle = `${this.stage['groundColor']}`
        this.ctx.fillRect(0, this.floorHeight, this.dimensions.width, this.dimensions.height)
        this.player.drawCharacter();
        this.player.lifebar.drawLifebar();
        this.enemies.forEach( enemy => enemy.drawCharacter())
        if(this.lastEnemyHit) this.lastEnemyHit.lifebar.drawLifebar();
    }

    move(command) {
        this.player.move(command);
    }
    performAction(command) {
        this.player.performAction(command)
    }

    generateEnemy() {
        let newEnemy = new cpuCharacter(this.game, this.getRandomStartPos());
        this.enemies.push(newEnemy)
    }

    getRandomStartPos() {
        //todo
        let positions = [[600, 450], [200, 350], [600, 350], [200,500]]
        return positions[Math.floor(Math.random() * positions.length)] 
    }

    checkAttacksLanded() {
       this.checkPlayerAttacks()
       this.checkEnemyAttack()
    }

    checkKilledEnemies() {
        this.enemies.forEach( (enemy, i) => {
            if(enemy.lifebar.health === 0) {
                this.enemies = this.enemies.slice(0, i).concat(this.enemies.slice(i+1))
                this.lastEnemyHit = null;
                this.generateEnemy();  // remove this later
            }
        })
    }

    checkPlayerAttacks() {
        if (this.player.hitbox.length) {
            this.enemies.forEach(enemy => {
                if(this.checkCollision(this.player.hitbox, enemy.calculateHurtBox())){
                    // console.log('passed collision')
                    switch(this.player.currentAction) {
                        case 'lAttack':
                            if (!enemy.stunned) {
                                this.lastEnemyHit = enemy;
                                enemy.takeDamage(15);
                            }
                            break;
                        case 'hAttack':
                            enemy.takeDamage(30)
                            break;
                        case 'throw':
                            enemy.takeDamage(50)
                            break
                    }
                }
            })
        }
    }

    checkEnemyAttack() {

    }

    checkCollision(hitbox, hurtbox) {
        if ((hitbox[0] <= hurtbox[0] && hitbox[2] >= hurtbox[0]) ||
            (hitbox[0] <= hurtbox[2] && hitbox[2] >= hurtbox[2])) {
                if((hitbox[1] >= hurtbox[1] && hitbox[3] <= hurtbox[1]) ||
                    hitbox[1] >= hurtbox[3] && hitbox[3] <= hurtbox[3]){
                    return true;
                }
        } 
        return false
    }
 }