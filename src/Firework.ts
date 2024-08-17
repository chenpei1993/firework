import Vector3 from "./Vector3";
import ITerm from "./Iterm";
import Camera from "./Camera";
import System from "./System";
import Spark from "./Spark";
import * as assert from "node:assert";
import LimitArray from "./LimitArray";

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
    private trailer: LimitArray<Vector3>


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
        this.fireEle = fireEle.cloneNode(true) as HTMLAudioElement
        this.fireEle.volume = 0.3
        this.explodeEle = explodeEle.cloneNode(true) as HTMLAudioElement
        this.explodeEle.volume = 0.5
        this.trailer = new LimitArray()
        this.trailer.push(this.position.clone())
        document.body.appendChild(this.fireEle)
        this.fireEle.play().catch((e) => {
            console.log(e)
        })
        setTimeout(()=>{
            document.body.removeChild(this.fireEle)
        }, 1000)
    }

    private explode(){
        let circlePointCount = 20
        let radius = 8

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
        document.body.appendChild(this.explodeEle)
        this.explodeEle.play().catch((e) => {
            console.log(e)
        })
        setTimeout(()=>{
            document.body.removeChild(this.explodeEle)
        }, 1000)
    }

    run(system: System) : void {
        if(this.phase == "up"){
            let time = new Date().getTime()
            let t = (time - this.time) / 1000
            this.position.y = this.position.y + this.vy * t - 0.5 * system.g * t * t
            this.vy  = this.vy - system.g * t
            this.time = time
            this.trailer.push(this.position.clone())
            if(this.vy <= 10){
                this.phase = "exploded"
                this.explode()
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
        let transparent = ["19", "3E", "53", "68", "7D", "92", "A7", "BC", "D1", "FF"]
        if(this.phase == "up"){
            let i = 0;
            for(let position of this.trailer){
                if(!position){
                    continue
                }
                ctx.beginPath()
                let p = camera.transform(position)
                if(!p){
                    return
                }
                ctx.fillStyle = this.color + transparent[i]
                ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
                ctx.fill()
                ctx.closePath()
                i++
            }
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