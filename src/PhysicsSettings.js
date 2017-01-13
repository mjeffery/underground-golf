import { Physics } from 'phaser'

export default class PhysicsSettings {

    constructor(game) {
        this.game = game;

        game.physics.startSystem(Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        const p2 = game.physics.p2;
        const materials = {
            ball: p2.createMaterial('ball'),
            worldBounds: p2.createMaterial('worldBounds'),
            ballAndHole: p2.createMaterial('ballAndHole')
        };


        p2.setWorldMaterial(materials.worldBounds);

        const contactMaterials = {
            ballXworld: p2.createContactMaterial(materials.ball, materials.worldBounds, {
                restitution: 1
            })
        };

        const collisionGroups = {
            balls: p2.createCollisionGroup(),
            world: p2.createCollisionGroup()    
        };

        p2.updateBoundsCollisionGroup();

        this._materials = materials;
        this._contactMaterials = contactMaterials;
        this._collisionGroups = collisionGroups;
    }

    get materials() { return this._materials; }
    get contactMaterials() { return this._contactMaterials; }
    get collisionGroups() { return this._collisionGroups; }
}
