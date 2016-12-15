import { Signal } from 'phaser'
import RubberBand from './RubberBand'

export default class ShotManager {

    static preload(load) {
        load.image('red-ring', 'assets/img/red-ring.png'); 
    }

    constructor(game) {
        this.input = game.input; //TODO someday this might not be the game's input?

        this.circle = game.add.sprite(0, 0, 'red-ring'); 
        this.circle.anchor.setTo(0.5, 0.5);
        this.circle.visible = false;

        this.rubberband = new RubberBand(game, 0, 0);
        this.rubberband.visible = false;
        game.add.existing(this.rubberband);

        this.pointerWasDown = false;

        this.events = {
            onShot: new Signal()
        }
    }

    think() {
        let pointer = this.input.activePointer;
        if(pointer.isDown) {
            const x = pointer.worldX,
                  y = pointer.worldY;

            if(!this.pointerWasDown) {
                this.startDrag(x,y);
            }
            this.dragging(x,y);
            
            this.pointerWasDown = true; 
        } 
        else {
            if(this.pointerWasDown) {
                this.endDrag();
            } 

            this.pointerWasDown = false;
        }
    }

    startDrag(x, y) {
        let circle = this.circle,
            rubberband = this.rubberband;

        circle.x = x;
        circle.y = y;
        circle.visible = true;

        rubberband.visible = true;
        rubberband.leftEnd.setTo(x, y);
        rubberband.rightEnd.setTo(x, y);
    }

    dragging(x, y) {
        this.rubberband.leftEnd.setTo(x,y);
        this.rubberband.think();
    }

    endDrag() {
        let rubberband = this.rubberband,
            angle = rubberband.shotAngle,
            power =  rubberband.length / rubberband.maxLength;

        this.events.onShot.dispatch(angle, power);

        this.circle.visible = false;
        rubberband.visible = false;
    }

}
