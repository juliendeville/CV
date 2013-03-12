var canvas = CE.defines("canvas_id").
extend(Input).
extend(Tiled).
extend(Animation).
extend(Hit).
extend(Scrolling).
extend(Spritesheet).
extend(Window).
ready(function() {
    canvas.Scene.call("Level1");
});

function MouveMove( e ) {
  var self = this;
  if( !self.joueur || self.ended || !self.started )
    return;

  var x, y;
  if( !e ) {
    x = self.largeur/2-self.largeurJoueur/2;
    y = self.hauteurEcran-200/2;
  } else {
    if( e.pageX - (e.target.parentNode.offsetLeft - 300) > self.largeur-self.largeurJoueur/2 )
      x = self.largeur-self.largeurJoueur;
    else if( e.pageX - (e.target.parentNode.offsetLeft - 300) < self.largeurJoueur/2 )
      x = 0;
    else 
      x = e.pageX - (e.target.parentNode.offsetLeft - 300) - self.largeurJoueur/2 ;
    
    if( e.pageY > self.hauteurEcran-self.hauteurJoueur/2 )
      y = self.hauteurEcran-self.hauteurJoueur;
    else if( e.pageY < self.hauteurEcran-200 + self.hauteurJoueur/2 )
      y = self.hauteurEcran-200;
    else 
      y = e.pageY - self.hauteurJoueur/2;
  }
  self.coordsPlayerTemp.x = x;
  self.coordsPlayerTemp.y = y-self.help.y;
}

function EndLevel() {
  var self = this;

  self.ended = true;
  self.score = self.joueur.credits;

  self.ennemis.forEach( function( entity ) {
    deadEntity.bind( self )( entity );
  });
  self.bonus.forEach( function( entity ) {
    deadEntity.bind( self )( entity );
  });
  self.projectileJ.forEach( function( entity ) {
    deadEntity.bind( self )( entity );
  });
  self.projectileE.forEach( function( entity ) {
    deadEntity.bind( self )( entity );
  });

}

function Fire( stage, e ) {
  var self = this;
  if( !self.joueur )
    return;


  console.log( "debut tir", new Date - self.debut );

  var x, y;
  if( e.offsetX > self.largeur )
    x = self.largeur;
  else if( e.offsetX < 0 )
    x = 0;
  else 
    x = e.offsetX ;
  
  if( e.offsetY > self.hauteurEcran )
    y = self.hauteurEcran;
  else if( e.offsetY < self.hauteurEcran-200 )
    y = self.hauteurEcran-200;
  else 
    y = e.offsetY;

  /*self.pause( true );
  self.real_pause = true;
*/

  var texture = false;
  if( e.type == "contextmenu" ) {
    texture = "ok";
  }

  if( self.joueur.tir == "tir1" ) {

    var projectile = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );
/*
    self.projectileJ.push( projectile );
    self.hitProjectileJ.push( projectile.hitbox );
*/
    self.projectileJTemp.push( projectile );
    self.hitProjectileJTemp.push( projectile.hitbox );
    //self.normal.append( projectile.element );
    //append( self.normal, projectile.element );
    self.normalTemp.push( projectile.element );

  } else if( self.joueur.tir == "tir2" ) {

    var projectile1 = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 - 16/2, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 - 16/2 - 61, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );

    var projectile2 = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 + 16/2, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 + 16/2 + 61, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );
    /*
    self.projectileJ.push( projectile1 );
    self.projectileJ.push( projectile2 );
    self.hitProjectileJ.push( projectile1.hitbox );
    self.hitProjectileJ.push( projectile2.hitbox );
    */
    self.projectileJTemp.push( projectile1 );
    self.projectileJTemp.push( projectile2 );
    self.hitProjectileJTemp.push( projectile1.hitbox );
    self.hitProjectileJTemp.push( projectile2.hitbox );
    //self.normal.append( projectile1.element );
    //self.normal.append( projectile2.element );
    /*
    append( self.normal, projectile1.element );
    append( self.normal, projectile2.element );
    */
    self.normalTemp.push( projectile1.element );
    self.normalTemp.push( projectile2.element );

  } else if( self.joueur.tir == "tir3" ) {

    var projectile1 = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );

    var projectile2 = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 - 16, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 - 16 - 70, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );

    var projectile3 = Class.new( "Projectile", [ self, stage, { 
      //start
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 + 16, 
      y: self.joueur.element.y - 16 
    }, { 
      //to
      x: self.joueur.element.x - 16/2 + self.largeurJoueur/2 + 16 + 70, 
      y: self.joueur.element.y - 700
    }, deadEntity.bind( self ),
    texture ] );
