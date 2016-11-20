export default class Boot {
	preload() {
		this.load.image('loading-bar-overlay', 'assets/img/loading-bar-overlay.png')
		this.load.image('loading-bar', 'assets/img/loading-bar.png')
	}

	create() {
		this.game.state.start('preload')
	}
}
