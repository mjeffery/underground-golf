import { Sprite, Physics } from 'phaser'

export default class Box extends Sprite {

    static preload(load) {
        load.image('box', 'assets/img/box.png');
    }

    constructor(game, x, y, p2settings) {
        super(game, game.centerX, game.centerY, 'box');
        this.p2settings = p2settings;
        this.isMovable = true;

        this.anchor.setTo(0.5, 0.5);
        //this.body.static = true;
        
    }

    move() {
        let pointer = this.game.input.activePointer;
        this.x = pointer.worldX;
        this.y = pointer.worldY;
    }

    think () {

        if(this.isMovable) {
            this.move();
        }

        if(this.game.input.activePointer.leftButton.isDown) {
            this.isMovable = false;
            this.game.physics.enable(this, Physics.P2JS);
            const { balls, world } = this.p2settings.collisionGroups;
            this.body.setCollisionGroup(world);
            this.body.collides([balls, world]);
            this.body.allowGravity = false;
            this.body.gravity = 0;
            this.body.immovable = true;
            this.body.static = true;
        }
    }
}
