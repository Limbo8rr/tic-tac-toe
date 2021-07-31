controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPosition - 3 < 0) {
        currentPosition = currentPosition + 6
    } else {
        currentPosition = currentPosition - 3
    }
    activePiece.setPosition(arrayGridCoords[currentPosition][0], arrayGridCoords[currentPosition][1])
})
function buttonWasPushed () {
    if (isSelectedSquareUnoccupied()) {
        activePiece.destroy()
        isThereAWinner()
        xPlayerTurn = !(xPlayerTurn)
        turnCounter += 1
        startPlayerTurn()
    } else {
        game.splash("Space Already Used. Cannot Place Piece Here!")
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    buttonWasPushed()
})
function drawBackground () {
    picture = sprites.background.cityscape
    x = 66
    y = 44
    for (let index = 0; index < 2; index++) {
        for (let index = 0; index < 3; index++) {
            picture.drawLine(x, 20, x, 100, 15)
            x = x + 1
        }
        x = x + 25
    }
    for (let index = 0; index < 2; index++) {
        for (let index = 0; index < 3; index++) {
            picture.drawLine(40, y, 119, y, 15)
            y = y + 1
        }
        y = y + 25
    }
    scene.setBackgroundImage(picture)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    buttonWasPushed()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPosition % 3 != 0) {
        currentPosition = currentPosition - 1
    } else {
        currentPosition = currentPosition + 2
    }
    activePiece.setPosition(arrayGridCoords[currentPosition][0], arrayGridCoords[currentPosition][1])
})
function isSelectedSquareUnoccupied () {
    if (arrayOccupiedSquares[currentPosition] == 0) {
        if (xPlayerTurn) {
            arrayOccupiedSquares[currentPosition] = 1
            placedPiece = sprites.create(assets.image`X Sprite`, SpriteKind.Player)
        } else {
            arrayOccupiedSquares[currentPosition] = 2
            placedPiece = sprites.create(assets.image`O sprite`, SpriteKind.Player)
        }
        placedPiece.setPosition(arrayGridCoords[currentPosition][0], arrayGridCoords[currentPosition][1])
        return 1
    }
    return 0
}
function populateArrays () {
    arrayGridCoords = []
    x = 53
    y = 34
    i = 0
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 3; index++) {
            console.log(y)
            arrayGridCoords[i] = [x, y]
            i += 1
            x += 28
        }
        x += -84
        y += 27
    }
    arrayWinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    arrayOccupiedSquares = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if ((currentPosition + 1) % 3 != 0) {
        currentPosition = currentPosition + 1
    } else {
        currentPosition = currentPosition - 2
    }
    activePiece.setPosition(arrayGridCoords[currentPosition][0], arrayGridCoords[currentPosition][1])
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPosition + 3 > 8) {
        currentPosition = currentPosition - 6
    } else {
        currentPosition = currentPosition + 3
    }
    activePiece.setPosition(arrayGridCoords[currentPosition][0], arrayGridCoords[currentPosition][1])
})
function startPlayerTurn () {
    if (turnCounter == 9) {
        for (let value of sprites.allOfKind(SpriteKind.Player)) {
            value.destroy()
        }
        scene.setBackgroundImage(sprites.background.moon)
        game.showLongText("Congratulations!  It's A Draw!!", DialogLayout.Bottom)
        game.reset()
    }
    if (xPlayerTurn) {
        activePiece = sprites.create(assets.image`red X Sprite`, SpriteKind.Player)
    } else {
        activePiece = sprites.create(assets.image`Red O Sprite`, SpriteKind.Player)
    }
    activePiece.setPosition(arrayGridCoords[4][0], arrayGridCoords[4][1])
    currentPosition = 4
}
function isThereAWinner () {
    for (let value of arrayWinningCombinations) {
        a = arrayOccupiedSquares[value[0]]
        b = arrayOccupiedSquares[value[1]]
        c = arrayOccupiedSquares[value[2]]
        if ((a == 1 || a == 2) && (a == b && a == c)) {
            for (let index = 0; index < 4; index++) {
                picture.replace(9, 10)
                pause(100)
                picture.replace(1, 5)
                pause(100)
                picture.replace(11, 9)
                pause(100)
                picture.replace(7, 1)
                pause(100)
                picture.replace(10, 11)
                pause(100)
                picture.replace(5, 7)
                pause(100)
            }
            if (a == 1) {
                game.splash("!!!!!X Wins!!!!!")
            } else {
                game.splash("!!!!!O Wins!!!!!")
            }
            game.reset()
        }
    }
}
let c = 0
let b = 0
let a = 0
let arrayWinningCombinations: number[][] = []
let i = 0
let placedPiece: Sprite = null
let arrayOccupiedSquares: number[] = []
let y = 0
let x = 0
let picture: Image = null
let arrayGridCoords: number[][] = []
let activePiece: Sprite = null
let currentPosition = 0
let turnCounter = 0
let xPlayerTurn = false
drawBackground()
populateArrays()
xPlayerTurn = true
turnCounter = 0
startPlayerTurn()
