import Ball from './Ball'
import RubberBand from './RubberBand' 

export default class Preload {
	preload() {
		const load = this.load,
			  add = this.add;

		this.bar = add.sprite(303, 281, 'loading-bar');
		this.overlay = add.sprite(298, 276, 'loading-bar-overlay');

		load.onLoadComplete.addOnce(this.onLoadComplete, this);
		load.setPreloadSprite(this.bar);

		//PRELOAD RESOURCES HERE
        Ball.preload(load);
        RubberBand.preload(load);
	}

	onLoadComplete() {
		this.game.state.start('game');
	}
}
