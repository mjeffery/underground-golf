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
       
        game.physics.p2.enable(this);
        this.body.setMaterial(p2settings.materials.ball);
        this.body.damping = Constants.Damping;
        this.body.collideWorldBounds = true;
        this.body.fixedRotation = true;

        const { balls, world } = p2settings.collisionGroups;
        this.body.setCollisionGroup(balls);
        this.body.collides([balls, world]);
    }

    shoot(angle, power) {
        let speed = power * Constants.PowerScale,
            x = Math.cos(angle) * speed,
            y = Math.sin(angle) * speed;

        this.body.applyImpulseLocal([x, y], 0, 0); //TODO this array left to GC is alittle sad?
    }
}
