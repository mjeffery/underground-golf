import Ball from './Ball'
import Box from './Box'
import PhysicsSettings from './PhysicsSettings'
import ShotManager from './ShotManager'
import { Keyboard, Physics } from 'phaser'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';
        
        this.settings = new PhysicsSettings(this.game);
        
        const ball = this.ball = new Ball(this.game, 400,300, this.settings);
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
