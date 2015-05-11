/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        //non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});

var BackgroundLayer = me.ImageLayer.extend({
    init: function(image, z ,speed) {
      name = image;
      width = 900;
      height = 600;
      ratio = 1;
      //call parent constructor
      this._super(me.ImageLayer, 'init', [name, width, height, image, z, ratio]);
    },

});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // local copy of the global score
        this.scoreFont = new me.Font('gamefont', 80, '#fff', 'center');

        this.floating = true;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        var context = renderer.getContext();
        if (game.data.start && me.state.isCurrent(me.state.PLAY))
            this.scoreFont.draw(context, game.data.score, me.video.renderer.getWidth()/2, 10);
    }

});
