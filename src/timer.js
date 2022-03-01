class TimeClock {
    constructor() {
        this.time = 0;
        this.timer = this.startTimer();
    }

    startTimer() {
        let interval = setInterval( () => this.time += 1 , 1000)
    }

    draw() {
        
    }

}