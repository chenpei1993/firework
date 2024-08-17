import Vector3 from "./Vector3";
import ITerm from "./Iterm";
import Camera from "./Camera";
import System from "./System";
import LimitArray from "./LimitArray";

export default class Spark implements ITerm{

    private position: Vector3
    private direction: Vector3
    private power: number
    private velocity: Vector3
    private time: number
    private liveTime: number
    private color: string
    private live: boolean
    private trailer: LimitArray<Vector3>

    constructor(position: Vector3, direction: Vector3, power: number, color: string) {
        this.position = position
        this.direction = direction.normalize()
        this.power = power
        this.velocity = this.direction.multiply(power)
        this.time = new Date().getTime()
        this.color = color
        this.liveTime = new Date().getTime() + 1000
        this.live = true
        this.trailer = new LimitArray()
        this.trailer.push(this.position.clone())
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        if(this.liveTime < this.time){
            this.live = false
            return
        }

        let transparent = ["19", "3E", "53", "68", "7D", "92", "A7", "BC", "D1", "FF"]
        let i = 0;
        for(let position of this.trailer){
            if(!position){
                continue
            }
            ctx.beginPath()
            let p = camera.transform(position)
            if(!p){
                this.live = false
                return
            }
            ctx.fillStyle = this.color + transparent[i]
            ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
            ctx.fill()
            ctx.closePath()
            i++
        }
    }

    run(system: System): void {
        let time = new Date().getTime()
        let t = (time - this.time) / 1000
        let friction = 1
        this.position.x = this.position.x + this.velocity.x * t - 0.5 * friction * t * t
        this.position.y = this.position.y + this.velocity.y * t - 0.5 * system.g * t * t
        this.position.z = this.position.z + this.velocity.z * t - 0.5 * friction  * t * t
        this.velocity.x= this.velocity.x  - 0.5 * friction * t
        this.velocity.y = this.velocity.y  - 0.5 * system.g * t
        this.velocity.z = this.velocity.z  - 0.5 * friction * t
        this.time = time
        this.trailer.push(this.position.clone())
    }

    isLive(): boolean{
        return this.live
    }
}