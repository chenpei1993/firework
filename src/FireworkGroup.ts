import Firework from "./Firework";
import ITerm from "./Iterm";
import Camera from "./Camera";
import System from "./System";
import Vector3 from "./Vector3";

export default class FireworkGroup implements ITerm {

    private size: number
    private colors: string[]
    private interval: number
    private fireworks: Firework[]
    private num: number
    private minVy: number
    private maxVy: number
    private x: number
    private z: number
    private w: number
    private h: number
    private height: number
    private fireEle: HTMLAudioElement
    private explodeEle: HTMLAudioElement


    constructor(size: number, 
                colors: string[], 
                interval: number, 
                minVy: number, 
                maxVy: number,
                x: number, 
                z: number,
                w: number,
                h: number,
                height: number,
                fireEle: HTMLAudioElement,
                explodeEle: HTMLAudioElement) {
        this.size = size
        this.colors = colors
        this.interval = interval
        this.fireworks = []
        this.num = 1
        this.minVy = minVy
        this.maxVy = maxVy
        this.x = x
        this.z = z
        this.w = w
        this.h = h
        this.height = height
        this.fireEle = fireEle
        this.explodeEle = explodeEle
    }

    private fill(){
        if(this.num < this.size){
            this.num++
            let time = Math.ceil(this.interval * Math.random()) * 1000
            setTimeout(() => {
                let color = this.colors[Math.floor(Math.random() * this.colors.length)]
                let position = new Vector3(
                    this.x + this.w * Math.random(),
                    this.height,
                    this.z + this.h * Math.random())
                let vy = (this.maxVy - this.minVy) * Math.random() + this.minVy
                this.fireworks.push(new Firework(position, vy, color, this.fireEle, this.explodeEle))
            }, time)
        }
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        for(let firework of this.fireworks){
            firework.draw(ctx, camera)
        }
    }

    run(system: System): void {
        let arr: Firework[] = []
        for(let firework of this.fireworks){
            firework.run(system)
            if(firework.isLive()){
                arr.push(firework)
            }else{
                this.num--
            }
        }
        this.fireworks = arr
        this.fill()

    }


}