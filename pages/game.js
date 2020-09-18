var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [scene1, scene2]
};
    
    var game = new Phaser.Game(config);
    var map;
    var score = 0;
    var scoretext;
    var bricks;
    var ball;