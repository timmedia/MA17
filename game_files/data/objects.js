object = {
  Player: function(x, y, sprite, walkSpeed, jumpSpeed, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    res.animations.add('idle', [0,1,2,3], 5, true);
    //res.animations.add('walk', [4,5,6,7], 5, true);
    //res.animations.add('jump', [8,9,10,11], 5, true);
    res.walkSpeed = walkSpeed;
    res.jumpSpeed = jumpSpeed;
    res.maxFallingSpeed = 900;
    game.physics.arcade.enable(res);
    res.checkWorldBounds = true;
    res.events.onOutOfBounds.add(function(){if(res.y > 0) {game.killPlayer();}}, game);
    return res;
  },
  Box: function(x, y, sprite, drag, bounce, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(res);
    res.body.collideWorldBounds = true;
    res.body.drag.x = drag;
    res.body.bounce.y = bounce;
    return res;
  },
  Button: function(x, y, sprite, orientation, collideCallback, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    res.animations.add('up', [0], 2, false);
    res.animations.add('down', [1], 2, false);
    res.animations.play('up');
    res.angle = orientation;
    game.physics.arcade.enable(res);
    res.body.moves = false;
    res.collideCallback = function() {
      if(!res.body.wasTouching.right && res.body.touching.right){
        collideCallback(game);
        res.animations.play('down');
        res.animations.currentAnim.onComplete.add(function(){res.animations.play('up')});
      }
    };
    return res;
  }
}
