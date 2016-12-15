import { Sprite, Point } from 'phaser'

export default class RubberBand extends Sprite {

    static preload(load) {
        load.image('red', 'assets/img/red.png');
    }

    constructor(game, x, y) {
        super(game, x, y, 'red');
        this.leftEnd = new Point();
        this.rightEnd = new Point();
        
        this.anchor.setTo(1, 0.5);
    }

    think() {
        const left = this.leftEnd,
              right = this.rightEnd;

        this.x = right.x;
        this.y = right.y;

        this.rotation = Point.angle(right, left);
        this.scale.x = Point.distance(left, right) / 2;
    }
}
