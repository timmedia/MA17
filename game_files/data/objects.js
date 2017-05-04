object = {
  Player: function(x, y, sprite, walkSpeed, jumpSpeed, game) {
    let res = game.add.sprite(x, y, sprite);
    res.anchor.setTo(0.5, 0.5);
    res.animations.add('idle', [0,1,2,3,4], 5, true);
    res.animations.add('walk', [0,1,2,3,4], 5, true);
    res.animations.add('jump', [0,1,2,3,4], 5, true);
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
    game.physics.arcade.enable(res);
    res.body.moves = false;
    res.angle = orientation;
    var collisionCheck;
    switch (orientation) {
      case 'right':
        res.angle = 90;
        break;
      case 'left':
        res.angle = -90;
        break;
      default:
        res.angle = 0;
    }
    res.collideCallback = function() {
      switch (orientation) {
        case 'right':
          collisionCheck = res.body.wasTouching.none && res.body.touching.right;
          break;
        case 'left':
          collisionCheck = res.body.wasTouching.none && res.body.touching.left;
          break;
        default:
          collisionCheck = false;
      }
      if(collisionCheck){
        collideCallback(game);
        res.animations.play('down');
        res.animations.currentAnim.onComplete.add(function(){res.animations.play('up')});
      }
    };
    return res;
  }
}
