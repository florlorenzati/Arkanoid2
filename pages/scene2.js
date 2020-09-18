class scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
    }
    preload()
{
    this.load.atlas('assets', '/assets/atlasarkanoid.png', '/assets/atlasarkanoid_atlas.json');
    this.load.tilemapTiledJSON('map', '/assets/ArkanoidPlayero.json');
    this.load.image('tiles1', '/assets/ZRPGBeach.png');
}

create()
{
    map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('Beach', 'tiles1');
    var layer = map.createStaticLayer('back', tileset, 0, 0);
    var layer1 = map.createStaticLayer('front', tileset, 0, 0);
    //  Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    this.bricks = this.physics.add.staticGroup({
        key: 'assets', frame: [ 'ladrillo1', 'ladrillo2', 'ladrillo3', 'ladrillo4', 'ladrillo5', 'ladrillo6' ],
        frameQuantity: 10,
        gridAlign: { width: 10, height: 6, cellWidth: 55, cellHeight: 45, x: 120, y: 100 }
    });

    this.ball = this.physics.add.image(400, 500, 'assets', 'bola').setCollideWorldBounds(true).setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add.image(400, 550, 'assets', 'jugador').setImmovable();

    //  Our colliders
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //  Input events
    this.input.on('pointermove', function (pointer) {

        //  Keep the paddle within the game
        this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 740);

        if (this.ball.getData('onPaddle'))
        {
            this.ball.x = this.paddle.x;
        }

    }, this);

    this.input.on('pointerup', function (pointer) {

        if (this.ball.getData('onPaddle'))
        {
            this.ball.setVelocity(-75, -700);
            this.ball.setData('onPaddle', false);
        }

    }, this);
    scoretext = new puntos ({scene:this, x:10, y: 10})
}
update()
{
    if (this.ball.y > 600)
    {
        this.resetBall();
    }
}
hitBrick(ball, brick)
{
    brick.disableBody(true, true);
    score += 15;
    scoretext.setText('Puntaje: ' + score);

    if (this.bricks.countActive() === 0)
    {
        this.scene.start('scene1');
    }
}

resetBall()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData('onPaddle', true);
}

resetLevel()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);

    });
}

hitPaddle(ball, paddle)
{
    var diff = 0;

    if (ball.x < paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    }
    else if (ball.x > paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x -paddle.x;
        ball.setVelocityX(10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.setVelocityX(2 + Math.random() * 8);
    }
}
}
