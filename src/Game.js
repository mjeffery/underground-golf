import Ball from './Ball'
import Box from './Box'
import Hole from './Hole'
import PhysicsSettings from './PhysicsSettings'
import ShotManager from './ShotManager'
import Keyboard from 'phaser'

export default class Game {
	
	create() {
		this.stage.backgroundColor = '#6595ED';
        
        this.settings = new PhysicsSettings(this.game);

        this.collidableGroup = this.game.physics.p2.createCollisionGroup();
        const ball = this.ball = new Ball(this.game, 400,300, this.settings);
        const hole = this.hole = new Hole(this.game, 100, 100, this.settings);
        this.add.existing(hole);
        this.add.existing(ball);

        this.shotManager = new ShotManager(this.game);
        this.shotManager.events.onShot.add(ball.shoot, ball);
        this.spaceKey = this.game.input.keyboard.addKey(Keyboard.SPACEBAR);

        this.spaceKey.onDown.add( () => {this.addMovable(new Box(this.game, 0, 0, this.settings))}, this);
    }

    addMovable(movable) {
        this.movable = movable;
        this.add.existing(movable);
    }

    update() {
        let shotManager = this.shotManager;

        let velocity = this.ball.body.velocity;
        let ballSpeedSq = (velocity.x ** 2) + (velocity.y ** 2);

        shotManager.enabled = !(ballSpeedSq > 0.1);

        shotManager.think();

        if(this.movable && this.movable.isMovable) {
            this.movable.think();
        }

        //if(this.spaceKey.isDown) {
        //    window.movable = this.addMovable(new Box(this.game, this.collidableGroup));
        //}
    }
}
