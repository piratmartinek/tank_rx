radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 14) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . # # # .
            `)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "left") {
        Left_Speed = value
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    } else if (name == "right") {
        Right_Speed = value
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            `)
        basic.pause(1000)
        basic.clearScreen()
    } else if (name == "pushedbutton") {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    } else if (value == 14) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    }
    OMG_Tank.Set_Speed(Left_Speed, Right_Speed)
})
let Right_Speed = 0
let Left_Speed = 0
radio.setGroup(128)
OMG_Tank.Tank_Init(Tank_version.V3)
OMG_Tank.Stop_Motors()
