export class MenuOption {
    constructor(optionText, position, selectedAction, selectedStatus = false) {
        this.optionText = optionText;
        this.selectedStatus = selectedStatus;
        this.selectedAction = selectedAction;
        this.position = position; 
    }

    draw(ctx) {
        // console.log(this.selectedStatus)
        ctx.fillStyle = this.selectedStatus ? 'yellow' : 'red'
        ctx.strokeStyle = 'black'
        ctx.font = '30px Sans-serif';
        ctx.lineWidth = 8;
        ctx.strokeText(`${this.optionText}`, this.position[0], this.position[1]);
        ctx.fillText(`${this.optionText}`, this.position[0], this.position[1]);
    }

    toggleHighlight() {
        this.selectedStatus === true ? this.selectedStatus = false : this.selectedStatus = true; 
    }
}