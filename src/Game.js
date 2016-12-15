import Ball from './Ball'
import ShotManager from './ShotManager'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';

        const ball = this.ball = new Ball(this.game, 400,300);
        this.add.existing(ball);

        this.shotManager = new ShotManager(this.game);
        this.shotManager.events.onShot.add(ball.shoot, ball);
	}

    update() {
        let shotManager = this.shotManager;

        let ballSpeedSq = this.ball.body.velocity.getMagnitudeSq();
        if(ballSpeedSq > 0.1) {
            shotManager.enabled = false;
        } else {
            shotManager.enabled = true;
        }

        shotManager.think();
    }
}