/*
    self.projectileJ.push( projectile1 );
    self.projectileJ.push( projectile2 );
    self.projectileJ.push( projectile3 );
    self.hitProjectileJ.push( projectile1.hitbox );
    self.hitProjectileJ.push( projectile2.hitbox );
    self.hitProjectileJ.push( projectile3.hitbox );
    */
    self.projectileJTemp.push( projectile1 );
    self.projectileJTemp.push( projectile2 );
    self.projectileJTemp.push( projectile3 );
    self.hitProjectileJTemp.push( projectile1.hitbox );
    self.hitProjectileJTemp.push( projectile3.hitbox );
    self.hitProjectileJTemp.push( projectile2.hitbox );
    //self.normal.append( projectile1.element );
    //self.normal.append( projectile2.element );
    //self.normal.append( projectile3.element );
/*
    append( self.normal, projectile1.element );
    append( self.normal, projectile2.element );
    append( self.normal, projectile3.element );
    */
    self.normalTemp.push( projectile1.element );
    self.normalTemp.push( projectile2.element );
    self.normalTemp.push( projectile3.element );
  }
/*
  self.pause( false );
  self.real_pause = false;
*/
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();

  console.log( "fin tir", new Date - self.debut );
}

function FoeFire( stage ) {
  var self = this;
  if( !self.joueur )
    return;


  console.log( "debut tir ennemi ", new Date - self.debut );
  self.nbFrame++;

/*
  self.pause( true );
  self.real_pause = true;
*/
  self.ennemis.forEach( function( ennemi ) {
    if( self.nbFrame % ennemi.cadence == 0 ) {
      if( self.joueur.element.y - ennemi.element.y > self.hauteurEcran )
        return;
      //if( ennemi.type == "ennemi1" || ennemi.type == "ennemi2" ) {

        var projectile = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x - 16/2 + self.largeurEnnemi/2, 
          y: ennemi.element.y + self.hauteurEnnemi 
        }, { 
          //to
          x: ennemi.element.x - 16/2 + self.largeurEnnemi/2, 
          y: ennemi.element.y + self.hauteurEcran
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        //self.projectileE.push( projectile );
        //self.hitProjectileE.push( projectile.hitbox );
        self.projectileETemp.push( projectile );
        self.hitProjectileETemp.push( projectile.hitbox );
        //self.normal.append( projectile.element );
        //append( self.normal, projectile.element );
        self.normalTemp.push( projectile.element );
/*
      } else if( ennemi.type == "ennemi3" || ennemi.type == "ennemi4" ) {

        var projectile1 = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x - 16 + self.largeurEnnemi/2, 
          y: ennemi.element.y + self.hauteurEnnemi 
        }, { 
          //to
          x: ennemi.element.x - 16 + self.largeurEnnemi/2 - 20, 
          y: ennemi.element.y + self.hauteurEcran
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        var projectile2 = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x + 16 + self.largeurEnnemi/2, 
          y: ennemi.element.y + self.hauteurEnnemi 
        }, { 
          //to
          x: ennemi.element.x + 16 + self.largeurEnnemi/2 + 20, 
          y: ennemi.element.y + self.hauteurEcran
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        self.projectileE.push( projectile1 );
        self.projectileE.push( projectile2 );
        self.hitProjectileE.push( projectile1.hitbox );
        self.hitProjectileE.push( projectile2.hitbox );
        //self.normal.append( projectile1.element );
        //self.normal.append( projectile2.element );
        append( self.normal, projectile1.element );
        append( self.normal, projectile2.element );
      } else {
        //boss

        var projectile = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x - 16/2 + self.largeurBoss/2, 
          y: ennemi.element.y + self.hauteurBoss 
        }, { 
          //to
          x: self.joueur.element.x + self.largeurJoueur/2 - 16/2, 
          y: self.joueur.element.y + 50/2
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        var projectile1 = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x - 16/2 + self.largeurBoss/2 - 25, 
          y: ennemi.element.y + self.hauteurBoss 
        }, { 
          //to
          x: self.joueur.element.x + self.largeurJoueur/2 - 16/2 - 50, 
          y: self.joueur.element.y + 50/2
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        var projectile2 = Class.new( "Projectile", [ self, stage, { 
          //start
          x: ennemi.element.x - 16/2 + self.largeurBoss/2 + 25, 
          y: ennemi.element.y + self.hauteurBoss 
        }, { 
          //to
          x: self.joueur.element.x + self.largeurJoueur/2 - 16/2 + 50, 
          y: self.joueur.element.y + 50/2
        }, deadEntity.bind( self ), "fireEnnemi" ] );

        self.projectileE.push( projectile );
        self.hitProjectileE.push( projectile.hitbox );
        //self.normal.append( projectile.element );
        self.projectileE.push( projectile1 );
        self.projectileE.push( projectile2 );
        self.hitProjectileE.push( projectile1.hitbox );
        self.hitProjectileE.push( projectile2.hitbox );
        //self.normal.append( projectile1.element );
        //self.normal.append( projectile2.element );

        //self.normal.append( projectile1.element );
        //self.normal.append( projectile2.element );
        //self.normal.append( projectile3.element );

        append( self.normal, projectile1.element );
        append( self.normal, projectile2.element );
        append( self.normal, projectile.element );
      }
      */
    }
  });

  console.log( "fin tir ennemi", new Date - self.debut );
/*
  self.pause( false );
  self.real_pause = false;
  */
}


