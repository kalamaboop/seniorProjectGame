game.PlayScreen = me.ScreenObject.extend({
    init: function() {
      this._super(me.ScreenObject, 'init');
    },

    onResetEvent: function() {
        me.game.reset();

        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        // reset the score
        game.data.score = 0;
        //game.data.start = false;

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        this.ground1 = me.pool.pull('ground', 0, me.video.renderer.getHeight() - 96);
        this.ground2 = me.pool.pull('ground', me.video.renderer.getWidth(), me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        this.char = me.pool.pull("char", 60, 400);
        me.game.world.addChild(this.char, 10);

        //inputs
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.SPACE);

        game.data.start = true;
        me.game.world.addChild(new BarrelGenerator(), 100);

    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        this.char = null;
        this.ground1 = null;
        this.ground2 = null;
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.mouse.LEFT);
    }
});
