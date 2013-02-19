Class.create("Player", {
    element: null,
    _dead: false,
    _dying: false,
    animation: null,
    animationdie: null,
    texture: "player",
    tir: "tir1",
    hitbox: null,
    scene: null,
    credits: 0,
    base_x: 0,
    base_y: 0,
    initialize: function(scene, stage, coords, texture) {
    	if( !scene || !coords || typeof coords != "object" )
    		return false;
        this.scene = scene;
    	if( texture )
    		this.texture = texture;
        this.element = this.scene.createElement();
        this.animation = canvas.Animation.new({
            images: this.texture,
            animations: {
                fly: {
                    frames: [0, 3],
                    size: {
                        width: 116/4,
                        height: 64
                    },
                    frequence: 5
                }
            }
        });
        
        this.animation.add( this.element );
        this.animation.play( "fly", "loop" );

        this.animationdie = canvas.Animation.new({
            images: "explosion",
            animations: {
                die: {
                    frames: [0, 3],
                    size: {
                        width: 116/4,
                        height: 64
                    },
                    frequence: 5
                }
            }
        });
        
        this.animationdie.add( this.element );
        //this.animationdie.play( "die" );

        this.animationdie.x = coords.x;
        this.animationdie.y = coords.y;
        this.animation.x = coords.x;
        this.animation.y = coords.y;
        this.element.x = coords.x;
        this.element.y = coords.y;

        this.hitbox = Class.New("Entity", [stage]);

        this.hitbox.rect( 0, 0, 29, 50 );
        this.hitbox.position( coords.x , coords.y );
        //this.hitbox.el.fillStyle = "green";
        //this.hitbox.el.fillRect(0,0, 29, 64);

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
    move: function( coords ) {
        var self = this;
        if( !coords )
            return;

        self.animation.x = coords.x;
        self.animation.y = coords.y;
        self.animationdie.x = coords.x;
        self.animationdie.y = coords.y;
        self.element.x = coords.x;
        self.element.y = coords.y;
        self.hitbox.move( coords.x - self.hitbox.el.x, coords.y - self.hitbox.el.y );
    },
    addCredits: function( nb ) {
        this.credits += nb;
        //console.log( "vous avez " + this.credits + " crédits !" );
    },
    Bonus: function() {
        //a voir
        this.addCredits( this.scene.credits.bonus );
        if( this.tir == "tir1" )
            this.tir = "tir2";
        else if( this.tir == "tir2" )
            this.tir = "tir3";
        else if( this.tir == "tir3" )
            this.addCredits( this.scene.credits.rankMax );

    }
});
