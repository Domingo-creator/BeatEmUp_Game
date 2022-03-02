import { Character } from "./character";



export class PlayerCharacter extends Character{ 
    constructor(game) {
        super(game, [30, 450], 'knight', 'right', {height:110, width: 40})
        this.blockGuage = 100;
        this.blockStatus = false;  //false if not blocking
        this.score = 0;
        this.jumpVel = 0
        this.jumpHeight = 0;
        this.moveLockOut = false;
        this.moveSpeed = 1;
    }

    HIT_SOUNDS = ['./sounds/player_sounds/hit/pain1.wav',
                  './sounds/player_sounds/hit/pain2.wav',
                  './sounds/player_sounds/hit/pain3.wav',
                 ]

    ATTACK_SOUNDS = ['./sounds/player_sounds/lAttack/hammer-1a.wav',
                     './sounds/player_sounds/lAttack/hammer-1b.wav',
                     './sounds/player_sounds/lAttack/sword-arm-2a.wav',
                     './sounds/player_sounds/lAttack/sword-arm-2b.wav'
                    ]

    RUN_SOUNDS = ['./sounds/player_sounds/move/step_metal1.ogg',
                  './sounds/player_sounds/move/step_metal2.ogg',
                  './sounds/player_sounds/move/step_metal3.ogg',
                  './sounds/player_sounds/move/step_metal4.ogg'
                 ]

    lockOutMove() {
        this.moveLockOut = true;
        setTimeout( () => this.moveLockOut = false, 50)
    }

    move() {
        //reduce velocity of everything not pressed
        if (this.currentAction !== 'jump' && this.currentAnimation !== 'death'  && !this.stunned) {
            if(!this.game.controller.up && this.yVel < 0) this.yVel += this.moveSpeed
            if(!this.game.controller.down && this.yVel > 0) this.yVel -= this.moveSpeed
            if(!this.game.controller.left && this.xVel < 0) this.xVel += this.moveSpeed
            if(!this.game.controller.right && this.xVel > 0) this.xVel -= this.moveSpeed
        //increase velocity of everything pressed
            if(!this.moveLockOut) {
                if(this.game.controller.up) {
                    //check if moving opp direction and not still pressing.  reset if so
                    if(!this.game.controller.down && this.yVel > 0) this.yVel = 0;
                    this.dashDirection = null;
                    if(this.yVel > -5) this.yVel -= this.moveSpeed;
                }
                if(this.game.controller.down) {
                    if(!this.game.controller.up && this.yVel < 0) this.yVel = 0;
                    this.dashDirection = null;
                    if(this.yVel < 5 ) this.yVel += this.moveSpeed;
                }
                if(this.game.controller.left) {
                    if(!this.game.controller.right && this.xVel > 0) this.xVel = 0;
                    if(this.dashDirection === 'right') this.dashDirection === null;
                    if(this.xVel > -5 || (this.dashDirection === 'left' && this.xVel > -15)) {
                        this.xVel -= this.moveSpeed;
                    } 
                }
                if(this.game.controller.right) {
                    if(!this.game.controller.left && this.xVel < 0) this.xVel = 0;
                    if(this.dashDirection === 'left') this.dashDirection === null;
                    if(this.xVel < 5  || (this.dashDirection === 'right' && this.xVel < 15)) {
                        this.xVel += this.moveSpeed;
                    }
                }
            }
        } 
        this.updateNewPos();
        this.lockOutMove();
    }

    performAction(inputs) {
        if(!this.currentAction) {
            if (inputs.lAttack) {
                this.getAttackSound();
                this.performLightAttack();
            } else if (inputs.hAttack) {
                this.performHeavyAttack();
            } else if (inputs.jump) {
                this.jump()
            } else if (inputs.throw) {
                this.performThrow();
            }
        }
    }

    updateNewPos() {
        let prevPos = this.position.slice()
        if(this.stunned) {
            this.xVel = 0;
            this.yVel = 0;
        }
        if (this.checkXInbounds(this.position[0] + this.xVel)){
            this.position[0] += this.xVel;
        } 
        if(this.currentAction !== 'jump') {   
            if (this.checkYInbounds(this.position[1] + this.yVel)){
                this.position[1] += this.yVel;
            }
           
            if(prevPos[0] !== this.position[0] || prevPos[1] !== this.position[1]) {
                this.getRunSound();
            }          
        } else {
            //if before apex
            if(this.yVel < 0) {
                this.position[1] += this.yVel;
                this.jumpHeight -= this.yVel;
                this.yVel += 2.5;
            } else{
                if(this.jumpHeight - this.yVel < 0) {
                    this.position[1] += this.jumpHeight
                    this.jumpHeight = 0;
                    this.yVel = 0;
                    this.xVel = 0;
                } else{
                    this.position[1] += this.yVel;
                    this.jumpHeight -= this.yVel;
                    this.yVel += 2.5;
                }
            }
            if(this.yVel === 0 && this.jumpHeight === 0) this.currentAction = null;
        }
        let prevDirection = this.directionFaced;
        if(this.xVel > 0) this.directionFaced = 'right';
        if(this.xVel < 0) this.directionFaced = 'left';
        if( prevDirection !== this.directionFaced) this.resetCurrentFrame();
    }

    
   

    jump() {
        this.currentAction = 'jump'
        this.yVel -= 40;
        if(this.game.controller.left && !this.game.controller.right) {
            this.xVel = -10;
        }
        if(this.game.controller.right && !this.game.controller.left) {
            this.xVel = 10;
        }
    }

    //command sent all the way from game class keyUp(). janky, maybe fix
    dash(direction) {
        this.dashDirection = direction;
    }

    getRunSound() {
        if(!this.runSoundTimeOut) {
            this.runSoundTimeOut = true;
            setTimeout( () => this.runSoundTimeOut = false, 700)
            if(this.game.options.sound === 'on') {
                var sound = new Howl({
                    src: ['./sounds/player_sounds/move/steps_platform.ogg']
                }); 
                sound.volume(this.game.options.volume.SFX * .1)
                sound.play();
            }
        }
    }

    getAttackSound() {
        if(!this.currentAttackSound) this.currentAttackSound = 0;
        if(this.game.options.sound === 'on') {
            var sound = new Howl({
                src: [this.ATTACK_SOUNDS[this.currentAttackSound]]
            });
            sound.volume(this.game.options.volume.SFX * .1)
            sound.play();
        }
        this.currentAttackSound++;
        this.currentAttackSound = this.currentAttackSound % this.ATTACK_SOUNDS.length
    }

    getHitSound() {
        if(!this.currentHitSound) this.currentHitSound = 0;
        if(this.game.options.sound === 'on') {
            var sound = new Howl({
                src: [this.HIT_SOUNDS[this.currentHitSound]]
            });
            sound.volume(this.game.options.volume.SFX * .1)
            sound.play();
        }
        this.currentHitSound++;
        this.currentHitSound = this.currentHitSound % this.ATTACK_SOUNDS.length
    }

    getDeathSound() {
        if(this.game.options.sound === 'on') {
            var sound = new Howl({
                src: ['./sounds/player_sounds/death/die2.wav']
            });
            sound.volume(this.game.options.volume.SFX * .1)
            sound.play();
        }

    }

}