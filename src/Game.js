import Ball from './Ball'
import RubberBand from './RubberBand'
import ShotManager from './ShotManager'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';

        const ball = this.ball = new Ball(this.game, 400,300);
        this.add.existing(ball);

        const rubberband =  new RubberBand(this.game, 400, 300);
        this.add.existing(rubberband);

        this.shotManager = new ShotManager(this.game.input, ball, rubberband);
	}

    update() {
        this.shotManager.think();
    }
}
