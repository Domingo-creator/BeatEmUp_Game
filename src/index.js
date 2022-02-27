
import { Game } from './game.js'

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById('game-canvas')
    let game = new Game(canvas);
    


    document.addEventListener('keydown', (e) => {
        // console.log(e.code)
        let command = Object.keys(game.options.controls).filter( key => game.options.controls[key] === e.code)
        if (command.length) game.setKeyDown(command[0]);
    })

    document.addEventListener('keyup', (e) => {
        let command = Object.keys(game.options.controls).filter( key => game.options.controls[key] === e.code)
        if (command.length) game.setKeyUp(command[0]);
    })
})

