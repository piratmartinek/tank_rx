
/**
* Use this file to define OMG_Tank functions and blocks.
* Read more at https://makecode.microbit.org/blocks/OMG_Tank
*/

enum Tank_version {
    //% block="V1"
    V1,
    //% block="V2"
    V2,
    //% block="V3"
    V3
}
enum Tank_rotate {
    //% block="Right"
    Right,
    //% block="Left"
    Left
}

/**
 * OMG_Tank blocks
 */
//% weight=100 color=#f5a017 icon=""
namespace OMG_Tank {
    let L_speed = 0
    let R_speed = 0
    let Adress = 64
    let MB3 = 0
    /**
     * Light sensor detect dark     
     */
    //% block="Is detecting dark?"
    export function Is_dark(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true
        }
        else if (pins.digitalReadPin(DigitalPin.P2) == 0) {
            return false
        }
        return false
    }
    
    /**
     * Drive motors for specific duration
     * @param L_M left motor speed, eg: 0
     * @param L_M left motor speed, eg: 0
     */
    //% block="Drive speed L motor $L_M R motor $R_M for $Interval ms"
    //% L_M.min=-100 L_M.max=100
    //% R_M.min=-100 R_M.max=100
    //% L_M.fieldOptions.precision=1
    //% R_M.fieldOptions.precision=1
    //% Interval.shadow=timePicker
    export function Drive_Duration(L_M: number, R_M: number, Interval: number): void {
        L_speed = L_M
        R_speed = R_M * -1
        if (MB3 == 0) {
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, R_speed, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, L_speed, Adress)
            pause(Interval)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, 0, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, 0, Adress)
        }
        else {

            pins.servoWritePin(AnalogPin.P0, Math.map(R_speed, -100, 100, 0, 180))
            pins.servoWritePin(AnalogPin.P1, Math.map(L_speed, -100, 100, 0, 180))
            pause(Interval)
            pins.servoWritePin(AnalogPin.P0, 90)
            pins.servoWritePin(AnalogPin.P1, 90)
        }
    }
    /**
     * Drive motors for specific duration
     * @param Direction rotation direction of Tank
     * @param Speed motor speed, eg: 0     
     * @param Interval duration of rotation
     */
    //% block="Rotate $Direction speed $Speed for $Interval ms"
    //% Speed.min=0 Speed.max=100
    //% Speed.fieldOptions.precision=1
    //% Interval.shadow=timePicker
    export function Rotate_Duration(Direction: Tank_rotate, Speed: number, Interval: number): void {
        if (Direction == Tank_rotate.Right) {
            L_speed = Speed
            R_speed = Speed
        }
        else if (Direction == Tank_rotate.Left) {
            L_speed = Speed * -1
            R_speed = Speed * -1
        }
        if(MB3 == 0)
        {
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, R_speed, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, L_speed, Adress)
            pause(Interval)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, 0, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, 0, Adress)
        }
        else
        {
            pins.servoWritePin(AnalogPin.P0, Math.map(R_speed, -100, 100, 0, 180))
            pins.servoWritePin(AnalogPin.P1, Math.map(L_speed, -100, 100, 0, 180))
            pause(Interval)
            pins.servoWritePin(AnalogPin.P0, 90)
            pins.servoWritePin(AnalogPin.P1, 90)
        }
        
    }

    /**
     * Set speed of the motors
     * @param L_M left motor speed, eg: 0
     * @param L_M left motor speed, eg: 0
     */
    //% block="Speed L motor $L_M R motor $R_M"
    //% L_M.min=-100 L_M.max=100
    //% R_M.min=-100 R_M.max=100
    //% L_M.fieldOptions.precision=1
    //% R_M.fieldOptions.precision=1
    export function Set_Speed(L_M: number, R_M: number): void {
        L_speed = L_M
        R_speed = R_M * -1
        if(MB3 == 0)
        {
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, R_speed, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, L_speed, Adress)
        }
        else
        {
            pins.servoWritePin(AnalogPin.P0, Math.map(R_speed, -100, 100, 0, 180))
            pins.servoWritePin(AnalogPin.P1, Math.map(L_speed, -100, 100, 0, 180))
        }

    }    

    /**
     * Stop all running motors.
     */
    //% block="Stop motors"
    export function Stop_Motors(): void{
        if(MB3 == 0)
        {
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo1, 0, Adress)
            PCA9685.setCRServoPosition(PCA9685.ServoNum.Servo2, 0, Adress)
        }
        else
        {
            pins.servoWritePin(AnalogPin.P0, 90)
            pins.servoWritePin(AnalogPin.P1, 90)
        }
        
    }

    /**
     * Initialization of the tank base hardware
     */
    //% block="Init tank version $Version"
    export function Tank_Init(Version: Tank_version): void {
        if (Version == Tank_version.V1) {
            PCA9685.reset(65)
            Adress = 65
            MB3 = 0
        }
        else if (Version == Tank_version.V2){
            PCA9685.reset(64)
            Adress = 64
            MB3 = 0
        }
        else{
            MB3 = 1
        }
        pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
    }

}