function deadEntity( entity, dead ) {
  var self = this;
  if( entity.isDead() )
    return;

  if( !entity.isDying() ) {
    if( entity.__name__ == "Projectile" ) {
      if( entity.texture == "fireEnnemi" ){
        self.hitProjectileE.splice( self.hitProjectileE.indexOf( entity.hitbox ), 1 );
        self.projectileE.splice( self.projectileE.indexOf( entity ), 1 );
      } else {
        self.hitProjectileJ.splice( self.hitProjectileJ.indexOf( entity.hitbox ), 1 );
        self.projectileJ.splice( self.projectileJ.indexOf( entity ), 1 );
      }
    } else if( entity.__name__ == "Ennemi" ) {
        self.hitEnnemi.splice( self.hitEnnemi.indexOf( entity.hitbox ), 1 );
        self.ennemis.splice( self.ennemis.indexOf( entity ), 1 );
    }else if( entity.__name__ == "Bonus" ) {
        self.hitBonus.splice( self.hitBonus.indexOf( entity.hitbox ), 1 );
        self.bonus.splice( self.bonus.indexOf( entity ), 1 );
    }
  }

  if( entity.animationdie ) {
    if( entity.animation._stop == false && entity.animationdie._stop == true ){
      entity.Die();
      return;
    }
  } else {
    entity.Die();
  }
  del( entity.element );
  delete entity.element;
  delete entity.hitbox;
  delete entity;
}


