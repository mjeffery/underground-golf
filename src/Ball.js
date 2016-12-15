import { Sprite, Physics } from 'phaser'

export const Constants = {
    Drag: 300
}

export default class Ball extends Sprite {
    
    static preload(load) {
        load.image('ball', 'assets/img/ball.png');
        load.image('red', 'assets/img/red.png');
    }

    constructor(game, x, y) {
        super(game, x, y, 'ball');

        this.anchor.setTo(0.5, 0.5);
       
        //TODO is this the right physics?  No, it's not...
        game.physics.enable(this, Physics.ARCADE); 
        this.body.drag.setTo(Constants.Drag, Constants.Drag);
    }
}
