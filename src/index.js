import {Howl, Howler} from 'howler';
import { Game } from './game.js'

document.addEventListener("DOMContentLoaded", () => {
    //Page Open Screen
    let backgroundContainer = document.querySelector('.background-container')
    let enterGameCheckbox = document.querySelector('#enter-checkbox')
    let enterSign = document.createElement('img')
    let clickHereSign = document.createElement('img')
    let arcadeOpenSign = document.createElement('img')
    let clickContainer = document.createElement('div')
    enterSign.setAttribute('src', './images/mainPage/neon_enter_sign.gif')
    clickHereSign.setAttribute('src', './images/mainPage/neon_click_here.gif')
    arcadeOpenSign.setAttribute('src', './images/mainPage/arcadeSign.gif')
    enterSign.classList.add('enter-sign')
    arcadeOpenSign.classList.add('arcade-open-sign')
    clickHereSign.classList.add('click-here-sign')
    clickContainer.classList.add('click-container')
    backgroundContainer.appendChild(arcadeOpenSign)
    clickContainer.appendChild(enterSign)
    clickContainer.appendChild(clickHereSign)
    backgroundContainer.appendChild(clickContainer)
    let game;

    clickContainer.addEventListener( 'click', (e) => {
        //hide neon signs
        clickContainer.style.display = 'none'
        clickHereSign.style.display ='none'
        enterSign.style.display ='none'
        arcadeOpenSign.style.display = 'none'
        enterGameCheckbox.checked = true;


        // Display Game Screen after zoom animation
        setTimeout( () => {
            backgroundContainer.style.backgroundImage = "url('./images/mainPage/arcade_screen_background.jpg')"
            // backgroundContainer.style.
            document.querySelector('.canvas-container').style.display = 'flex';
            let canvas = document.getElementById('game-canvas') 
            game = new Game(canvas);
            enterGameCheckbox.checked = false;
        
    
   

            document.addEventListener('keydown', (e) => {
                // console.log(e.code)
                let command = Object.keys(game.options.controls).filter( key => game.options.controls[key] === e.code)
                if (command.length) game.setKeyDown(command[0]);
            })

            document.addEventListener('keyup', (e) => {
                let command = Object.keys(game.options.controls).filter( key => game.options.controls[key] === e.code)
                if (command.length) game.setKeyUp(command[0]);
        })
        }, 5000);
    })
})

