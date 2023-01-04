radio.onReceivedValue(function (name, value) {
    if (name == "left") {
        Left_Speed = value
    } else if (name == "right") {
        Right_Speed = value
    }
    OMG_Tank.Set_Speed(Left_Speed, Right_Speed)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # # # .
            . . # . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    } else {
    	
    }
})
let Right_Speed = 0
let Left_Speed = 0
radio.setGroup(128)
OMG_Tank.Tank_Init(Tank_version.V3)
OMG_Tank.Stop_Motors()
