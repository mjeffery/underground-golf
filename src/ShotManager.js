export default class ShotManager {

    constructor(input, ball, rubberband) {
        this.input = input; //TODO someday this might not be the game's input?
        this.ball = ball;
        this.rubberband = rubberband;

        this.pointerWasDown = false;
    }

    think() {
        let ball = this.ball;
        let rubberband = this.rubberband;

        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            this.pointerWasDown = true; 

            rubberband.visible = true;
            rubberband.leftEnd.setTo(pointer.worldX, pointer.worldY); 
            rubberband.rightEnd.copyFrom(ball);

            rubberband.think();
        } else {
            if(this.pointerWasDown) {
                ball.shoot(rubberband.shotAngle, rubberband.length / rubberband.maxLength);  
            } 
            rubberband.visible = false; 
            this.pointerWasDown = false;
        }
    }
}