function GameReady( stage, map, longueur ) {
    var self = this;

    self.debut = new Date();
    //elements
    self.ennemis = [];
    self.bonus = [];
    self.projectileJ = [];
    self.projectileE = [];

    //hitboxes de ces elements
    self.hitEnnemi = [];
    self.hitBonus = [];
    self.hitProjectileJ = [];
    self.hitProjectileE = [];

    //elements temp
    self.normalTemp = [];
    self.projectileJTemp = [];
    self.projectileETemp = [];
    self.hitProjectileJTemp = [];
    self.hitProjectileETemp = [];
    self.coordsPlayerTemp = {x:0,y:0};

    self.nbFrame = 0;

    //creation du scrolling
    self.scrolling = canvas.Scrolling.new( self, self.hauteurEcran, self.largeur );
    //en mettant 15 carrés(97*15) ça passe le check pour avancer(qui ne se déclanche pas si on est pas assez à droite), mais ça affiche cette distance à la fin.

    //création du joueur
    self.joueur = Class.new( "Player", [ self, stage, { x: self.largeur/2-self.largeurJoueur/2, y: -self.hauteur+200 } ] );

    //création de la map
    self.tiledMap = self.createElement();
    self.help = self.createElement();
    self.help.y = -self.hauteur+self.hauteurEcran;
    self.tiled = canvas.Tiled.new();

    //ajout du joueur au scrolling
    self.scrolling.setMainElement( self.joueur.element );

    var decor1 = self.createElement();
    decor1.drawImage( "fond" );
    var decor2 = self.createElement();
    decor2.drawImage( "fond" );
    decor2.y = 1782
    self.map = self.createElement();
    //self.map.append( decor1 );
    append( self.map, decor1 );
    //self.map.append( decor2 );
    append( self.map, decor2 );
    //self.map.append( self.tiledMap );
    append( self.map, self.tiledMap );
    self.map.y = -self.hauteur+self.hauteurEcran;
    self.map.x = 0;
    self.map.height = self.hauteur;
    self.map.width = self.largeur;

    decor1.click( Fire.bind( self, stage ) );
    decor2.click( Fire.bind( self, stage ) );

    addEvent( document.getElementById( "canvas_id" ) , "contextmenu", Fire.bind( self, stage ));


    //chargement de la map
    self.tiled.load( self, self.tiledMap, map );
    self.tiled.ready( function() {
      //initialisation de la map

      //layer
      self.normal = self.tiled.map.children()[ 0 ];

      self.tiled.layers.forEach( function( espece ) { 
        //les calques de tiles
        if( espece.type != "objectgroup" )
        return;

        if( espece.name == "ennemi1" || espece.name == "ennemi2" || espece.name == "ennemi3" || espece.name == "ennemi4" || espece.name == "boss" ) {
          espece.objects.forEach( function( bonus ) {
            var ennemi = Class.new( "Ennemi", [ self, stage, bonus, espece.name ] ) ;
            ennemi.element.bonus = Class.new( "Bonus", [ self, stage, ennemi ] );
            ennemi.element.bonus.element.hide();

            self.ennemis.push( ennemi );
            self.hitEnnemi.push( ennemi.hitbox );
            //self.normal.prepend( ennemi.element );
            append( self.normal, ennemi.element );

            self.bonus.push( ennemi.element.bonus );
            //self.normal.append( ennemi.element.bonus.element );
            append( self.normal, ennemi.element.bonus.element );
          });
        }
      });

      //self.normal.append( self.joueur.hitbox.el );
      //self.normal.append( self.joueur.element );
      append( self.normal, self.joueur.hitbox.el );
      append( self.normal, self.joueur.element );
      self.loaded = true;
      MouveMove.bind( self )();
      console.log( "loading", new Date - self.debut );


      //stage.append( self.temps );
      //stage.append( self.bossLifeCadre );
      append( stage, self.temps );
      append( stage, self.bossLifeCadre );
    });

    //ajout du scroll sur la map
    self.scrolling.addScroll({
      element: self.map, 
      speed: 3,
      block: true,
      width: self.largeur,
      height: self.hauteur
    });

    //ajout de evenement mousemove au canvas pour deplacer le joueur
    addEvent( document.getElementById( "canvas_id" ) , "mousemove", MouveMove.bind( self ));

    //self.map.on("mousemove", MouveMove.bind( self ) );

    self.Score = this.createElement();
    self.Score.fillStyle = "black";
    self.Score.fillRect(0, -20, 120, 25);
    self.Score.fillStyle = "white";
    self.Score.font = "16px SuperFont";
    self.Score.fillText("Score : 0000", 5, 0);
    self.Score.y = 16;
    self.Score.x = 0;

    /*
    stage.append( self.help );
    stage.append( self.map );
    stage.append( self.Score );
    */
    append( stage, self.help );
    append( stage, self.map );
    append( stage, self.Score );


    self.play = self.createElement();
    self.play.fillStyle = "rgba( 0,0,0,0.5)";
    self.play.fillRect(0, -0, 600, 500);
    self.play.fillStyle = "white";
    self.play.font = "76px SuperFont";
    self.play.fillText("PLAY !", 200, 270);
    self.play.y = 0;
    self.play.x = 0;
    self.play.click( function(){
      if( self.loaded ){
        self.started = true;

        self.debut = new Date();
        self.chrono = new Date();
        del( self.play );
      }
    } );
    //stage.append( self.play );
    append( stage, self.play );

    self.started = false;

    self.temps = self.createElement();
    self.temps.y = 41;

    self.bossLifeCadre = self.createElement();
    var cadre = self.createElement();
    var noir = self.createElement();
    self.bossLife = self.createElement();

    cadre.fillStyle = "red";
    cadre.fillRect( 
      120, 
      0, 
      600-120, 
      20
    );
    //self.bossLifeCadre.append( cadre );
    append( self.bossLifeCadre, cadre );

    noir.fillStyle = "black";
    noir.fillRect( 
      122, 
      2, 
      600-124, 
      16
    );
    //self.bossLifeCadre.append( noir );
    //self.bossLifeCadre.append( self.bossLife );
    append( self.bossLifeCadre, noir );
    append( self.bossLifeCadre, self.bossLife );
    self.bossLifeCadre.hide();

    self.bossConvert = 0;
}

