Class.create("Ennemi", {
    element: null,
    _dead: false,
    _dying: false,
    animation: null,
    direction: "none",
    texture: "fillette",
    type: "fuyards",
    target: {x: 0, y: 0},
    scene: null,
    cadence: 0,
    hitbox: null,
    initialize: function(scene, stage, coords, type) {
    	if( !scene || !coords || typeof coords != "object" )
    		return false;
        this.scene = scene;
    	this.texture = type;
        this.type = type;
        this.element = this.scene.createElement();

        if( this.type == "boss" ) {
            this.animation = canvas.Animation.new({
                images: this.texture,
                animations: {
                    fly: {
                        frames: [0, 5],
                        size: {
                            width: 80,
                            height: 360/6
                        },
                        frequence: 5
                    }
                }
            });

            this.animationdie = canvas.Animation.new({
                images: "explosionBoss",
                animations: {
                    die: {
                        frames: [0, 3],
                        size: {
                            width: 256/4,
                            height: 64
                        },
                        frequence: 5,
                        finish: deadEntity.bind( this.scene, this )
                    }
                }
            });
            
            this.animationdie.add( this.element );
            //this.animationdie.play( "die" );

        } else {
            this.animation = canvas.Animation.new({
                images: this.texture,
                animations: {
                    fly: {
                        frames: [0, 5],
                        size: {
                            width: 40,
                            height: 180/6
                        },
                        frequence: 5
                    }
                }
            });

            this.animationdie = canvas.Animation.new({
                images: "explosion",
                animations: {
                    die: {
                        frames: [0, 3],
                        size: {
                            width: 128/4,
                            height: 32
                        },
                        frequence: 5,
                        finish: deadEntity.bind( this.scene, this )
                    }
                }
            });
            
            this.animationdie.add( this.element );
            //this.animationdie.play( "die" );
        }
        
        var multiple = 2;
        if( this.type == "ennemi1" ) {
            this.cadence = 60 * multiple;
            this.hits = 1;
        }
        if( this.type == "ennemi2" ) {
            this.cadence = 45 * multiple;
            this.hits = 2;
        }
        if( this.type == "ennemi3" ) {
            this.cadence = 30 * multiple;
            this.hits = 5;
        }
        if( this.type == "ennemi4" ) {
            this.cadence = 15 * multiple;
            this.hits = 8;
        }
        if( this.type == "boss" ) {
            this.cadence = 5 * multiple;
            this.hits = 25;
        }

        this.animation.add( this.element );
        this.animation.play( "fly", "loop" );

        var x = coords.x;
        var y =  coords.y;
        this.element.x = x;
        this.element.y = y;
        this.target.x = x;
        this.target.y = y;
        this.hitbox = Class.New( "Entity", [ stage ] );

        if( this.type == "boss" ) {
            this.hitbox.rect( 0, 0, 80, 60 );
        } else {
            this.hitbox.rect( 0, 0, 40, 30 );
        }
        this.hitbox.position( x, y );
        this.hitbox.el = this.element;
        this.hitbox.classe = this;
    },
    isDead: function() {
        if( this.animation._stop && this.animationdie._stop )
            this._dead = true;
        return this._dead;
    },
    isDying: function() {
        return this._dying;
    },
    Die: function() {
        this._dying = true;
        this.animation.stop();
        this.animationdie.play("die", "stop");
    },
    to: function( coords ) {
        if( !coords || typeof coords != "object" )
            return;
        this.target = coords;
    },
    isMoved: function() {
        
    }
});