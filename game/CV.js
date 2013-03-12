canvas.Scene.new({
    name: "CV", // Obligatory
    materials: {
        images: {
            fond: "assets/astronaut/farback.gif",
            decor: "assets/astronaut/starfield.png",
            textefond: "assets/textefond.png",
            player: "assets/astronaut/player.png",
            ennemi1: "assets/astronaut/ennemi1.png",
            ennemi2: "assets/astronaut/ennemi2.png",
            ennemi3: "assets/astronaut/ennemi3.png",
            ennemi4: "assets/astronaut/ennemi4.png",
            fire: "assets/astronaut/fire.png",
            explosion: "assets/astronaut/explosion.png",
            explosionBoss: "assets/astronaut/explosionBoss.png",
            fireEnnemi: "assets/astronaut/fireEnnemi.png",
            donut: "assets/astronaut/donut.png",
            boss: "assets/astronaut/boss.png",
            qrcode: "assets/qrcode.png"
        }
    },
    hauteur: 2700,
    hauteurEcran: 500,
    largeur: 600,
    largeurJoueur: 29,
    hauteurJoueur: 64,
    hauteurJoueurHitBox : 50,
    largeurEnnemi: 40,
    hauteurEnnemi: 30,
    largeurBoss: 80,
    hauteurBoss: 60,
    //Method called at each resource loaded in the materials property
    preload: function(stage, pourcent) {

    },
    //Method called when resources are loaded
    ready: function(stage) {
        var self = this;
        self.moves = 100;


        //credits -----------------------------------------------
        self.Credits = self.createElement();
        self.Credits.y = 150;
        self.Credits.x = 250;

        self.fond2 = self.createElement();
        self.fond2.drawImage( "fond", 0, 110, 600, 500, 0, 0, 600, 500);
        self.fond2.y = 110;

        var conception = self.createElement();
        conception.fillStyle = "white";
        conception.font = "20px SuperFont";
        conception.fillText("Conceptor & Developper", 0, 0);
        conception.y = 10;
        conception.x = 0;
        self.Credits.append( conception );

        var me = self.createElement();
        me.fillStyle = "white";
        me.font = "16px SuperFont";
        me.fillText("Julien DEVILLE", 0, 0);
        me.y = 40;
        me.x = 20;
        self.Credits.append( me );
        
        var graph = self.createElement();
        graph.fillStyle = "white";
        graph.font = "20px SuperFont";
        graph.fillText("Graphists", 0, 0);
        graph.y = 80;
        graph.x = 0;
        self.Credits.append( graph );

        var GameDevTuts = self.createElement();
        GameDevTuts.fillStyle = "transparent";
        GameDevTuts.fillRect(0, -13, 300, 15);
        GameDevTuts.fillStyle = "white";
        GameDevTuts.font = "16px SuperFont";
        GameDevTuts.fillText("GameDevTuts from OpenGameArt.org", 0, 0);
        GameDevTuts.y = 110;
        GameDevTuts.x = 20;
        GameDevTuts.click( open_in_new_tab.bind( self, "http://opengameart.org/content/simple-shoot-em-up-sprites-spaceship-starscape-ufo-0" ) );
        self.Credits.append( GameDevTuts );


        var Bart = self.createElement();
        Bart.fillStyle = "transparent";
        Bart.fillRect(0, -13, 300, 15);
        Bart.fillStyle = "white";
        Bart.font = "16px SuperFont";
        Bart.fillText("Bart from OpenGameArt.org", 0, 0);
        Bart.y = 130;
        Bart.x = 20;
        Bart.click( open_in_new_tab.bind( self, "http://opengameart.org/content/i-are-spaceship-16x16-space-sprites" ) );
        self.Credits.append( Bart );

        var Tracy = self.createElement();
        Tracy.fillStyle = "transparent";
        Tracy.fillRect(0, -13, 300, 15);
        Tracy.fillStyle = "white";
        Tracy.font = "16px SuperFont";
        Tracy.fillText("Tracy from OpenGameArt.org", 0, 0);
        Tracy.y = 150;
        Tracy.x = 20;
        Tracy.click( open_in_new_tab.bind( self, "http://opengameart.org/content/deadly-donut" ) );
        self.Credits.append( Tracy );
        

        var boss = self.createElement();
        boss.y = 550;
        boss.x = 70;

        self.animationboss = canvas.Animation.new({
            images: "boss",
            animations: {
                fly: {
                    frames: [0, 5],
                    size: {
                        width: 80,
                        height: 360/6
                    },
                    frequence: 4
                }
            }
        });
        self.animationboss.add( boss );
        self.animationboss.play( "fly", "loop" );

        self.Credits.append( boss );

        var thanks = self.createElement();
        thanks.fillStyle = "white";
        thanks.font = "16px SuperFont";
        thanks.fillText("Thank you for playing !", 0, 0);
        thanks.y = 630;
        thanks.x = 0;
        self.Credits.append( thanks );

        stage.append( self.fond2 );
        stage.append( self.Credits );

        //titre -----------------------------------------------
        self.titre = self.createElement();

        self.fond = self.createElement();
        self.fond.drawImage( "fond", 0, 0, 600, 110, 0, 0, 600, 110);
        //self.fond.y = -1782 + 110;

        self.etoiles = self.createElement();
        self.etoiles.drawImage( "decor" );

        self.titre1 = self.createElement();
        self.titre1.x = 100;
        self.titre1.y = 40;

        self.titre2 = self.createElement();
        self.titre2.x = self.largeur - 100 - self.largeurEnnemi;
        self.titre2.y = 40;

        self.titre1animation = canvas.Animation.new({
            images: "ennemi1",
            animations: {
                fly: {
                    frames: [0, 5],
                    size: {
                        width: 40,
                        height: 180/6
                    },
                    frequence: 4
                }
            }
        });
        self.titre1animation.add( self.titre1 );
        self.titre1animation.add( self.titre2 );
        self.titre1animation.play( "fly", "loop" );

        var text = self.createElement();
        text.fillStyle = "white";
        text.font = "30px SuperFont";
        text.fillText("Congratulations !", 0, 0);
        text.y = 65;
        text.x = 160;
        
        var score = self.createElement();
        score.fillStyle = "white";
        score.font = "15px SuperFont";
        if( self.score != 0 ) {
            score.fillText( "Your score : " + self.score + " !", 0, 0);
            score.y = 90;
            score.x = 210;
        } else {
            score.fillText( "Game Over !", 0, 0);
            score.y = 90;
            score.x = 210;
        }
        
        var site = self.createElement();
        site.fillStyle = "transparent";
        site.fillRect(0, -93, 80, 95);
        site.drawImage( "donut", 0, 0, 28, 28, 8, -85, 64, 64 );
        site.fillStyle = "white";
        site.font = "15px SuperFont";
        site.fillText( "My WebSite", 0, 0);
        site.y = 200;
        site.x = 40;
        site.click( open_in_new_tab.bind( self, "http://juliendeville.com/site" ) );
        
        var cv = self.createElement();
        cv.fillStyle = "white";
        cv.font = "15px SuperFont";
        cv.fillText( "My Resume", 0, 0);
        cv.y = 330;
        cv.x = 40;
        cv.click( open_in_new_tab.bind( self, "http://juliendeville.com/DEVILLE_Julien.pdf" ) );

        self.animationcv = canvas.Animation.new({
            images: "player",
            animations: {
                fly: {
                    frames: [0, 3],
                    size: {
                        width: 116/4,
                        height: 64
                    },
                    frequence: 5,
                    position: {
                        top: -80, 
                        left: 25
                    }
                }
            }
        });

        self.animationcv.add( cv );
        self.animationcv.play( "fly", "loop" );
        
        var contact = self.createElement();
        contact.fillStyle = "transparent";
        contact.fillRect(8, -85, 64, 94);
        contact.drawImage( "qrcode", 0, 0, 180, 180, 8, -85, 64, 64 );
        contact.fillStyle = "white";
        contact.font = "15px SuperFont";
        contact.fillText( "Contact Me !", 0, 0);
        contact.y = 460;
        contact.x = 40;
        contact.click( function() {
            qrcode.toggle();
        });

        var qrcode = self.createElement();
        qrcode.y = 500/2-180/2;
        qrcode.x = 600/2-180/2;
        qrcode.drawImage( "qrcode" );
        qrcode.hide();
        qrcode.click( function() {
            qrcode.hide();
        });
        
        self.titre.append( self.fond );
        self.titre.append( self.titre1 );
        self.titre.append( self.titre2 );
        self.titre.append( text );
        self.titre.append( score );
        self.titre.append( site );
        self.titre.append( cv );
        self.titre.append( contact );
        self.titre.append( qrcode );

        stage.append( self.titre );


    },
    //Method called at each render (60 FPS)
    render: function(stage) {
        var self = this;

        if( self.Credits.y > -300 ){
            if( self.moves == 0 ) {
                self.Credits.y--;
                self.moves = 1;
            } else {
                self.moves--;
            }
        }
        stage.refresh();
    },
    //Method called when this scene is quitted (or another scene is called)
    exit: function(stage) {

    }
});

function open_in_new_tab( url )
{
  window.open(url, '_blank');
  window.focus();
}