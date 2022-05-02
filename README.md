# BeatEmUp_Game AKA Skeletal Swarm:
A fun JS beat-em-up game

LIVE-LINK: https://domingo-creator.github.io/BeatEmUp_Game/

## Background 
  This is a fun retro style beat-em-up game similar to the old double dragon/X-men arcade games. You will will be able to move back and forth accross the stage and battle with the incoming enemies. You have a limited health bar and your score is tracked.  As time goes on, the number of enemies on screen will increase.  Survive as long as you can.

![skeletal_swarm_title_screen](https://user-images.githubusercontent.com/59151493/166077190-6fa64f73-3e55-4e82-988d-2a7017e7d592.gif)

## Functionality & MVPs
In BeatEmUpGame, users will be able to:

+ Move in all (2d) directions
+ Dash
+ Attack
+ Jump
+ Receive damage



In addition, this project will include: 

+ There will be a start menu 
+ There will be an options menu
+ There will be a mute button



## Wireframes
[wireframes](https://wireframe.cc/i5caUj)



![skeletal_swarm_gameplay](https://user-images.githubusercontent.com/59151493/166077172-8dfca8da-06fb-4553-8378-3fca5e475b35.gif)



## Technologies, Libraries, APIs 
+ Vanilla Javascript for all logic
+ Vanilla JS DOM manipulation for changing page elements
+ Canvas: to help me draw my game on the screen 
+ CSS organization page animations


## Features

### Movement
Players can move in any of the 8 direction: up, down, left, right, down-left, down-right, up-left, or up-right.
Players can also double tap a direction to dash, or press space to jump.  Movement is 

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
  }
  .....
```

### Attacks




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
