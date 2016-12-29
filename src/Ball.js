import { Sprite, Physics } from 'phaser'

export const Constants = {
    Drag: 150,
    PowerScale: 500,
    Bounce: 0.8
}

export default class Ball extends Sprite {
    
    static preload(load) {
        load.image('ball', 'assets/img/ball.png');
    }

    constructor(game, x, y, collidableGroup) {
        super(game, x, y, 'ball');

        this.anchor.setTo(0.5, 0.5);
       
        //TODO is this the right physics?  No, it's not...
        game.physics.enable(this, Physics.P2JS);
        //this.body.drag.setTo(Constants.Drag, Constants.Drag);
        this.body.collideWorldBounds = true;
        //this.body.bounce.setTo(Constants.Bounce, Constants.Bounce);
        this.body.collides([collidableGroup]);
    }

    shoot(angle, power) {
        let speed = power * Constants.PowerScale;
        this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
    }
}
