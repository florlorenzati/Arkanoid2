class puntos extends Phaser.GameObjects.Text {
    
    constructor(config)
    {
      super(config.scene, config.x, config.y, 'Puntaje: ' + score, { font: '24px Impact', fill: '#404894', backgroundColor: '#e6a8d9'});
      config.scene.add.existing(this);
    }   
}