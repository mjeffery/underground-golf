import { Sprite, Physics } from 'phaser'

const texture = 'hole';

export default class Hole extends Sprite {

    static preload(load) {
        load.image(texture, 'assets/img/hole.png');
    }

    constructor(game, x, y, p2settings) {
        super(game, x, y, texture);

        this.anchor.setTo(0.5, 0.5);

        game.physics.p2.enable(this);
        this.body.setMaterial(p2settings.materials.ballAndHole);
        this.body.allowGravity = false;
        this.body.gravity = 0;
        this.body.immovable = true;
        this.body.static = true;

        const { balls, world } = p2settings.collisionGroups;
        this.body.setCollisionGroup(world);
        this.body.collides([balls]);
    }
}
