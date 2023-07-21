namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    myProjectile = sprites.createProjectileFromSprite(img`
        . . 6 6 6 6 . . 
        . 6 d 4 4 4 6 . 
        6 1 b 1 1 4 d 6 
        c 1 b b 4 4 1 c 
        . c b b b d c . 
        . . c c c c . . 
        `, mySprite, 0, -50)
    myProjectile.startEffect(effects.blizzard)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy(effects.fire, 500)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    game.over(false)
})
info.onLifeZero(function () {
    game.gameOver(false)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let myProjectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
info.setLife(3)
game.splash("Fuel Up!", "By BlooLua")
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 4 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 4 . . . . . . . 
    . . . . . . c 6 b c . . . . . . 
    . . . . . . c 4 b c . . . . . . 
    . . . . . c c c 6 6 c . . . . . 
    . . . . c 6 4 4 4 b 6 c . . . . 
    . . c f f f c c e e f f c c . . 
    c c 6 6 6 6 6 4 4 4 4 b 4 6 c . 
    c 6 6 6 6 6 6 6 4 4 4 b 4 4 6 c 
    c c c c c c c c 4 4 4 4 b 4 c c 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .........ccc........
        .........c6c........
        ......ccc666ccc.....
        ........cbbbc.......
        .......4444444......
        .......4444444......
        .......4444444......
        .......4444444......
        .......c66666c......
        .......c66666c......
        ......c666666cc.....
        ......bbbbbbbbb.....
        ....................
        ....................
        `, 0, 30)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
    myFuel.startEffect(effects.coolRadial)
})
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
