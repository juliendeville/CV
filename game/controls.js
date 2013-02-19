var initControls = function() {
	var self = this;



    //bwaaaa
    canvas.Input.keyDown([Input.Space], function(e) {
      self.state.cri = true;

    });
    canvas.Input.keyUp(Input.Space, function(e) {
      self.state.cri = false;
    });

    //changement d'arme
    canvas.Input.keyDown( [69], function(e) {
      self.state.change = true;

    });

}