Class.create("Projectile", {
    element: null,
    texture: "fire",
    target: {x: 0, y: 0},
    scene: null,
    hitbox: null,
    dead: null,
    _dead: false,
    _dying: false,
    type: "no",
    vitesse: 8,
    initialize: function(scene, stage, coords, to, dead, texture) {
    	if( !scene || !coords || typeof coords != "object" )
    		return false;
        this.scene = scene;
        //callback fin mouvement 
        this.dead = dead;

        if( texture ) {
            this.texture = texture;
            if( texture == "ok" ) {
                this.type = "yes";
            } else {
                this.vitesse = 4;
            }
        }
        this.element = this.scene.createElement();
        this.element.drawImage( this.texture );

        var x = coords.x;
        var y =  coords.y;
        this.element.x = x;
        this.element.y = y;
        this.target.x = to.x;
        this.target.y = to.y;
        //this.element.addLoopListener( this.move.bind( this ) );
        this.hitbox = Class.New("Entity", [ stage ] );

        this.hitbox.rect( 0, 0, 8, 16 );
        this.hitbox.position( coords.x+4 , coords.y );

        this.hitbox.classe = this;

    },
    isDead: function() {
        return this._dead;
    },
    isDying: function() {
        return this._dying;
    },
    Die: function() {
        this._dying = true;
        this._dead = true;
    },
    move: function( vitesse ) {
        if( this.target.x == this.element.x && this.target.y == this.element.y ) {
            this.dead( this );
            return;
        }

        var mouvX = this.target.x - this.element.x;
        var mouvY = this.target.y - this.element.y;
        var dist = Math.sqrt( Math.pow( mouvX, 2 ) + Math.pow( mouvY, 2 ) );
        if( dist < vitesse ) {
            this.element.x = this.target.x;
            this.element.y = this.target.y;
        } else {
            var rapport = vitesse / dist;

            this.element.x += rapport * mouvX;
            this.element.y += rapport * mouvY;
            this.hitbox.move( rapport * mouvX, rapport * mouvY );
        }
        return;
    }
});