function GameRender( stage ) {
    var self = this;

    if( !self.started )
      return;

    console.log( "debut render", new Date - self.debut );


    while( self.normalTemp.length > 0 )
      append( self.normal, self.normalTemp.pop() );
    while( self.projectileJTemp.length > 0 )
      self.projectileJ.push( self.projectileJTemp.pop() );
    while( self.projectileETemp.length > 0 )
      self.projectileE.push( self.projectileETemp.pop() );
    while( self.hitProjectileJTemp.length > 0 )
      self.hitProjectileJ.push( self.hitProjectileJTemp.pop() );
    while( self.hitProjectileETemp.length > 0 )
      self.hitProjectileE.push( self.hitProjectileETemp.pop() );

    if( self.coordsPlayerTemp.x != 0 && self.coordsPlayerTemp.y != 0 ){
      self.joueur.move( { x: self.coordsPlayerTemp.x , y: self.coordsPlayerTemp.y } );
      self.coordsPlayerTemp = {x: 0, y: 0};
    }

    var score = self.joueur.credits;
    if( score > 9999 )
      score = "9999";
    else if( score > 999 )
      score = score;
    else if( score > 99 )
      score = "0" + score;
    else if( score > 9 )
      score = "00" + score;
    else 
      score = "0000";
    self.Score.fillStyle = "black";
    self.Score.fillRect(0, -20, 120, 25);
    self.Score.fillStyle = "white";
    self.Score.font = "16px SuperFont";
    self.Score.fillText("Score : " + score, 5, 0);

    var ecoule = new Date() - self.chrono;
    if( ecoule >= self.DureeJeu ) {
      if( !self.ended ){
        if( self.bossConvert == 1 )
          self.joueur.addCredits( self.credits.bossEnnemiKill );
        else {
          self.joueur.credits = 0;
        }
        EndLevel.bind( self )();
      }
      ecoule = self.DureeJeu;
    }
    var reste = self.DureeJeu - ecoule;
    self.temps.fillStyle = "black";
    self.temps.fillRect(0, 25, 120, 25);
    self.temps.fillStyle = "white";
    self.temps.font = "16px SuperFont";
    self.temps.fillText("Temps : " + reste/1000, 30, 0);

    self.bossLife.fillStyle = "blue";
    self.bossLife.fillRect( 
      122, 
      2, 
      (600-124) * self.bossConvert, 
      16
    );

    if( self.help.y == 0 ) {
      show( self.bossLifeCadre );
    }
    var rapportScroll = ecoule / self.DureeScroll;
    if( rapportScroll > 1 )
      rapportScroll = 1;

    var positionDecor = -self.hauteur+self.hauteurEcran + (self.hauteur-self.hauteurEcran) * rapportScroll/2;
    var positionFond = (self.hauteur-self.hauteurEcran) * rapportScroll/2;
    var positionJoueur = -self.hauteur+200 + (self.hauteur-self.hauteurEcran) * 2 * rapportScroll;

    var vitesseFond = 2;
    var vitesseDecor = 2;
    var vitesseJoueur = 4;

    //scrolling
    if( self.help.y < 0) {
      /*
      self.map.y += vitesseDecor;
      self.help.y += vitesseFond + vitesseDecor;
      self.tiledMap.y += vitesseFond;
      self.joueur.element.y -= vitesseJoueur;
      self.joueur.animation.y -= vitesseJoueur;
      self.joueur.hitbox.move( 0, -vitesseJoueur );
      */
      var diff = self.help.y - (positionFond + positionDecor);
      self.map.y = positionDecor;
      self.help.y = positionFond + positionDecor;
      self.tiledMap.y = positionFond;
      self.joueur.element.y += diff;
      self.joueur.animation.y += diff;
      self.joueur.hitbox.move( 0, diff );
    }
    if( self.ended ) {
      self.joueur.element.y -= 2*vitesseJoueur;
      self.joueur.animation.y -= 2*vitesseJoueur;
      self.joueur.hitbox.move( 0, -2*vitesseJoueur );

      if( self.joueur.element.y < -self.hauteurJoueur ) {
        //changer de niveau
        canvas.Scene.get("CV").score = score;
        canvas.Scene.call("CV");
        return;
      }
    }

    FoeFire.bind( self )( stage );

    var end = false;
    //collision joueur/ennemi
    self.joueur.hitbox.hit( self.hitEnnemi, function( state, el ) {
        if (state == "over" && self.ended == false) {
            //game over
            //console.log( "joueur mort" );
            canvas.Scene.call("Level1");
            end = true;
        }
    });
    if( end )
        return;

    //collision joueur/projectile
    self.joueur.hitbox.hit( self.hitProjectileE, function( state, el ) {
        if (state == "over" && self.ended == false) {
            //game over
            //console.log( "joueur mort 2" );
            canvas.Scene.call("Level1");
            end = true;
        }
    });
    if( end )
        return;

    //collision joueur/bonus
    self.joueur.hitbox.hit( self.hitBonus, function( state, el ) {
      if (state == "over") {
        var entity;

        //collision bonus/joueur
        self.hitBonus.forEach( function( bonus ) {
          bonus.hit( [self.joueur.hitbox], function( state, el ) {
            if (state == "over") {
              entity = this;
            }
          });
        });
        if( entity ) {
          deadEntity.bind( self )( entity.classe );
          self.joueur.Bonus();
        }
      }
    });

    //collision projectile/ennemi
    self.hitEnnemi.forEach( function( ennemi ) {
      ennemi.hit( self.hitProjectileJ, function( state, el ) {
        if (state == "over") {
          var proj;

          //collision ennemi/projectile
          self.hitProjectileJ.forEach( function( projectile ) {
            projectile.hit( self.hitEnnemi, function( state, element ) {
              if (state == "over") {
                proj = this;
              } else {
              }
            });
          });

          if( proj ) {

            if( ennemi.classe.type == "boss" ){
              if( proj.classe.type == "yes" )
                self.bossConvert += 1 / ennemi.classe.hits;
              else if( proj.classe.type == "no" )
                self.bossConvert -= 2 / ennemi.classe.hits;
              if( self.bossConvert > 1 )
                self.bossConvert = 1;
              if( self.bossConvert < 0 )
                self.bossConvert = 0;
            } else if( ennemi.classe.type == "ennemi3" ) {
              if( proj.classe.type == "yes" ) {
                ennemi.classe.hits = 0;
              }
            } else {
              ennemi.classe.hits--;
            }
            deadEntity.bind( self )( proj.classe );
            if( ennemi.classe.hits > 0)
              return;
            if( ennemi.classe.type == "ennemi3" ) {
              show( ennemi.classe.element.bonus.element );
              self.hitBonus.push( ennemi.classe.element.bonus.hitbox );
            }

            if( ennemi.classe.type == "boss" ){
              self.joueur.addCredits( self.credits.bossEnnemiKill );
              EndLevel.bind( self )();
            } else {
              self.joueur.addCredits( self.credits.ennemiKill );
            }
            deadEntity.bind( self )( ennemi.classe );
          }
        }
      });
    });

    //collision projectileE/projectileJ
    self.hitProjectileE.forEach( function( ennemi ) {
      ennemi.hit( self.hitProjectileJ, function( state, el ) {
        if (state == "over") {
          var proj;
          //collision projectileJ/projectileE
          self.hitProjectileJ.forEach( function( projectile ) {
            projectile.hit( self.hitProjectileE, function( state, element ) {
              if (state == "over") {
                proj = this;
              }
            });
          });
          if( proj ) {
            deadEntity.bind( self )( proj.classe );
            deadEntity.bind( self )( ennemi.classe );

            self.joueur.addCredits( self.credits.projectileKill );
          }
        }
      });
    });

  console.log( "fin render", new Date - self.debut );
}

function GameExit( stage ) {
  var self = this;
  self.loaded = false;
  self.started = false;
  self.ended = false;
}


function show( self ) {
  if( this != window )
    self = this;
  self._visible = true;
}

function del( self ) {
  if( this != window )
    self = this;
  self.parent._children.splice( self.parent._children.indexOf( self ),1 );
}

function append( self, el ) {
  if( this != window )
    self = this;
  self._children.push(el);
  el.parent = self;
  el._index = self._children.length-1;
  return el;
}

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}