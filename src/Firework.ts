import Vector3 from "./Vector3";
import ITerm from "./Iterm";
import Camera from "./Camera";
import System from "./System";
import Spark from "./Spark";

export default class Firework implements ITerm{
    private position: Vector3
    private vy: number
    private time: number
    private phase: string
    private color: string
    private sparks: Spark[]
    private live: boolean
    private fireEle: HTMLAudioElement
    private explodeEle: HTMLAudioElement


    constructor(position: Vector3,
                vy: number,
                color: string,
                fireEle: HTMLAudioElement,
                explodeEle: HTMLAudioElement) {
        this.position = position
        this.vy = vy
        this.time = new Date().getTime()
        this.phase = "up"
        this.color = color
        this.sparks = []
        this.live = true
        this.fireEle = fireEle
        this.explodeEle = explodeEle
        // this.fireEle.click()
    }

    private explode(){
        let circlePointCount = 20
        let radius = 20

        let angelStep = Math.PI * 2 / circlePointCount
        for (let i = -radius; i <= radius; i++) {
            let y = i;
            for (let j = 0; j < circlePointCount; j++) {
                let xzRadius = Math.sqrt(radius * radius - y * y)
                let xzAngel = j * angelStep
                let x = xzRadius * Math.cos(xzAngel)
                let z = xzRadius * Math.sin(xzAngel)
                let direction = new Vector3(x, y, z)
                this.sparks.push(new Spark(
                        this.position.clone(),
                        direction.clone(),
                        30 * Math.random(),
                        this.color))
            }
        }
    }

    run(system: System) : void {
        if(this.phase == "up"){
            let time = new Date().getTime()
            let t = (time - this.time) / 1000
            this.position.y = this.position.y + this.vy * t - 0.5 * system.g * t * t
            this.vy  = this.vy - system.g * t
            this.time = time
            if(this.vy < 0){
                this.phase = "exploded"
                this.explode()
                // this.explodeEle.click()
            }
        }else if(this.phase == "exploded"){
            let arr: Spark[] = []
            let live = false
            for(let spark of this.sparks){
                spark.run(system)
                live = live || spark.isLive()
                if(spark.isLive()){
                    arr.push(spark)
                }
            }
            this.sparks = arr
            this.live = live
        }

    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        if(this.phase == "up"){
            ctx.beginPath()
            let p = camera.transform(this.position)
            if(!p){
                return
            }
            ctx.fillStyle = this.color
            ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
            ctx.fill()
            ctx.closePath()
        }else if(this.phase == "exploded"){
            for(let sparks of this.sparks){
                sparks.draw(ctx, camera)
            }
        }

    }

    isLive():boolean{
        return this.live
    }
}