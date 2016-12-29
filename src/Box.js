import { Sprite, Physics } from 'phaser'

export default class Box extends Sprite {

    static preload(load) {
        load.image('box', 'assets/img/box.png');
    }

    constructor(game, movableGroup) {
        super(game, game.centerX, game.centerY, 'box');

        this.isMovable = true;

        this.body.setCollisionGroup(movableGroup);

        this.anchor.setTo(0.5, 0.5);
        movableGroup.add(this);
        game.physics.enable(this, Physics.P2);
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
            this.game.physics.arcade.enable(this);
            this.body.immovable = true;
        }
    }
}
