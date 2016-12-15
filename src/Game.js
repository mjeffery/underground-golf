import Ball from './Ball'
import RubberBand from './RubberBand'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';

        const ball = this.ball = new Ball(this.game, 400,300);
        this.add.existing(ball);

        const rubberband = this.rubberband = new RubberBand(this.game, 400, 300);
        this.add.existing(rubberband);
	}

    update() {
        let rubberband = this.rubberband;

        let pointer = this.game.input.activePointer;
        if(pointer.isDown) {
            rubberband.leftEnd.setTo(pointer.worldX, pointer.worldY); 
        }

        rubberband.rightEnd.copyFrom(this.ball);
        rubberband.think();
    }
}
