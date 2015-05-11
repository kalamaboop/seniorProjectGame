/**
 * Player Entity
 */
var CharEntity = me.Entity.extend({
    init:function (x, y) {
        var settings = {};
        settings.image = me.loader.getImage('char');
        settings.width = 80;
        settings.height = 80;
        settings.spritewidth = 80;
        settings.spriteheight = 80;
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        this.alwaysUpdate = true;
        this.body.gravity = 0.2;
        this.gravityForce = 0.01;
        this.renderable.anchorPoint = new me.Vector2d(0.1, 0.5);
        this.body.addShape(new me.Rect(5, 5, 75, 75));
        this.jumpTween = new me.Tween(this.pos);
        this.jumpTween.easing(me.Tween.Easing.Exponential.InOut);
        this.endTween = null;
        this.collided = false;

    },

    update : function (dt) {
        if (this.pos.y < me.game.viewport.height/2 + 124) {
          this.body.update(dt);
        }
        else if (me.input.isKeyPressed('jump')) {
            var currentPos = this.pos.y;
            this.jumpTween.stop();
            this.jumpTween.to({y: currentPos - 180}, 50);
            this.jumpTween.start();
        }
        if (this.pos.x > (me.game.viewport.width - this.width)) {
          this.pos.x = me.game.viewport.width - this.width;
        }
        //else {
          //this.gravityForce += 0.2;
          //this.pos.y += me.timer.tick * this.gravityForce;
        //}
        this.updateBounds();
        if (this.collided) {
          game.data.start = false;
          return false;
        }
        // handle collisions against other shapes
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision : function (response, other) {
        var obj = response.b;
        if (obj.type === 'barrel') {
          this.collided = true;
          ground.body.vel.set = (0, 0);
          char.pos.x = char.pos.x;
        }
        // Make all other objects solid
        return true;
    }
});

var BarrelEntity = me.Entity.extend({
    init: function(x, y) {
        var settings = {};
        settings.image = me.loader.getImage('barrel');
        settings.width = 40;
        settings.height = 45;
        settings.spritewidth = 40;
        settings.spriteheight = 45;

        this._super(me.Entity, 'init', [x, y, settings]);
        this.alwaysUpdate = true;
        this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
        this.body.vel.set(-10, 0);
        this.type = 'barrel';
    },

    update: function(dt) {
      if (!game.data.start) {
          return this._super(me.Entity, 'update', [dt]);
      }
      this.pos.add(this.body.vel);
      if (this.pos.x < -this.width) {
          me.game.world.removeChild(this);
          game.data.score++;
      }
      this.updateBounds();
      this._super(me.Entity, 'update', [dt]);
      return true;
    },
});

var BarrelGenerator = me.Renderable.extend({
    init: function() {
        this._super(me.Renderable, 'init', [0, me.game.viewport.width, me.game.viewport.height]);
        this.alwaysUpdate = true;
        this.generate = 0;
        this.frequency = 92;
        this.posX = me.game.viewport.width;
        this.posY = me.game.viewport.height - 145;
    },

    update: function(dt) {
      this.generate += 1;
      if (this.generate % this.frequency === 0) {

        var barrel = new me.pool.pull('barrel', this.posX, this.posY);
        me.game.world.addChild(barrel, 10);
      }
      this._super(me.Entity, "update", [dt]);
      return true;
    }
})

var Ground = me.Entity.extend({
    init: function(x, y) {
      var settings = {};
      settings.image = me.loader.getImage('ground');
      settings.width = 900;
      settings.height = 96;
      this._super(me.Entity, 'init', [x, y, settings]);
      this.alwaysUpdate = true;

      this.body.vel.set(-10, 0);
      this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
      this.type = 'ground';
    },

    update: function(dt) {
      //mechanics
      this.pos.add(this.body.vel);
      if (this.pos.x < -this.renderable.width) {
          this.pos.x = me.video.renderer.getWidth() - 10;
      }
      this.updateBounds();
      return this._super(me.Entity, 'update', [dt]);
    },
})
