import Ball from './Ball'
import Box from './Box'
import ShotManager from './ShotManager'
import { Keyboard, Physics } from 'phaser'

export default class Game {
	
	create() {
        this.game.physics.startSystem(Physics.P2JS);
        this.collidableGroup = this.game.physics.p2.createCollisionGroup();
		this.stage.backgroundColor = '#6595ED';
        
        const ball = this.ball = new Ball(this.game, 400,300, this.collidableGroup);
        this.add.existing(ball);

        this.shotManager = new ShotManager(this.game);
        this.shotManager.events.onShot.add(ball.shoot, ball);
        this.spaceKey = this.game.input.keyboard.addKey(Keyboard.SPACEBAR);

        this.spaceKey.onDown.add( () => {this.addMovable(new Box(this.game))}, this);
    }

    addMovable(movable) {
        this.movable = movable;
        this.add.existing(movable);
    }

    update() {
        let shotManager = this.shotManager;

        let velocity = this.ball.body.velocity;
        let ballSpeedSq = (velocity.x * velocity.x) + (velocity.y * velocity.y);

        shotManager.enabled = !(ballSpeedSq > 0.1);

        shotManager.think();
    }
}
