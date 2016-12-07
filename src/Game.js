import Ball from './Ball'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';

        const ball = new Ball(this.game, 400,300);
        this.add.existing(ball);
	}
}
