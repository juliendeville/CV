canvas.Scene.new({
    name: "Level1", // Obligatory
    next: "CV", // niveau suivant
    ended: false,
    credits :{
        bonus: 50,
        rankMax: 450,
        projectileKill: 10,
        ennemiKill: 100,
        bossEnnemiKill: 1000
    },
    hauteur: 1800,
    hauteurEcran: 500,
    largeur: 600,
    largeurJoueur: 29,
    hauteurJoueur: 64,
    hauteurJoueurHitBox : 50,
    largeurEnnemi: 40,
    hauteurEnnemi: 30,
    largeurBoss: 80,
    hauteurBoss: 60,
    DureeJeu: 20000,
    DureeScroll: 17000,
    materials: {
        images: {
            fond: "assets/astronaut/farback.gif",
            decor: "assets/astronaut/starfield.png",
            player: "assets/astronaut/player.png",
            ennemi1: "assets/astronaut/ennemi1.png",
            ennemi2: "assets/astronaut/ennemi2.png",
            ennemi3: "assets/astronaut/ennemi3.png",
            ennemi4: "assets/astronaut/ennemi4.png",
            fire: "assets/astronaut/fire.png",
            ok: "assets/astronaut/fireOk.png",
            explosion: "assets/astronaut/explosion.png",
            explosionBoss: "assets/astronaut/explosionBoss.png",
            fireEnnemi: "assets/astronaut/fireEnnemi.png",
            donut: "assets/astronaut/donut.png",
            boss: "assets/astronaut/boss.png",
            starfield: "assets/astronaut/starfield.png"
        }
    },
    //Method called at each resource loaded in the materials property
    preload: function(stage, pourcent) {

    },
    //Method called when resources are loaded
    ready: function(stage) {
        GameReady.bind( this )( stage, "level1.json");
    },
    //Method called at each render (60 FPS)
    render: function(stage) {
        GameRender.bind( this )( stage );

        stage.refresh();
    },
    //Method called when this scene is quitted (or another scene is called)
    exit: function(stage) {
        GameExit.bind( this )( stage );
    }
});