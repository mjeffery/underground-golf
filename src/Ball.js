import { Sprite, Physics } from 'phaser'

export const Constants = {
    Damping: 0.9,
    PowerScale: 500,
    Bounce: 0.8
}

export default class Ball extends Sprite {
    
    static preload(load) {
        load.image('ball', 'assets/img/ball.png');
    }

    constructor(game, x, y, p2settings) {
        super(game, x, y, 'ball');

        this.anchor.setTo(0.5, 0.5);
       
        //TODO is this the right physics?  No, it's not...
        game.physics.enable(this, Physics.P2JS);
        this.body.setMaterial(p2settings.materials.ball);
        this.body.damping = Constants.Damping;
        this.body.collideWorldBounds = true;

        const { balls, world } = p2settings.collisionGroups;
        this.body.setCollisionGroup(balls);
        this.body.collides([balls, world]);
    }

    shoot(angle, power) {
        let speed = power * Constants.PowerScale;
        this.game.physics.arcade.velocityFromRotation(angle, speed, this.body.velocity);
    }
}
