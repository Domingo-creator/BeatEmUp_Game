import { ContinueScreen } from "./continueScreen";
import { cpuCharacter } from "./cpuCharacter";
import { PlayerCharacter } from "./playerCharacter";
import { Score } from "./score";
import { Timer } from "./timer";

export class Stage {
    constructor(game) {
        this.game = game;
        this.dimensions = game.dimensions;
        this.floorHeight = game.dimensions.height/2.2
        this.ctx = game.ctx;
        //list of stages.  eventually probably want to replace with images
        //list properties: sky-color, ground-color
        this.enemies = [];
        this.killed_characters = [];    
        this.player = new PlayerCharacter(game);
        this.timer = new Timer(this.ctx, this.dimensions);
        this.score = new Score(this.ctx, this.dimensions, this.timer);
        this.addNewEnemies();
        this.startMusic();
        this.gameOver = false;
        // this.pickStage()
    }

    startMusic() {
        if(this.game.options.sound === 'on') {
            this.sound = new Howl({
                src: ['./sounds/The_Dark_Amulet.mp3']
            });
            this.sound.volume(this.game.options.volume.BGM * .1);
            this.sound.play();
        }
    }

    stopMusic() {
        this.sound.stop();
    }
    // pickStage() {
    //     let stageNum;
    //     if (this.game.options.stage === 'random') {
    //         stageNum = Math.floor(Math.random()  * this.stageList.length)
    //     } else {
    //         stageNum = 0 // TODO CHANGE THIS 
    //         /// take stage number/name
    //     }
    //     this.stage = this.stageList[stageNum]
    // }

    draw() {
      if(this.flashScreen) {
         this.ctx.fillStyle = 'white'
         this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height) 
         this.flashScreen = false;
      }  else {
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);
        };
        img.src = './images/gameBackgrounds/stageBackground.png';
        this.player.drawCharacter();
        this.player.lifebar.drawLifebar();
        this.timer.draw();
        this.score.draw();
        this.enemies.forEach( enemy => {
            enemy.drawCharacter()
            enemy.lifebar.drawLifebar();
        })
        this.killed_characters.forEach( killedEnemy => {
            killedEnemy.drawCharacter()
            killedEnemy.lifebar.drawLifebar()
        })
        if(this.gameOver) {
            if(!this.continueScreen) this.continueScreen = new ContinueScreen(this.game);
            this.continueScreen.draw();

        }
      } 
    }

    move(command) {
        if(this.gameOver) {
            if(!this.continueScreen) this.continueScreen = new ContinueScreen(this.game);
            this.continueScreen.move(command)
        } else {
            this.player.move(command);
        }
    }
    performAction(command) {
        if(this.gameOver) {
            if(!this.continueScreen) this.continueScreen = new ContinueScreen(this.game);
            this.continueScreen.performAction(command)
        } else {
            this.player.performAction(command)
        }
    }

    addNewEnemies() {
        let totalEnemies = 2 + Math.floor(this.timer.time / 20)
        while(this.enemies.length < totalEnemies) {
            this.generateEnemy();
        }
    }

    generateEnemy() {
        let newEnemy = new cpuCharacter(this.game, this.getRandomStartPos());
        this.enemies.push(newEnemy)
    }

    getRandomStartPos() {
        let side = Math.floor(Math.random() * 2) === 1 ? 'left' : 'right'
        let yStart = Math.floor(Math.random() * (this.dimensions.height - this.floorHeight)) + this.floorHeight 
        let xStart = side === 'left' ? 1000 : -100;  // change this to off screen later
        return [xStart, yStart]
    }

    checkAttacksLanded() {
       this.checkPlayerAttacks()
       this.checkEnemyAttack()
    }

    checkKilledEnemies() {
        this.enemies.forEach( (enemy, i) => {
            if(enemy.lifebar.health === 0) {
                this.enemies = this.enemies.slice(0, i).concat(this.enemies.slice(i+1))
                this.killed_characters.push(enemy);
                setTimeout(() => this.killed_characters.shift(), 5000)
                enemy.death();
                this.score.increaseScore(enemy);
            }
        })
    }

    checkKilledPlayer() {
        if(this.player.lifebar.health === 0 && this.player.currentAction !== 'death') {
            this.killed_characters.push(this.player);
            setTimeout(() => this.killed_characters.shift(), 5000);
            this.player.death();
            this.gameOver = true;
            // setTimeout( () => this.player = new PlayerCharacter(this.game), 6000);
        }
    }

    checkPlayerAttacks() {
        if (this.player.hitbox.length) {
            this.enemies.forEach(enemy => {
                if(this.checkCollision(this.player.hitbox, enemy.calculateHurtBox())){
                    // console.log('passed collision')
                    switch(this.player.currentAction) {
                        case 'lAttack':
                            if (!enemy.stunned) {
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
        this.enemies.forEach( enemy => {
            if(this.checkCollision(enemy.hitbox, this.player.calculateHurtBox())) {
                if(!this.player.stunned) {
                    this.player.takeDamage(10);
                }
            }
        })

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

    startFlashScreen() {
        this.flashScreen = true;
    }
 }