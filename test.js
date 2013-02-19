var canvas = CE.defines("canvas_id").
extend(Input).
extend(Tiled).
extend(Animation).
extend(Hit).
extend(Scrolling).
ready(function() {
    canvas.Scene.call("Test");
});


canvas.Scene.new({
    name: "Test", // Obligatory
    credits :{
        rankMax: 500,
        ennemiKill: 100,
        bigEnnemiKill: 200,
        bossEnnemiKill: 1000
    },
    walkers: [],
    survivants: [],
    murs: [],
    sorties: [],
    materials: {
        images: {
            fond: "assets/farback.gif",
            decor: "assets/starfield.png",
            player: "assets/player.png",
            ennemi1: "assets/ennemi1.png",
            ennemi2: "assets/ennemi2.png",
            ennemi3: "assets/ennemi3.png",
            ennemi4: "assets/ennemi4.png",
            donut: "assets/donut.png",
            boss: "assets/boss.png",
            starfield: "assets/starfield.png"
        }
    },
    //Method called at each resource loaded in the materials property
    preload: function(stage, pourcent) {

    },
    //Method called when resources are loaded
    ready: function(stage) {

      var el = this.createElement();
      el.drawImage( "fond" );

      el.mouseover( function( e ) {
        console.log( e ); 
      });

      el.mouseout( function( e ) { 
        console.log( e ); 
      });

      el.click( function( e ) { 
        console.log( e ); 
      });

      stage.append( el );
    },
    //Method called at each render (60 FPS)
    render: function(stage) {


        stage.refresh();
    },
    //Method called when this scene is quitted (or another scene is called)
    exit: function(stage) {

    }
});