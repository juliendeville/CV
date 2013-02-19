Class.create("Bonus", {
    element: null,
    _dead: false,
    _dying: false,
    direction: "none",
    texture: "donut",
    case: 32,
    perso: 64,
    target: {x: 0, y: 0},
    scene: null,
    hitbox: null,
    initialize: function( scene, stage, coords ) {
    	if( !scene || !coords || typeof coords != "object" )
    		return false;
        this.scene = scene;
        this.element = this.scene.createElement();
        this.element.drawImage( this.texture );
        var x = coords.element.x;
        var y =  coords.element.y;
        this.element.x = x;
        this.element.y = y;
        this.target.x = x;
        this.target.y = y;
        this.hitbox = Class.New( "Entity", [ stage ] );

        this.hitbox.rect( 0, 0, 32, 32 );
        this.hitbox.position( x, y );
        this.hitbox.el = this.element;
        this.hitbox.classe = this;
    },
    isDead: function() {
        return this._dead;
    },
    isDying: function() {
        return this._dying;
    },
    Die: function() {
        this._dead = true;
        this._dying = true;
    }
});