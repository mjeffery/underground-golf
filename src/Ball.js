import { Sprite } from 'phaser'

export default class Ball extends Sprite {
    
    static preload(load) {
        load.image('ball', 'assets/img/ball.png');
    }

    constructor(game, x, y) {
        super(game, x, y, 'ball');

        this.anchor.setTo(0.5, 0.5);
    }
}
