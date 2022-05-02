![skeletal_swarm_title_screen](https://user-images.githubusercontent.com/59151493/166077190-6fa64f73-3e55-4e82-988d-2a7017e7d592.gif)
# BeatEmUp_Game AKA Skeletal Swarm:
  This is a fun retro style beat-em-up game similar to the old double dragon/X-men arcade games. You will will be able to move back and forth accross the stage and battle with the incoming enemies. You have a limited health bar and your score is tracked.  As time goes on, the number of enemies on screen will increase.  Survive as long as you can.

LIVE-LINK: https://domingo-creator.github.io/BeatEmUp_Game/



## Functionality & MVPs
In BeatEmUpGame, users will be able to:

+ **_Move in 8 directions_**: left, right, up, down, left-up,left-down,right-up,right-down
+ **_Attack_**
+ **_Receive damage_**: Players and enemies will receive damage to their health bars, resulting in death if health is fully depleted 
+ **_Jump_**:  Players will be able to jump, causing them temporarily leave the ground and become un-hittable.
+ **_Dash_** left or right by triple tapping a direction


In addition, this project will include: 
+ There will be a title screen where a player can choose to start the game 
+ There will be an options menu where users can changed difficulty or sound options
+ There will be a mute button to instantly turn on/off the sound.


## Wireframes
[wireframes](https://wireframe.cc/i5caUj)


## Technologies, Libraries, APIs 
Skeletal swarm was
+ Vanilla Javascript for all logic
+ Vanilla JS DOM manipulation for changing page elements
+ Canvas: to help me draw my game on the screen 
+ Howler.js to control sound effects
+ CSS organization page animations


![skeletal_swarm_gameplay](https://user-images.githubusercontent.com/59151493/166077172-8dfca8da-06fb-4553-8378-3fca5e475b35.gif)
## Features
### Movement
  Players can move in any of the 8 direction, as well as jump and dash.  Button presses are tracked with the controller object.  A control variable is set to true when the corresponding key is pressed down, and is set back to true false when the key is released.  Character actions and movements are determined based on which controller vairables are set to true. This allows for smoother and more responsive controls than simply listening for key-down events.
  
```
  this.controller = {
        up: false,
        down:false,
        left:false,
        right:false,
        lAttack:false,
        hAttack:false,
        jump:false,
    }
```

```             
  if(this.game.controller.up) {
      //check if moving opp direction and not still pressing.  reset if so
      if(!this.game.controller.down && this.yVel > 0) this.yVel = 0;
      this.dashDirection = null;
      if(this.yVel > -5) this.yVel -= this.moveSpeed;
  }

  if(this.game.controller.left) {
      if(!this.game.controller.right && this.xVel > 0) this.xVel = 0;
      if(this.dashDirection === 'right') this.dashDirection === null;
      if(this.xVel > -5 || (this.dashDirection === 'left' && this.xVel > -15)) {
          this.xVel -= this.moveSpeed;
      } 
  }.....
```

### Attacks
  Players and enemies can perform attacks, which temporarily casts a *_hit-box_* in the direction faced.  A collision detection algorithm is used to determin if this *_hit-box_* overlaps an enemy character's *_hurt-box_*.  If a collision is detected, damage is dealt to the impacted character's health bar and they unable to perform other actions for a short time. 
```
  performLightAttack(){
      if (this.directionFaced === 'right')
        this.hitbox = [this.position[0],this.position[1]+this.size.height,this.position[0]+215, this.position[1]]
      else {
        this.hitbox = [this.position[0] - 175,this.position[1]+this.size.height,this.position[0], this.position[1]]
      }
      this.currentAction = 'lAttack';
      this.comboWindowOpen = true;
      setTimeout( () => {
        this.comboWindowOpen = false;
        this.hitbox = []
        this.currentAction = null;
      },500)
    }
```
```
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
```

### Enemies
  Enemy skeletons will continue to spawn with an an increasing maximum on screen enemies as time goes on.  Enemy spawn locations will be randomized to discourage staying in one place.  Enemy skeletons will choose their next action through a simple AI algorithm, which determines an action based on the player's position and a degree of random chance.
```
  determineNextAction() {
        if(!this.stunned && !this.ActionLockOut) {
            if (!this.checkXInbounds(this.position[0] + (this.directionFaced === 'left' ? -40 : 40))) {
                this.move( )
            }
            else {
                this.isPlayerInRange() ? this.getRandomInRangeAction() : this.move()    
            }
        }
    }
```




## Credits
+ https://twitter.com/Namatnieks for the knight sprite sheet
+ Astro Bob for the skeleton sprite sheet
+ Mathew Pablo for the game music
+ Theon James for game background
+ https://www.shutterstock.com/g/kostins for title screen background
+ https://www.shutterstock.com/g/Atmosphere for main page background





## Credits
+ https://twitter.com/Namatnieks for the knight sprite sheet
+ Astro Bob for the skeleton sprite sheet
+ Mathew Pablo for the game music
+ Theon James for game background
+ https://www.shutterstock.com/g/kostins for title screen background
+ https://www.shutterstock.com/g/Atmosphere for main page background
