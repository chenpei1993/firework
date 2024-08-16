import ITerm from "./Iterm";
import Camera from "./Camera";
import Vector3 from "./Vector3";
import System from "./System";

export default class Platform implements ITerm{
    private points :Vector3[]

    constructor(center: Vector3, size: number, interval: number) {
        this.points = []
        for (let i = -size; i <= size; i++) {
            for(let j = -size; j <= size; j++) {
                this.points.push(new Vector3(
                    center.x + i * interval,
                    center.y,
                    center.z + j * interval));
            }
        }
    }

    draw(ctx:CanvasRenderingContext2D, camera: Camera): void{
        ctx.fillStyle = "white"
        for(let i = 0; i < this.points.length; i++){
            ctx.beginPath()
            let point = this.points[i];
            let p = camera.transform(point)
            if(!p){
                continue
            }
            ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
            ctx.fill()
            ctx.closePath()
        }
    }

    run(system: System): void {
    }
}