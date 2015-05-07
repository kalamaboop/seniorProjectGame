game.GameOverScreen = me.ScreenObject.extend({
  init: function() {
    this.savedData = null;
    this.handler = null;
  },

  onResetEvent: function() {
    this.savedData = {
      score: game.data.score
    };
    me.save.add(this.savedData);
  }
});
